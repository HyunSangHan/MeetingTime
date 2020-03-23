import React, { Component } from "react"
import "../../css/Main.scss" //부모컴포넌트의CSS(SCSS)
import "../../App.css" //공통CSS
import { Link } from "react-router-dom" //다른 페이지로 링크 걸 때 필요
import CountDown from "./CountDown"

class ControlTool extends Component {
  handleGreenLight = () => {
    const { handleGreenLight, myProfile, isGreenlightOn } = this.props

    if (myProfile.isMale) {
      handleGreenLight({ isGreenlightMale: !isGreenlightOn })
    } else {
      handleGreenLight({ isGreenlightFemale: !isGreenlightOn })
    }
  }

  handleGift = () => {
    const { handleGift, myProfile, isGiftOn } = this.props
    if (isGiftOn) {
      window.alert("이미 안주를 쏘셨습니다.")
    } else if (myProfile.isMale) {
      window.confirm(
        "안주를 한 번 쏘고 나면 되돌릴 수 없습니다. 정말 쏘시겠습니까?"
      ) && handleGift({ isGiftMale: true })
    } else {
      window.confirm(
        "안주를 한 번 쏘고 나면 되돌릴 수 없습니다. 정말 쏘시겠습니까?"
      ) && handleGift({ isGiftFemale: true })
    }
  }

  render() {
    const {
      myProfile,
      currentMatching,
      currentMeeting,
      isGiftOn,
      isGreenlightOn
    } = this.props
    const {
      isGreenlightMale,
      isGreenlightFemale,
      isGiftMale,
      isGiftFemale
    } = this.props.currentMatching

    const giftOn =
      isGiftOn ||
      (myProfile.isMale && isGiftMale) ||
      (!myProfile.isMale && isGiftFemale)
    const greenlightOn =
      isGreenlightOn ||
      (myProfile.isMale && isGreenlightMale) ||
      (!myProfile.isMale && isGreenlightFemale)

    let countDown = null
    if (currentMatching.trialTime === 1) {
      countDown = <CountDown time={new Date(currentMeeting.firstShuffleTime)} />
    } else if (currentMatching.trialTime === 2) {
      countDown = (
        <CountDown time={new Date(currentMeeting.secondShuffleTime)} />
      )
    } else if (currentMatching.trialTime === 3) {
      countDown = <CountDown time={new Date(currentMeeting.thirdShuffleTime)} />
    } else if (currentMatching.trialTime === 4) {
      countDown = <CountDown time={new Date(currentMeeting.thirdShuffleTime)} /> // TODO: fourth 추가해서 수정필요
    }

    return (
      <div className="control-container fix-bottom-controltool">
        <div className="control-tool">
          {/* 임시적으로 1분 미만의 시간 카운트  */}
          <div className="timer font-notosan font-13">{countDown}</div>

          <div className="action-container">
            <div className="column">
              <Link to="/team_profile">
                {/* 대표사진 */}
                <img
                  className="my-team"
                  src={myProfile.image || require("../../images/noPhoto.jpg")}
                  alt="my_image"
                />
              </Link>
            </div>

            <div className="column">
              <div className="greenlight-back">
                <div
                  className="greenlight move-1"
                  onClick={this.handleGreenLight}
                >
                  <div className="call-button font-jua">
                    {greenlightOn ? "콜!!" : "콜?"}
                  </div>
                </div>
              </div>
            </div>

            <div className="column">
              <div className="gift" onClick={this.handleGift}>
                <div
                  className={giftOn ? "gift-on font-jua" : "gift-off font-jua"}
                >
                  안주쏘기
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ControlTool
