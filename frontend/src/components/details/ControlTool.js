import React, { Component } from "react"
import "../../css/Main.scss" //부모컴포넌트의CSS(SCSS)
import "../../App.css" //공통CSS
import { Link } from "react-router-dom" //다른 페이지로 링크 걸 때 필요
import CountDown from "./CountDown"

class ControlTool extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isGreenlightMaleOn: this.props.currentMatching.isGreenlightMale,
      isGreenlightFemaleOn: this.props.currentMatching.isGreenlightFemale,
      isGiftMaleOn: this.props.currentMatching.isGiftMale,
      isGiftFemaleOn: this.props.currentMatching.isGiftFemale
    }
  }

  handleGreenLight = () => {
    const { PlayerActions, counterProfile } = this.props
    const { isGreenlightMaleOn, isGreenlightFemaleOn } = this.state

    if (!isGreenlightMaleOn && !counterProfile.isMale) {
      PlayerActions.handleGreenLightOn({ male: true })
      this.setState({ isGreenlightMaleOn: true })
    } else if (!isGreenlightFemaleOn && counterProfile.isMale) {
      PlayerActions.handleGreenLightOn({ female: true })
      this.setState({ isGreenlightFemaleOn: true })
    } else if (isGreenlightMaleOn && !counterProfile.isMale) {
      PlayerActions.handleGreenLightOff({ male: false })
      this.setState({ isGreenlightMaleOn: false })
    } else if (isGreenlightFemaleOn && counterProfile.isMale) {
      PlayerActions.handleGreenLightOff({ female: false })
      this.setState({ isGreenlightFemaleOn: false })
    }
  }

  handleGift = () => {
    const { PlayerActions, currentMatching, counterProfile } = this.props

    if (!currentMatching.isGiftMale && !counterProfile.isMale) {
      window.confirm(
        "안주를 한 번 쏘고 나면 되돌릴 수 없습니다. 정말 쏘시겠습니까?"
      ) && PlayerActions.handleGiftOn({ male: true })
    } else if (!currentMatching.isGiftFemale && counterProfile.isMale) {
      window.confirm(
        "안주를 한 번 쏘고 나면 되돌릴 수 없습니다. 정말 쏘시겠습니까?"
      ) && PlayerActions.handleGiftOn({ female: true })
    } else {
      window.alert("이미 안주를 쏘셨습니다.")
    }
  }

  render() {
    const {
      PlayerActions,
      myProfile,
      counterProfile,
      currentMatching,
      currentMeeting
    } = this.props
    const { isGreenlightMaleOn, isGreenlightFemaleOn } = this.state

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
      countDown = <CountDown time={new Date(currentMeeting.thirdShuffleTime)} /> //수정필요
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
              {myProfile.isMale ? (
                <div className="greenlight-back">
                  <div
                    className="greenlight move-1"
                    onClick={this.handleGreenLight}
                  >
                    {isGreenlightMaleOn && (
                      <div className="call-button font-jua">콜!!</div>
                    )}
                    {!isGreenlightMaleOn && (
                      <div className="call-button font-jua">콜?</div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="greenlight-back">
                  <div
                    className="greenlight move-1"
                    onClick={this.handleGreenLight}
                  >
                    {isGreenlightFemaleOn && (
                      <div className="call-button font-jua">콜!!</div>
                    )}
                    {!isGreenlightFemaleOn && (
                      <div className="call-button font-jua">콜?</div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="column">
              {myProfile.isMale ? (
                <div className="gift" onClick={this.handleGift}>
                  {currentMatching.isGiftMale && (
                    <div className="gift-on font-jua">안주쏘기</div>
                  )}
                  {!currentMatching.isGiftMale && (
                    <div className="gift-off font-jua">안주쏘기</div>
                  )}
                </div>
              ) : (
                <div className="gift" onClick={this.handleGift}>
                  {currentMatching.isGiftFemale && (
                    <div className="gift-on font-jua">안주쏘기</div>
                  )}
                  {!currentMatching.isGiftFemale && (
                    <div className="gift-off font-jua">안주쏘기</div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ControlTool
