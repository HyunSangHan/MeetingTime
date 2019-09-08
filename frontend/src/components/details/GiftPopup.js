
import React, { Component } from 'react';
import '../../App.css';
import '../../css/Main.scss';

class GiftPopup extends Component {

    constructor(props) {
        super(props);
    };

    render() {
        const { PlayerActions, handleGift, is_gift_popup, counter_profile, current_matching } = this.props;

        return (
            <div className="popup-container">
                {counter_profile.is_male ?
                    <div className="gift-popup">
                        {current_matching.is_gift_female ?
                            <div className="message-box font_jua">
                                <p>이미 안주를 쏘셨습니다.</p>
                                <button className="pop-button font_jua" onClick={PlayerActions.deletePopup}>확인</button>
                            </div>
                            :
                            <div className="message-box font_jua">
                                <p>안주쏘기입니다. 이후 되돌릴 수 없습니다.</p>
                                <button className="pop-button font_jua" onClick={handleGift}>확인</button>
                                <button className="pop-button font_jua" onClick={PlayerActions.deletePopup}>취소</button>
                            </div>
                        }
                    </div>
                    :
                    <div className="gift-popup">
                        {current_matching.is_gift_male ?
                            <div className="message-box font_jua">
                                <p>이미 안주를 쏘셨습니다.</p>
                                <button className="pop-button font_jua" onClick={PlayerActions.deletePopup}>확인</button>
                            </div>
                            :
                            <div className="message-box font_jua">
                                <p>안주쏘기입니다. 이후 되돌릴 수 없습니다.</p>
                                <button className="pop-button font_jua" onClick={handleGift}>확인</button>
                                <button className="pop-button font_jua" onClick={PlayerActions.deletePopup}>취소</button>
                            </div>
                        }
                    </div>
                }
            </div>

        );
    }
}

export default GiftPopup;