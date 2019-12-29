import React, { Component } from "react"
import { Redirect } from "react-router-dom"
import "../css/Waiting.scss"
import "../App.css"
import MeetingInfo from "./details/MeetingInfo"
import MyNumber from "./details/MyNumber"
import ResultNumber from "./details/ResultNumber"
import JoinButton from "./details/JoinButton"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import * as currentMeetingActions from "./../modules/current_meeting"
import * as joinActions from "./../modules/join"
import * as myProfileActions from "../modules/my_profile"
import Loading from "./details/Loading"

class Waiting extends Component {
  componentDidMount() {
    const { JoinActions, CurrentMeetingActions, MyProfileActions } = this.props
    JoinActions.getJoinedUser()
    CurrentMeetingActions.getCurrentMeeting()
    MyProfileActions.getMyProfile()
  }

  render() {
    const {
      joinedUser,
      currentMeeting,
      isLoginAlready,
      isJoinedAlready
    } = this.props
    const closeTime = Date.parse(currentMeeting.closeTime)
    const openTime = Date.parse(currentMeeting.openTime)
    const nowTime = new Date().getTime()

    let numberInfo = null
    if (nowTime < closeTime) {
      numberInfo = <MyNumber rank={joinedUser.rank} />
    } else {
      numberInfo = (
        <ResultNumber cutline={currentMeeting.cutline} rank={joinedUser.rank} />
      )
    }

    const isStoreLoaded =
      !isNaN(openTime) &&
      !isNaN(closeTime) &&
      isLoginAlready !== null &&
      isJoinedAlready !== null
    const isWaitingMeeting = nowTime > openTime && isJoinedAlready

    return (
      <div className="frame bg-init-color">
        <div className="container-shadow mh-auto">
          <div className="waiting-header flex-center">
            <img
              src={require("./../images/callCall.png")}
              width="100px"
              alt="logo"
            />
          </div>
          {(isLoginAlready === false ||
            (isStoreLoaded && !isWaitingMeeting)) && <Redirect to="/init" />}
          {!isStoreLoaded ? (
            <Loading />
          ) : (
            <>
              {numberInfo}
              <MeetingInfo
                makeTeamButton={null}
                isMadeTeam={true}
                currentMeeting={currentMeeting}
              />
            </>
          )}
        </div>
        <div className="fix-bottom-waiting w100percent mb-36 mt-2">
          <JoinButton isLoginAlready={isLoginAlready} />
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  dispatch,
  JoinActions: bindActionCreators(joinActions, dispatch),
  CurrentMeetingActions: bindActionCreators(currentMeetingActions, dispatch),
  MyProfileActions: bindActionCreators(myProfileActions, dispatch)
})

const mapStateToProps = state => ({
  joinedUser: state.join.get("joinedUser"),
  isJoinedAlready: state.join.get("isJoinedAlready"),
  currentMeeting: state.current_meeting.get("currentMeeting"),
  isLoginAlready: state.my_profile.get("isLoginAlready")
})

export default connect(mapStateToProps, mapDispatchToProps)(Waiting)
