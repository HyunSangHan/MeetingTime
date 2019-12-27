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
      empty_profile: {
        age_range: null,
        company: {
          name: null
        },
        created_at: null,
        id: null,
        image: null,
        image_two: null,
        image_three: null,
        is_male: false,
        last_intro_modified_at: null,
        last_login_at: null,
        team_introduce: null,
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
      my_profile,
      is_edited_profile,
      clicked_tab
    } = this.props
    const action = this.props.clicked_tab
    return (
      <div className="frame-scrollable bg-init-color">
        <Header content={"미팅 그룹 생성"} />
        <TwoTab MyProfileActions={MyProfileActions} clicked_tab={clicked_tab} />

        {action === "new" && (
          <TeamProfileBody
            MyProfileActions={MyProfileActions}
            my_profile={this.state.empty_profile}
            is_edited_profile={is_edited_profile}
          />
        )}
        {action === "prev" && (
          <TeamProfileBody
            MyProfileActions={MyProfileActions}
            my_profile={my_profile}
            MyProfileActions={MyProfileActions}
            is_edited_profile={is_edited_profile}
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
  is_login_already: state.my_profile.get("is_login_already"),
  is_edited_profile: state.my_profile.get("is_edited_profile"),
  my_profile: state.my_profile.get("my_profile"),
  clicked_tab: state.my_profile.get("clicked_tab")
})

export default connect(mapStateToProps, mapDispatchToProps)(TeamProfile)
