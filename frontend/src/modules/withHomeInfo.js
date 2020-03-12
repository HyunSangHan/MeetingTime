import React from "react"
import { connect } from "react-redux"
// import { bindActionCreators } from "redux"
import { getMyProfile } from "../modules/my_profile"
import { getCurrentMeeting } from "../modules/current_meeting"
import { getJoinedUser } from "../modules/join"

export default ComposedComponent => {
  class withHomeInfo extends React.Component {
    componentDidMount() {
      const { myProfile } = this.props
      getCurrentMeeting().then(() => console.log(this.props.isLoginAlready))
      myProfile && !myProfile.user.username && getMyProfile()
      // myProfile.user.username && JoinActions.getJoinedUser()
    }

    componentWillReceiveProps(nextProps) {
      if (this.props.myProfile !== nextProps.myProfile) {
        getJoinedUser()
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  const mapStateToProps = state => ({
    joinedUser: state.join.joinedUser,
    isJoinedAlready: state.my_profile.isJoinedAlready,
    isLoginAlready: state.my_profile.isLoginAlready,
    myProfile: state.my_profile.myProfile,
    currentMeeting: state.current_meeting.currentMeeting
  })

  return connect(mapStateToProps)(withHomeInfo)
}
