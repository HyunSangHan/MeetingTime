/* eslint-disable */
import React, { Component } from "react"
import "../css/Main.scss"
import "../App.css"
import { Container, Row, Col } from "reactstrap"
import MaterialIcon from "material-icons-react"
import { Link, Redirect } from "react-router-dom"
import Header from "./details/Header"
import CounterPlayer from "./details/CounterPlayer"
import ControlTool from "./details/ControlTool"
import ToolTipDown from "./details/ToolTipDown"
import Loading from "./details/Loading"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as joinActions from "../modules/join"
import * as currentMeetingActions from "../modules/current_meeting"
import * as currentMatchingActions from "../modules/current_matching"
import * as playerActions from "../modules/player"
import * as myProfileActions from "../modules/my_profile"
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
      CurrentMeetingActions,
      CurrentMatchingActions,
      MyProfileActions,
      PlayerActions,
      JoinActions,
      isJoinedAlready,
      isLoginAlready
    } = this.props
    CurrentMeetingActions.getCurrentMeeting()
    CurrentMatchingActions.getCurrentMatching()
    MyProfileActions.getMyProfile()
    PlayerActions.getCounterProfile()
    if (!isJoinedAlready) {
      JoinActions.getJoinedUser()
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
      isGiftPopup,
      myProfile,
      JoinActions,
      isJoinedPopupOn,
      isJoinedAlready,
      isLoginAlready,
      joinedUser,
      currentMeeting,
      isCurrentMatching,
      currentMatching,
      PlayerActions,
      CurrentMatchingActions,
      counterProfile,
      isCounterProfile
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

    let isGift = null;

    if (my_profile.is_male) {
      isGift = current_matching.is_gift_female
    } else {
      isGift = current_matching.is_gift_male
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
              PlayerActions={PlayerActions}
              counterProfile={counterProfile}
              isCounterProfile={isCounterProfile}
              isGift={isGift}
            />
          )}
        </div>
        <ControlTool
          time={this.state.time}
          myProfile={myProfile || emptyProfile}
          PlayerActions={PlayerActions}
          CurrentMatchingActions={CurrentMatchingActions}
          counterProfile={counterProfile}
          isCounterProfile={isCounterProfile}
          isGiftPopup={isGiftPopup}
          currentMatching={currentMatching}
          currentMeeting={currentMeeting}
        />
        <br />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  dispatch,
  JoinActions: bindActionCreators(joinActions, dispatch),
  CurrentMeetingActions: bindActionCreators(currentMeetingActions, dispatch),
  CurrentMatchingActions: bindActionCreators(currentMatchingActions, dispatch),
  PlayerActions: bindActionCreators(playerActions, dispatch),
  MyProfileActions: bindActionCreators(myProfileActions, dispatch)
})

const mapStateToProps = state => ({
  isJoinedPopupOn: state.join.get("isJoinedPopupOn"),
  isJoinedAlready: state.join.get("isJoinedAlready"),
  isLoginAlready: state.my_profile.get("isLoginAlready"),
  joinedUser: state.join.get("joinedUser"),
  currentMeeting: state.current_meeting.get("currentMeeting"),
  currentMatching: state.current_matching.get("currentMatching"),
  counterProfile: state.player.get("counterProfile"),
  isCounterProfile: state.player.get("isCounterProfile"),
  isGiftPopup: state.player.get("isGiftPopup"),
  isCurrentMatching: state.current_matching.get("isCurrentMatching")
})

export default connect(mapStateToProps, mapDispatchToProps)(Main)
