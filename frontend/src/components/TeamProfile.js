import React, { Component } from "react"
import * as myProfileActions from "../modules/my_profile"
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

  render() {
    const {
      MyProfileActions,
      myProfile,
      isEditedProfile,
      clickedTab
    } = this.props
    const action = this.props.clickedTab
    return (
      <div className="frame-scrollable bg-init-color">
        <Header content={"미팅 그룹 생성"} />
        <TwoTab MyProfileActions={MyProfileActions} clickedTab={clickedTab} />

        {action === "new" && (
          <TeamProfileBody
            MyProfileActions={MyProfileActions}
            myProfile={this.state.emptyProfile}
            isEditedProfile={isEditedProfile}
          />
        )}
        {action === "prev" && (
          <TeamProfileBody
            MyProfileActions={MyProfileActions}
            myProfile={myProfile}
            isEditedProfile={isEditedProfile}
          />
        )}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  dispatch,
  MyProfileActions: bindActionCreators(myProfileActions, dispatch)
})

const mapStateToProps = state => ({
  isLoginAlready: state.my_profile.get("isLoginAlready"),
  isEditedProfile: state.my_profile.get("isEditedProfile"),
  myProfile: state.my_profile.get("myProfile"),
  clickedTab: state.my_profile.get("clickedTab")
})

export default connect(mapStateToProps, mapDispatchToProps)(TeamProfile)
