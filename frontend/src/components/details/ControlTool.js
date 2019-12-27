import React, { Component } from "react"
import "../../css/Main.scss" //부모컴포넌트의CSS(SCSS)
import "../../App.css" //공통CSS
import { Link } from "react-router-dom" //다른 페이지로 링크 걸 때 필요
import CountDown from "./CountDown"
import GiftPopup from "./GiftPopup"
import MaterialIcon from "material-icons-react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import * as currentMatchingActions from "../../modules/current_matching"
import * as playerActions from "../../modules/player"
import current_meeting from "../../modules/current_meeting"

class ControlTool extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isGreenlightMaleOn: this.props.currentMatching.isGreenlightMale,
      isGreenlightFemaleOn: this.props.currentMatching.isGreenlightFemale
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
    const {
      PlayerActions,
      currentMatching,
      counterProfile,
      CurrentMatchingActions
    } = this.props

    if (!currentMatching.isGiftMale && !counterProfile.isMale) {
      PlayerActions.handleGiftOn({ male: true })
    } else if (!currentMatching.isGiftFemale && counterProfile.isMale) {
      PlayerActions.handleGiftOn({ female: true })

      PlayerActions.deletePopup()
      CurrentMatchingActions.getCurrentMatching()
    }
  }

  handleGiftPopup = () => {
    const { PlayerActions } = this.props
    PlayerActions.createPopup()
  }

  render() {
    const {
      PlayerActions,
      isGiftPopup,
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
          <div className="gift-pop">
            {isGiftPopup && (
              <GiftPopup
                PlayerActions={PlayerActions}
                isGiftPopup={isGiftPopup}
                counterProfile={counterProfile}
                currentMatching={currentMatching}
                handleGift={this.handleGift}
              />
            )}
          </div>

          {/* 임시적으로 1분 미만의 시간 카운트  */}
          <div className="timer font-notosan font-13">{countDown}</div>

          <div className="action-container">
            <div className="column">
              <Link to="/team_profile">
                {/* 대표사진 */}
                <img
                  className="my-team"
                  src={myProfile.image || require("../../images/noPhoto.jpg")}
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
                <div className="gift" onClick={this.handleGiftPopup}>
                  {currentMatching.isGiftMale && (
                    <div className="gift-on font-jua">안주쏘기</div>
                  )}
                  {!currentMatching.isGiftMale && (
                    <div className="gift-off font-jua">안주쏘기</div>
                  )}
                </div>
              ) : (
                <div className="gift" onClick={this.handleGiftPopup}>
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

const mapDispatchToProps = dispatch => ({
  dispatch,
  PlayerActions: bindActionCreators(playerActions, dispatch),
  CurrentMatchingActions: bindActionCreators(currentMatchingActions, dispatch)
})

const mapStateToProps = state => ({
  counterProfile: state.player.get("counterProfile"),
  isGiftPopup: state.player.get("isGiftPopup"),
  currentMatching: state.current_matching.get("currentMatching"),
  isCurrentMatching: state.current_matching.get("isCurrentMatching")
})

export default connect(mapStateToProps, mapDispatchToProps)(ControlTool)
