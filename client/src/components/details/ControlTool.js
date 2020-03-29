import React, { Component } from "react"
import ExifOrientationImg from "react-exif-orientation-img"
import "../../css/Main.scss" //부모컴포넌트의CSS(SCSS)
import "../../App.css" //공통CSS
import { Link } from "react-router-dom" //다른 페이지로 링크 걸 때 필요
import CountDown from "./CountDown"
import GreenlightButton from "./GreenlightButton"

class ControlTool extends Component {
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
      currentMeeting,
      currentMatching,
      isGiftOn,
      handleGreenLight,
      isGreenlightOn
    } = this.props
    const { trialTime } = currentMatching

    const {
      closeTime,
      firstShuffleTime,
      secondShuffleTime,
      thirdShuffleTime
    } = currentMeeting
    let prevTargetTime = null
    let targetTime = null
    switch (trialTime) {
      case 1:
        prevTargetTime = new Date(closeTime).getTime()
        targetTime = new Date(firstShuffleTime).getTime()
        break
      case 2:
        prevTargetTime = new Date(firstShuffleTime).getTime()
        targetTime = new Date(secondShuffleTime).getTime()
        break
      case 3:
        prevTargetTime = new Date(secondShuffleTime).getTime()
        targetTime = new Date(thirdShuffleTime).getTime()
        break
      case 4:
        prevTargetTime = new Date(thirdShuffleTime).getTime()
        targetTime = new Date(thirdShuffleTime).getTime() // TODO: fourth 추가해서 수정필요
        break
    }

    return (
      <div className="control-container fix-bottom-controltool">
        <div className="control-tool">
          <div className="timer font-notosan font-13">
            <CountDown time={targetTime} />
          </div>
          <div className="action-container">
            <div className="column">
              <Link to="/team_profile">
                {/* 대표사진 */}
                <ExifOrientationImg
                  className="my-team"
                  src={myProfile.image || require("../../images/noPhoto.jpg")}
                  alt="my_image"
                />
              </Link>
            </div>
            <div className="column">
              <GreenlightButton
                currentMeeting={currentMeeting}
                prevTargetTime={prevTargetTime}
                targetTime={targetTime}
                handleGreenLight={handleGreenLight}
                myProfile={myProfile}
                isGreenlightOn={isGreenlightOn}
              />
            </div>
            <div className="column">
              <div className="gift" onClick={this.handleGift}>
                <div
                  className={
                    isGiftOn ? "gift-on font-jua" : "gift-off font-jua"
                  }
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
