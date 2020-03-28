import React, { Component } from "react"
import "../../css/Main.scss" //부모컴포넌트의CSS(SCSS)
import "../../App.css" //공통CSS
import ToolTipDown from './ToolTipDown';

class CounterPlayer extends Component {
  render() {
    const { counterProfile, isCounterGiftOn } = this.props;

    return (
      <div className="total-container top-m">
        <div className="counter-container">
        { isCounterGiftOn && <ToolTipDown content={ "안주는 저희가 쏩니다!" }/> }
          <div className="team-info">
            <div className="team-name font-notosan">
              {counterProfile.teamName}
            </div>
            <div className="age-range font-notosan">
              {counterProfile.ageRange}대 ·
            </div>
            <div className="company font-notosan">
              {counterProfile.company.name}
            </div>
          </div>
          <div className="team-intro font-notosan">
            {counterProfile.teamIntroduce}
          </div>
          <div className="margin-wrap" />
        </div>
        <div className="images-wrapper">
          <div className="images">
            <div className="each-image flex-center">
              <img
                className="user-image"
                src={
                  counterProfile.image || require("./../../images/noPhoto.jpg")
                }
                alt="first_user_image"
              />
            </div>
            <div className="each-image flex-center">
              <img
                className="user-image"
                src={
                  counterProfile.imageTwo ||
                  require("./../../images/noPhoto.jpg")
                }
                alt="second_user_image"
              />
            </div>
            <div className="each-image flex-center">
              <img
                className="user-image"
                src={
                  counterProfile.imageThree ||
                  require("./../../images/noPhoto.jpg")
                }
                alt="third_user_image"
              />
            </div>
            <div className="last-child-gap" />
          </div>
        </div>
      </div>
    )
  }
}

export default CounterPlayer
