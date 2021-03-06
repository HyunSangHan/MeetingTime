import React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { getMyProfile } from "./my_profile"
import { getCurrentMeeting } from "./current_meeting"
import { getJoinedUser, createJoinedUser } from "./join"
import Loading from "../components/details/Loading"
import { isEmpty } from "./utils"

export default ComposedComponent => {
  class withHomeInfo extends React.Component {
    componentDidMount() {
      const { history, isLoginAlready, myProfile } = this.props
      isLoginAlready && isEmpty(myProfile.isMale) && history.push("/profile")
    }
    render() {
      const {
        currentMeeting,
        myProfile,
        getCurrentMeeting,
        getMyProfile,
        isLoginAlready
      } = this.props

      const lastShuffledAt = new Date(currentMeeting.prevMeetingLastResultTime) //나중에 하위 필드 추가되면 수정필요
      const lastTeamModifiedAt = new Date(myProfile.lastIntroModifiedAt)

      let isMadeTeam = null
      if (lastShuffledAt < lastTeamModifiedAt) {
        isMadeTeam = true
      } else {
        isMadeTeam = false
      }

      const isProfileLoaded =
        !isEmpty(myProfile) && !isEmpty(myProfile.user.username)
      const isMeetingLoaded =
        !isEmpty(currentMeeting) && !isEmpty(currentMeeting.openTime)

      isEmpty(isLoginAlready) && getMyProfile()
      !isMeetingLoaded && getCurrentMeeting()

      if (isProfileLoaded && isMeetingLoaded) {
        return <ComposedComponent {...this.props} isMadeTeam={isMadeTeam} />
      } else if (!isLoginAlready) {
        return <ComposedComponent {...this.props} isMadeTeam={false} />
      } else {
        return <Loading />
      }
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
