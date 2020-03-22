/* eslint-disable */
import React, { Component } from "react"
import "../css/Main.scss"
import "../App.css"
import { Container, Row, Col } from "reactstrap"
import MaterialIcon from "material-icons-react"
import { Link, Redirect } from "react-router-dom"
import { bindActionCreators } from "redux"
import Header from "./details/Header"
import CounterPlayer from "./details/CounterPlayer"
import ControlTool from "./details/ControlTool"
import ToolTipDown from "./details/ToolTipDown"
import Loading from "./details/Loading"
import { connect } from "react-redux"
import { getJoinedUser } from "../modules/join"
import { getCurrentMeeting } from "../modules/current_meeting"
import { getCurrentMatching } from "../modules/current_matching"
import {
  getCounterProfile,
  handleGreenLight,
  handleGift
} from "../modules/player"
import { getMyProfile } from "../modules/my_profile"
import axios from "axios"

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      emptyProfile: {
        ageRange: null,
        company: {
          name: null
        },
        createdAt: null,
        id: null,
        image: null,
        imageTwo: null,
        imageThree: null,
        isMale: false,
        lastIntroModifiedAt: null,
        lastLoginAt: null,
        teamIntroduce: null,
        user: {
          username: null
        },
        validated: false
      }
    }
  }

  componentDidMount() {
    const {
      isJoinedAlready,
      isLoginAlready,
      getCurrentMeeting,
      getCurrentMatching,
      getMyProfile,
      getCounterProfile,
      getJoinedUser
    } = this.props
    getCurrentMeeting()
    getCurrentMatching()
    getMyProfile()
    getCounterProfile()
    if (!isJoinedAlready) {
      getJoinedUser()
    } else {
      this.setState({
        loading: false
      })
    }
    {
      !isLoginAlready && <Redirect to="/" />
    }
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.isJoinedAlready) {
      this.setState({
        loading: false
      })
    }
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

  render() {
    const {
      myProfile,
      isJoinedPopupOn,
      isJoinedAlready,
      isLoginAlready,
      joinedUser,
      currentMeeting,
      isCurrentMatching,
      currentMatching,
      counterProfile,
      hasCounterProfile,
      getJoinedUser,
      getCounterProfile,
      getCurrentMatching,
      handleGift,
      handleGreenLight
    } = this.props
    const emptyProfile = this.state

    const nowTime = new Date()
    const meetingTime = new Date(currentMeeting.meetingTime)
    const meetingDay = this.getInputDayLabel(currentMeeting.meetingTime)

    let meetingWeek = null
    if (
      nowTime.getDay() < meetingTime.getDay() &&
      meetingTime.getTime() - nowTime.getTime() <= 561600000
    ) {
      meetingWeek = "이번주"
    } else if (
      nowTime.getDay() < meetingTime.getDay() &&
      meetingTime.getTime() - nowTime.getTime() > 561600000
    ) {
      meetingWeek = "다음주"
    } else if (
      nowTime.getDay() > meetingTime.getDay() &&
      meetingTime.getTime() - nowTime.getTime() <= 561600000
    ) {
      meetingWeek = "다음주"
    } else if (
      nowTime.getDay() > meetingTime.getDay() &&
      meetingTime.getTime() - nowTime.getTime() > 561600000
    ) {
      meetingWeek = "다다음주"
    } else if (
      nowTime.getDay() === meetingTime.getDay() &&
      meetingTime.getTime() - nowTime.getTime() <= 561600000
    ) {
      meetingWeek = "이번주"
    } else if (
      nowTime.getDay() === meetingTime.getDay() &&
      meetingTime.getTime() - nowTime.getTime() > 561600000
    ) {
      meetingWeek = "다음주"
    } else {
      meetingWeek = ""
    }

    const content = (
      <div className="inline-flex">
        {meetingWeek} {meetingDay} {currentMeeting.location} 미팅
        <div className="ml-1 font-lightgrey font-13">
          남은 셔플 {4 - currentMatching.trialTime}회
        </div>
      </div>
    )

    let isGift = null

    if (myProfile.isMale) {
      isGift = currentMatching.isGiftFemale
    } else {
      isGift = currentMatching.isGiftMale
    }

    return (
      <div className="main-container">
        <Header content={content} />
        <div className="profile">
          {this.state.loading ? (
            <Loading />
          ) : (
            <CounterPlayer
              myProfile={myProfile || emptyProfile}
              getCounterProfile={getCounterProfile}
              handleGreenLight={handleGreenLight}
              handleGift={handleGift}
              counterProfile={counterProfile}
              hasCounterProfile={hasCounterProfile}
              isGift={isGift}
            />
          )}
        </div>
        <ControlTool
          getJoinedUser={getJoinedUser}
          getCurrentMatching={getCurrentMatching}
          handleGift={handleGift}
          handleGreenLight={handleGreenLight}
          time={this.state.time}
          myProfile={myProfile || emptyProfile}
          counterProfile={counterProfile}
          hasCounterProfile={hasCounterProfile}
          isCurrentMatching={isCurrentMatching}
          currentMatching={currentMatching}
          currentMeeting={currentMeeting}
        />
        <br />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    handleGift: bindActionCreators(handleGift, dispatch),
    handleGreenLight: bindActionCreators(handleGreenLight, dispatch),
    getMyProfile: bindActionCreators(getMyProfile, dispatch),
    getCurrentMeeting: bindActionCreators(getCurrentMeeting, dispatch),
    getCurrentMatching: bindActionCreators(getCurrentMatching, dispatch),
    getJoinedUser: bindActionCreators(getJoinedUser, dispatch),
    getCounterProfile: bindActionCreators(getCounterProfile, dispatch)
  }
}

const mapStateToProps = state => ({
  isJoinedPopupOn: state.join.isJoinedPopupOn,
  isJoinedAlready: state.join.isJoinedAlready,
  isLoginAlready: state.my_profile.isLoginAlready,
  joinedUser: state.join.joinedUser,
  currentMeeting: state.current_meeting.currentMeeting,
  currentMatching: state.current_matching.currentMatching,
  counterProfile: state.player.counterProfile,
  hasCounterProfile: state.player.hasCounterProfile,
  isCurrentMatching: state.current_matching.isCurrentMatching,
  myProfile: state.my_profile.myProfile
})

export default connect(mapStateToProps, mapDispatchToProps)(Main)
