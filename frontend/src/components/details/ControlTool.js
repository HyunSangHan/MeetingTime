import React, { Component } from "react"
import "../../css/Main.scss" //부모컴포넌트의CSS(SCSS)
import "../../App.css" //공통CSS
import { Link } from "react-router-dom" //다른 페이지로 링크 걸 때 필요
import CountDown from "./CountDown"

class ControlTool extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isGreenlightMale: this.props.currentMatching.isGreenlightMale,
      isGreenlightFemale: this.props.currentMatching.isGreenlightFemale,
      isGiftMale: this.props.currentMatching.isGiftMale,
      isGiftFemale: this.props.currentMatching.isGiftFemale
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      isGreenlightMale,
      isGreenlightFemale,
      isGiftMale,
      isGiftFemale
    } = this.props.currentMatching
    const isUpdated =
      isGreenlightMale !== nextProps.currentMatching.isGreenlightMale ||
      isGreenlightFemale !== nextProps.currentMatching.isGreenlightFemale ||
      isGiftMale !== nextProps.currentMatching.isGiftMale ||
      isGiftFemale !== nextProps.currentMatching.isGiftFemale
    if (isUpdated) {
      this.setState({
        isGreenlightMale: nextProps.currentMatching.isGreenlightMale,
        isGreenlightFemale: nextProps.currentMatching.isGreenlightFemale,
        isGiftMale: nextProps.currentMatching.isGiftMale,
        isGiftFemale: nextProps.currentMatching.isGiftFemale
      })
    }
  }

  handleGreenLight = () => {
    const { handleGreenLight, counterProfile } = this.props
    const { isGreenlightMale, isGreenlightFemale } = this.state

    if (!isGreenlightMale && !counterProfile.isMale) {
      handleGreenLight({ male: true }).then(
        this.setState({ isGreenlightMale: true })
      )
    } else if (!isGreenlightFemale && counterProfile.isMale) {
      handleGreenLight({ female: true }).then(
        this.setState({ isGreenlightFemale: true })
      )
    } else if (isGreenlightMale && !counterProfile.isMale) {
      handleGreenLight({ male: false }).then(
        this.setState({ isGreenlightMale: false })
      )
    } else if (isGreenlightFemale && counterProfile.isMale) {
      handleGreenLight({ female: false }).then(
        this.setState({ isGreenlightFemale: false })
      )
    }
  }

  handleGift = () => {
    const { handleGift, counterProfile, isGiftOn } = this.props
    const { isGiftMale, isGiftFemale } = this.state

    if (isGiftOn) {
      window.alert("이미 안주를 쏘셨습니다.")
    } else if (!isGiftMale && !counterProfile.isMale) {
      window.confirm(
        "안주를 한 번 쏘고 나면 되돌릴 수 없습니다. 정말 쏘시겠습니까?"
      ) && handleGift({ isGiftMale: true })
    } else if (!isGiftFemale && counterProfile.isMale) {
      window.confirm(
        "안주를 한 번 쏘고 나면 되돌릴 수 없습니다. 정말 쏘시겠습니까?"
      ) && handleGift({ isGiftFemale: false })
    } else {
      window.alert("이미 안주를 쏘셨습니다.")
    }
  }

  render() {
    const {
      myProfile,
      counterProfile,
      currentMatching,
      currentMeeting,
      isGiftOn
    } = this.props
    const {
      isGreenlightMale,
      isGreenlightFemale,
      isGiftMale,
      isGiftFemale
    } = this.state

    const giftOn =
      isGiftOn ||
      (myProfile.isMale && isGiftMale) ||
      (!myProfile.isMale && isGiftFemale)

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
                    {isGreenlightMale && (
                      <div className="call-button font-jua">콜!!</div>
                    )}
                    {!isGreenlightMale && (
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
                    {isGreenlightFemale && (
                      <div className="call-button font-jua">콜!!</div>
                    )}
                    {!isGreenlightFemale && (
                      <div className="call-button font-jua">콜?</div>
                    )}
                  </div>
                </div>
              )}
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
