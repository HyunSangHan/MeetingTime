import React, { Component } from "react"
import { Redirect } from "react-router-dom"
import "../css/Waiting.scss"
import "../App.css"
import MeetingInfo from "./details/MeetingInfo"
import MyNumber from "./details/MyNumber"
import ResultNumber from "./details/ResultNumber"
import JoinButton from "./details/JoinButton"
import Loading from "./details/Loading"
import withHomeInfo from "../modules/withHomeInfo"

class Waiting extends Component {
  render() {
    const {
      isMadeTeam,
      getJoinedUser,
      createJoinedUser,
      joinedUser,
      currentMeeting,
      isLoginAlready,
      isJoinedAlready
    } = this.props
    getJoinedUser()
    console.log(this.props)

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
      </div>
    )
  }
}

export default withHomeInfo(Waiting)
