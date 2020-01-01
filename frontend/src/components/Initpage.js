/* eslint-disable */
import React, { Component } from "react"
import { Redirect } from "react-router-dom"
import "../css/Initpage.scss"
import "../App.css"
import { Link } from "react-router-dom"
import axios from "axios"
import MeetingInfo from "./details/MeetingInfo"
import MakeTeamButton from "./details/MakeTeamButton"
import JoinButton from "./details/JoinButton"
import Loading from "./details/Loading"
import withHomeInfo from "../modules/withHomeInfo"

class Initpage extends Component {
  componentDidMount() {
    try {
      window.Kakao.init(process.env.REACT_APP_KAKAO_JAVSCRIPT_SDK_KEY)
      // 카카오 로그인 버튼을 생성
      // window.Kakao.Auth.createLoginButton({
      //     container: '#kakao-login-btn',
      //     success: function(authObj) {

      //     },
      //     fail: function(err) {
      //         alert(JSON.stringify(err));
      //         console.log(err);
      //     }
      // });
    } catch (error) {
      console.log(error)
    }
  }

  kakaoLogin = () => () => {
    // 로그인 창을 띄웁니다.
    Kakao.Auth.login({
      success: function(authObj) {
        // 로그인 성공시, 장고의 KAKAO Login API를 호출함
        axios
          .post("/rest-auth/kakao/", {
            access_token: authObj.access_token,
            code: process.env.REACT_APP_KAKAO_REST_API_KEY
          })
          .then(response => {
            axios.get("/profile").then(response => {
              console.log(
                "[로그인성공] " +
                  response.data.user.username +
                  "(회사:" +
                  response.data.company.name +
                  ")"
              )
              window.location.reload()
            })
          })
          .catch(err => {
            console.log(err)
          })
      },
      fail: function(err) {
        alert(JSON.stringify(err))
      }
    })
  }

  kakaoLogout = () => () => {
    console.log(window.Kakao.Auth.getAccessToken())
    window.Kakao.Auth.logout(function(data) {
      console.log(data)
    })
    axios
      .get("/logout")
      .then(response => {
        console.log(response.data)
        console.log("로그아웃 완료")
        window.location.reload()
      })
      .catch(err => console.log(err))
  }

  getInputDayLabel = time => {
    const week = [
      "일요일",
      "월요일",
      "화요일",
      "수요일",
      "목요일",
      "금요일",
      "토요일"
    ]
    const today = new Date(time).getDay()
    const todayLabel = week[today]
    return todayLabel
  }

  blockJoin = bool => () => {
    const { history, isLoginAlready } = this.props
    if (isLoginAlready) {
      if (!bool) {
        if (
          window.confirm(
            "미팅에 참여하실 '팀'을 먼저 결성해야 번호표를 뽑으실 수 있어요. 미팅 그룹 생성 페이지로 이동하실래요?"
          )
        ) {
          history.push("/team_profile")
        }
      }
    } else {
      window.alert("로그인이 필요한 서비스입니다.")
    }
  }

  render() {
    const {
      myProfile,
      currentMeeting,
      isLoginAlready,
      isJoinedAlready
    } = this.props

    const nowTime = new Date()
    const closeTime = Date.parse(currentMeeting.closeTime)
    const openTime = Date.parse(currentMeeting.openTime)
    const meetingTime = new Date(currentMeeting.meetingTime)
    const meetingDay = this.getInputDayLabel(currentMeeting.meetingTime)
    const isExpired = new Date().getTime() - closeTime > 0

    let meetingWeek = null
    if (
      nowTime.getDay() < meetingTime.getDay() &&
      meetingTime.getTime() - nowTime.getTime() <= 561600000
    ) {
      meetingWeek = "이번"
    } else if (
      nowTime.getDay() < meetingTime.getDay() &&
      meetingTime.getTime() - nowTime.getTime() > 561600000
    ) {
      meetingWeek = "다음"
    } else if (
      nowTime.getDay() > meetingTime.getDay() &&
      meetingTime.getTime() - nowTime.getTime() <= 561600000
    ) {
      meetingWeek = "다음"
    } else if (
      nowTime.getDay() > meetingTime.getDay() &&
      meetingTime.getTime() - nowTime.getTime() > 561600000
    ) {
      meetingWeek = "다다음"
    } else if (
      nowTime.getDay() === meetingTime.getDay() &&
      meetingTime.getTime() - nowTime.getTime() <= 561600000
    ) {
      meetingWeek = "이번"
    } else if (
      nowTime.getDay() === meetingTime.getDay() &&
      meetingTime.getTime() - nowTime.getTime() > 561600000
    ) {
      meetingWeek = "다음"
    } else {
      meetingWeek = ""
    }

    let authButton = null
    if (isLoginAlready) {
      authButton = (
        <div className="mt-18">
          {/* <div className="App font-05 hover" onClick={this.kakaoLogout()}>로그아웃</div> */}
          <Link
            to="/profile"
            className="font-grey font-bold font-16 w100percent"
            style={{ textDecoration: "none" }}
          >
            개인정보수정
          </Link>
        </div>
      )
    } else {
      // authButton = <div className="App"><a id="kakao-login-btn"></a></div>;
      authButton = (
        <div
          className="join-button-wrap bg-color-kakao mh-auto flex-center mt-2"
          onClick={this.kakaoLogin()}
        >
          <div className="font-notosan" style={{ color: "#3b1c1c" }}>
            <img
              src={require("../images/kakaoIcon.png")}
              style={{ height: "28px", marginRight: "6px" }}
            />
            카카오계정으로 로그인
          </div>
        </div>
      )
    }

    const lastShuffledAt = new Date(currentMeeting.prevMeetingLastShuffleTime) //나중에 하위 필드 추가되면 수정필요
    const lastTeamModifiedAt = new Date(myProfile.lastIntroModifiedAt)

    console.log(lastShuffledAt, lastTeamModifiedAt)
    let isMadeTeam = null
    if (lastShuffledAt < lastTeamModifiedAt) {
      isMadeTeam = true
    } else {
      isMadeTeam = false
    }
    let makeTeamButton = null
    if (isLoginAlready && !isExpired) {
      makeTeamButton = (
        <MakeTeamButton isMadeTeam={isMadeTeam} myProfile={myProfile} />
      )
    }

    const isStoreLoaded =
      !isNaN(openTime) && !isNaN(closeTime) && isJoinedAlready !== null
    const isWaitingMeeting = nowTime > openTime && isJoinedAlready

    return (
      <div className="frame bg-init-color">
        <div className="container-shadow mh-auto">
          {!isStoreLoaded ? (
            <Loading />
          ) : (
            <MeetingInfo
              makeTeamButton={makeTeamButton}
              currentMeeting={currentMeeting}
            />
          )}
        </div>
        {isStoreLoaded && isWaitingMeeting && <Redirect to="/" />}
        <div className="fix-bottom-init w100percent mb-36 mt-5">
          <div onClick={this.blockJoin(isMadeTeam)}>
            <JoinButton
              isLoginAlready={isLoginAlready}
              isMadeTeam={isMadeTeam}
            />
          </div>
          {authButton}
        </div>
      </div>
    )
  }
}

export default withHomeInfo(Initpage)
