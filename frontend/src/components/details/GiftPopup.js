import React, { Component } from "react"
import "../../App.css"
import "../../css/Main.scss"

class GiftPopup extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      PlayerActions,
      handleGift,
      isGiftPopup,
      counterProfile,
      currentMatching
    } = this.props

    return (
      <div className="popup-container">
        {counterProfile.isMale ? (
          <div className="gift-popup">
            {currentMatching.isGiftFemale ? (
              <div className="message-box font-jua">
                <p>이미 안주를 쏘셨습니다.</p>
                <button
                  className="pop-button font-jua"
                  onClick={PlayerActions.deletePopup}
                >
                  확인
                </button>
              </div>
            ) : (
              <div className="message-box font-jua">
                <p>안주쏘기입니다. 이후 되돌릴 수 없습니다.</p>
                <button className="pop-button font-jua" onClick={handleGift}>
                  확인
                </button>
                <button
                  className="pop-button font-jua"
                  onClick={PlayerActions.deletePopup}
                >
                  취소
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="gift-popup">
            {currentMatching.isGiftMale ? (
              <div className="message-box font-jua">
                <p>이미 안주를 쏘셨습니다.</p>
                <button
                  className="pop-button font-jua"
                  onClick={PlayerActions.deletePopup}
                >
                  확인
                </button>
              </div>
            ) : (
              <div className="message-box font-jua">
                <p>안주쏘기입니다. 이후 되돌릴 수 없습니다.</p>
                <button className="pop-button font-jua" onClick={handleGift}>
                  확인
                </button>
                <button
                  className="pop-button font-jua"
                  onClick={PlayerActions.deletePopup}
                >
                  취소
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }
}

export default GiftPopup
