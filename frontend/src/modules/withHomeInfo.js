import React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as joinActions from "./join"
import * as currentMeetingActions from "./current_meeting"
import * as myProfileActions from "./my_profile"

export default ComposedComponent => {
  class withHomeInfo extends React.Component {
    componentDidMount() {
      const {
        JoinActions,
        CurrentMeetingActions,
        MyProfileActions,
        myProfile
      } = this.props
      CurrentMeetingActions.getCurrentMeeting()
      !myProfile.user.username && MyProfileActions.getMyProfile()
      myProfile.user.username && JoinActions.getJoinedUser()
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  const mapDispatchToProps = dispatch => ({
    dispatch,
    JoinActions: bindActionCreators(joinActions, dispatch),
    CurrentMeetingActions: bindActionCreators(currentMeetingActions, dispatch),
    MyProfileActions: bindActionCreators(myProfileActions, dispatch)
  })

  const mapStateToProps = state => ({
    isJoinedPopupOn: state.join.get("isJoinedPopupOn"),
    joinedUser: state.join.get("joinedUser"),
    isJoinedAlready: state.join.get("isJoinedAlready"),
    isLoginAlready: state.my_profile.get("isLoginAlready"),
    myProfile: state.my_profile.get("myProfile"),
    currentMeeting: state.current_meeting.get("currentMeeting")
  })

  return connect(mapStateToProps, mapDispatchToProps)(withHomeInfo)
}
