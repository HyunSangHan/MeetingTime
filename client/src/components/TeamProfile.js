import React, { Component } from "react"
import {
  getMyProfile,
  updateMyProfile,
  newTabOn,
  prevTabOn
} from "../modules/my_profile"
import { getCurrentMeeting } from "../modules/current_meeting"
import "../css/Profile.scss"
import "../App.css"
import Header from "./details/Header"
import TwoTab from "./details/TwoTab"
import TeamProfileBody from "./details/TeamProfileBody"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { isEmpty } from "../modules/utils"

class TeamProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      emptyProfile: {
        ageRange: null,
        company: {
          name: null
        },
        createdAt: null,
        id: null,
        imageFirst: null,
        imageSecond: null,
        imageThird: null,
        isMale: null,
        lastIntroModifiedAt: null,
        lastLoginAt: null,
        teamIntroduce: null,
        user: {
          username: null
        },
        isValidated: false
      }
    }
  }

  componentDidMount() {
    const {
      isLoginAlready,
      getMyProfile,
      getCurrentMeeting,
      currentMeeting
    } = this.props
    isEmpty(isLoginAlready) && getMyProfile()

    const isMeetingLoaded =
      !isEmpty(currentMeeting) && !isEmpty(currentMeeting.openTime)

    isEmpty(isLoginAlready) && getMyProfile()
    !isMeetingLoaded && getCurrentMeeting()
  }

  render() {
    const {
      getMyProfile,
      updateMyProfile,
      myProfile,
      currentMeeting,
      clickedTab,
      newTabOn,
      prevTabOn,
      isLoginAlready,
      history
    } = this.props
    const { emptyProfile } = this.state
    const action = this.props.clickedTab

    isLoginAlready === false && history.push("/")

    return (
      <div className="frame-scrollable bg-init-color">
        <Header content={"미팅 그룹 생성"} />
        <TwoTab
          newTabOn={newTabOn}
          prevTabOn={prevTabOn}
          clickedTab={clickedTab}
        />
        <TeamProfileBody
          newTabOn={newTabOn}
          prevTabOn={prevTabOn}
          getMyProfile={getMyProfile}
          updateMyProfile={updateMyProfile}
          myProfile={action === "prev" ? myProfile : emptyProfile}
          currentMeeting={currentMeeting}
          clickedTab={clickedTab}
        />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    getMyProfile: bindActionCreators(getMyProfile, dispatch),
    updateMyProfile: bindActionCreators(updateMyProfile, dispatch),
    getCurrentMeeting: bindActionCreators(getCurrentMeeting, dispatch),
    newTabOn: bindActionCreators(newTabOn, dispatch),
    prevTabOn: bindActionCreators(prevTabOn, dispatch)
  }
}

const mapStateToProps = state => ({
  isLoginAlready: state.my_profile.isLoginAlready,
  myProfile: state.my_profile.myProfile,
  currentMeeting: state.current_meeting.currentMeeting,
  clickedTab: state.my_profile.clickedTab
})

export default connect(mapStateToProps, mapDispatchToProps)(TeamProfile)
