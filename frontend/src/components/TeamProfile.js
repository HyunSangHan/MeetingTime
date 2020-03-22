import React, { Component } from "react"
import {
  getMyProfile,
  updateMyProfile,
  newTabOn,
  prevTabOn,
  createPopup,
  deletePopup
} from "../modules/my_profile"
import "../css/Profile.scss"
import "../App.css"
import Header from "./details/Header"
import TwoTab from "./details/TwoTab"
import TeamProfileBody from "./details/TeamProfileBody"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"

class TeamProfile extends Component {
  constructor(props) {
    console.log(props)
    super(props)
    this.state = {
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
    this.props.getMyProfile()
  }

  render() {
    const {
      getMyProfile,
      updateMyProfile,
      myProfile,
      isEditedProfile,
      clickedTab,
      newTabOn,
      prevTabOn
    } = this.props
    const { emptyProfile } = this.state
    const action = this.props.clickedTab
    return (
      <div className="frame-scrollable bg-init-color">
        <Header content={"미팅 그룹 생성"} />
        <TwoTab
          newTabOn={newTabOn}
          prevTabOn={prevTabOn}
          clickedTab={clickedTab}
        />
        <TeamProfileBody
          getMyProfile={getMyProfile}
          updateMyProfile={updateMyProfile}
          createPopup={createPopup}
          deletePopup={deletePopup}
          myProfile={action === "prev" ? myProfile : emptyProfile}
          isEditedProfile={isEditedProfile}
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
    newTabOn: bindActionCreators(newTabOn, dispatch),
    prevTabOn: bindActionCreators(prevTabOn, dispatch)
  }
}

const mapStateToProps = state => ({
  isLoginAlready: state.my_profile.isLoginAlready,
  isEditedProfile: state.my_profile.isEditedProfile,
  myProfile: state.my_profile.myProfile,
  clickedTab: state.my_profile.clickedTab
})

export default connect(mapStateToProps, mapDispatchToProps)(TeamProfile)
