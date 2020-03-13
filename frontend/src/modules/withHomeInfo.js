import React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { getMyProfile } from "../modules/my_profile"
import { getCurrentMeeting } from "../modules/current_meeting"
import { getJoinedUser } from "../modules/join"

export default ComposedComponent => {
  class withHomeInfo extends React.Component {
    componentWillReceiveProps(nextProps) {
      // if (this.props.myProfile !== nextProps.myProfile) {
      //   this.props.getJoinedUser()
      // }
    }

    render() {
      const { myProfile, getCurrentMeeting, getMyProfile } = this.props
      getCurrentMeeting()
      !myProfile && getMyProfile()
      return <ComposedComponent {...this.props} />
    }
  }

  const mapDispatchToProps = dispatch => ({
    dispatch,
    getMyProfile: bindActionCreators(getMyProfile, dispatch),
    getCurrentMeeting: bindActionCreators(getCurrentMeeting, dispatch),
    getJoinedUser: bindActionCreators(getJoinedUser, dispatch)
  })

  const mapStateToProps = state => ({
    joinedUser: state.join.joinedUser,
    isJoinedAlready: state.my_profile.isJoinedAlready,
    isLoginAlready: state.my_profile.isLoginAlready,
    myProfile: state.my_profile.myProfile,
    currentMeeting: state.current_meeting.currentMeeting
  })

  return connect(mapStateToProps, mapDispatchToProps)(withHomeInfo)
}
