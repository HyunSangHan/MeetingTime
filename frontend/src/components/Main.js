/* eslint-disable */
import React, { Component } from "react"
import "../css/Main.scss"
import "../App.css"
import { bindActionCreators } from "redux"
import Header from "./details/Header"
import CounterPlayer from "./details/CounterPlayer"
import ControlTool from "./details/ControlTool"
import ToolTipDown from "./details/ToolTipDown"
import Loading from "./details/Loading"
import { connect } from "react-redux"
import { getJoinedUser } from "../modules/join"
import { getCurrentMeeting } from "../modules/current_meeting"
import {
  getCurrentMatching,
  getCounterProfile,
  handleGreenLight,
  handleGift
} from "../modules/current_matching"
import { getMyProfile } from "../modules/my_profile"
import { getInputWeekLabel, getInputDayLabel } from "../modules/utils"

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
    !isLoginAlready && this.props.history.push("/")
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.isJoinedAlready) {
      this.setState({
        loading: false
      })
    }
  }

  render() {
    const {
      myProfile,
      currentMeeting,
      isCurrentMatching,
      currentMatching,
      counterProfile,
      hasCounterProfile,
      getJoinedUser,
      getCounterProfile,
      getCurrentMatching,
      handleGift,
      handleGreenLight,
      isGiftOn,
      isGreenlightOn
    } = this.props

    const emptyProfile = this.state
    const meetingWeek = getInputWeekLabel(currentMeeting.meetingTime)
    const meetingDay = getInputDayLabel(currentMeeting.meetingTime)

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
          isGiftOn={isGiftOn}
          isGreenlightOn={isGreenlightOn}
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
  counterProfile: state.current_matching.counterProfile,
  hasCounterProfile: state.current_matching.hasCounterProfile,
  isGiftOn: state.current_matching.isGiftOn,
  isGreenlightOn: state.current_matching.isGreenlightOn,
  isCurrentMatching: state.current_matching.isCurrentMatching,
  myProfile: state.my_profile.myProfile
})

export default connect(mapStateToProps, mapDispatchToProps)(Main)
