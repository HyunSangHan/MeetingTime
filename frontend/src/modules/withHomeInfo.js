import React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as joinActions from "./join"
import * as currentMeetingActions from "./current_meeting"
import { getMyProfile } from "../modules/my_profile"
import { getCurrentMeeting } from "../modules/current_meeting"

export default ComposedComponent => {
  class withHomeInfo extends React.Component {
    componentDidMount() {
      const { JoinActions, myProfile } = this.props
      getCurrentMeeting().then(() => console.log(this.props.isLoginAlready))
      myProfile && !myProfile.user.username && getMyProfile()
      // myProfile.user.username && JoinActions.getJoinedUser()
    }

    componentWillReceiveProps(nextProps) {
      if (this.props.myProfile !== nextProps.myProfile) {
        this.props.JoinActions.getJoinedUser()
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  const mapDispatchToProps = dispatch => ({
    dispatch,
    JoinActions: bindActionCreators(joinActions, dispatch)
  })

  const mapStateToProps = state => ({
    isJoinedPopupOn: state.join.get("isJoinedPopupOn"),
    joinedUser: state.join.get("joinedUser"),
    isJoinedAlready: state.join.get("isJoinedAlready"),
    isLoginAlready: state.isLoginAlready,
    myProfile: state.myProfile,
    currentMeeting: state.currentMeeting
  })

  return connect(mapStateToProps, mapDispatchToProps)(withHomeInfo)
}
