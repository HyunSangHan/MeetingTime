import React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { getMyProfile } from "../modules/my_profile"
import { getCurrentMeeting } from "../modules/current_meeting"
import { getJoinedUser, createJoinedUser } from "../modules/join"

export default ComposedComponent => {
  class withHomeInfo extends React.Component {
    render() {
      const {
        currentMeeting,
        myProfile,
        getCurrentMeeting,
        getMyProfile
      } = this.props

      const lastShuffledAt = new Date(currentMeeting.prevMeetingLastResultTime) //나중에 하위 필드 추가되면 수정필요
      const lastTeamModifiedAt = new Date(myProfile.lastIntroModifiedAt)

      let isMadeTeam = null
      if (lastShuffledAt < lastTeamModifiedAt) {
        isMadeTeam = true
      } else {
        isMadeTeam = false
      }

      !myProfile.user.username && getMyProfile()
      !currentMeeting.openTime && getCurrentMeeting()
      return <ComposedComponent {...this.props} isMadeTeam={isMadeTeam} />
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
      dispatch,
      getMyProfile: bindActionCreators(getMyProfile, dispatch),
      getCurrentMeeting: bindActionCreators(getCurrentMeeting, dispatch),
      getJoinedUser: bindActionCreators(getJoinedUser, dispatch),
      createJoinedUser: bindActionCreators(createJoinedUser, dispatch)
    }
  }

  const mapStateToProps = state => {
    return {
      joinedUser: state.join.joinedUser,
      isJoinedAlready: state.join.isJoinedAlready,
      isLoginAlready: state.my_profile.isLoginAlready,
      myProfile: state.my_profile.myProfile,
      currentMeeting: state.current_meeting.currentMeeting
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(withHomeInfo)
}
