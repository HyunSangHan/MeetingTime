import React, { Component, Fragment } from "react"
import ExifOrientationImg from 'react-exif-orientation-img'
import "../../css/Initpage.scss" //부모컴포넌트의CSS(SCSS)
import "../../App.css" //공통CSS
import { Link } from "react-router-dom"
import ToolTipUp from "./ToolTipUp"

class MakeTeamButton extends Component {
  render() {
    const { isMadeTeam, myProfile } = this.props
    let makeTeamButton = null

    if (isMadeTeam) {
      makeTeamButton = (
        <div className="mt-4 mh-auto team-profile-img-warp">
          <ExifOrientationImg
            className="team-profile-img-small first-img"
            src={myProfile.image || require("./../../images/noPhoto.jpg")}
            alt="first_user_image"
          />
          <ExifOrientationImg
            className="team-profile-img-small second-img"
            src={myProfile.imageTwo || require("./../../images/noPhoto.jpg")}
            alt="second_user_image"
          />
          <ExifOrientationImg
            className="team-profile-img-small third-img"
            src={myProfile.imageThree || require("./../../images/noPhoto.jpg")}
            alt="third_user_image"
          />
        </div>
      )
    } else {
      makeTeamButton = (
        <Fragment>
          <div className="make-team-button mt-4 mh-auto flex-center">
            <div className="font-notosan font-white font-16">
              함께 미팅할 그룹만들기
            </div>
          </div>
          <div className="flex-center w100percent">
            <ToolTipUp content={"미리 그룹을 만들어두면 선착순에 유리해요!"} />
          </div>
        </Fragment>
      )
    }

    return (
      <div className="pb-36">
        <Link to="/team_profile" style={{ textDecoration: "none" }}>
          {makeTeamButton}
        </Link>
      </div>
    )
  }
}

export default MakeTeamButton
