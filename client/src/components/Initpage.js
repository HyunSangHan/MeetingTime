/* eslint-disable */
import React, { Component } from "react"
import "../css/Initpage.scss"
import "../App.css"
import { Link } from "react-router-dom"
import axios from "axios"
import MeetingInfo from "./details/MeetingInfo"
import MakeTeamButton from "./details/MakeTeamButton"
import JoinButton from "./details/JoinButton"
import Loading from "./details/Loading"
import withHomeInfo from "../modules/withHomeInfo"
import { getInputDayLabel, getInputNextLabel } from "../modules/utils"

class Initpage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true
    }
  }

  componentDidMount() {
    if (!this.props.isLoginAlready) {
      try {
        window.Kakao.init(process.env.REACT_APP_KAKAO_JAVSCRIPT_SDK_KEY)
      } catch (error) {
        console.log(error)
        window.location.reload()
      }
    }
  }

  kakaoLogin = () => {
    // 로그인 창을 띄웁니다.
    Kakao.Auth.login({
      success: function(authObj) {
        // 로그인 성공시, 장고의 KAKAO Login API를 호출함
        axios
          .post("/rest-auth/kakao/", {
            access_token: authObj.access_token,
            code: process.env.REACT_APP_KAKAO_REST_API_KEY
          })
          .then(() => axios.get("/profile"))
          .then(response => {
            console.log(
              "[로그인성공] " +
                response.data.user.username +
                "(회사:" +
                response.data.company.name +
                ")"
            )
            window.location.reload()
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

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({ isLoading: false })
    }
  }

  kakaoLogout = () => {
    window.Kakao.Auth.logout(function(data) {
      console.log(data)
    })
    axios
      .get("/logout")
      .then(response => {
        console.log("로그아웃 완료")
        window.location.reload()
      })
      .catch(err => console.log(err))
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
      getJoinedUser,
      createJoinedUser,
      currentMeeting,
      isLoginAlready,
      isJoinedAlready,
      joinedUser,
      isMadeTeam
    } = this.props

    const nowTime = new Date()
    const closeTime = Date.parse(currentMeeting.closeTime)
    const openTime = Date.parse(currentMeeting.openTime)
    const meetingTime = new Date(currentMeeting.meetingTime)
    const meetingDay = getInputDayLabel(currentMeeting.meetingTime)
    const meetingWeek = getInputNextLabel(currentMeeting.meetingTime)
    const isExpired = new Date().getTime() - closeTime > 0

    let authButton = null
    if (isLoginAlready) {
      authButton = (
        <div className="mt-18">
          {/* <div className="App font-05 hover" onClick={this.kakaoLogout}>로그아웃</div> */}
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
          onClick={this.kakaoLogin}
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

    let makeTeamButton = null
    if (isLoginAlready && !isExpired) {
      makeTeamButton = (
        <MakeTeamButton isMadeTeam={isMadeTeam} myProfile={myProfile} />
      )
    }

    const isWaitingMeeting = nowTime > openTime && isJoinedAlready
    isWaitingMeeting && this.props.history.push("/")

    return (
      <div className="frame bg-init-color">
        <div className="container-shadow mh-auto">
          {this.state.isLoading ? (
            <Loading />
          ) : (
            <MeetingInfo
              makeTeamButton={makeTeamButton}
              currentMeeting={currentMeeting}
            />
          )}
        </div>
        <div className="fix-bottom-init w100percent mb-36 mt-5">
          <div onClick={this.blockJoin(isMadeTeam)}>
            <JoinButton
              getJoinedUser={getJoinedUser}
              createJoinedUser={createJoinedUser}
              isMadeTeam={isMadeTeam}
              isLoginAlready={isLoginAlready}
              isJoinedAlready={isJoinedAlready}
              joinedUser={joinedUser}
              currentMeeting={currentMeeting}
            />
          </div>
          {authButton}
        </div>
      </div>
    )
  }
}

export default withHomeInfo(Initpage)
