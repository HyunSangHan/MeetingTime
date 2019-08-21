import React, { Component } from 'react';
import '../../css/Main.scss'; //부모컴포넌트의CSS(SCSS)
import '../../App.css'; //공통CSS
import { Link } from 'react-router-dom'; //다른 페이지로 링크 걸 때 필요
import MaterialIcon from 'material-icons-react';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import * as currentMatchingActions from '../../modules/current_matching';
import * as playerActions from '../../modules/player';
import GiftPopup from "./GiftPopup";

class ControlTool extends Component {

    constructor(props) {
        super(props);
        this.state = {
            is_greenlight_on_male: this.props.current_matching.is_greenlight_male,
            is_greenlight_on_female: this.props.current_matching.is_greenlight_female,
        };  

    }

    componentDidMount() {
        const { PlayerActions, CurrentMatchingActions } = this.props;
        PlayerActions.getCounterProfile();
        CurrentMatchingActions.getCurrentMatching();
    }

    handleGreenLight = () =>{
        const { PlayerActions, counter_profile, CurrentMatchingActions } = this.props;
        const { is_greenlight_on_male, is_greenlight_on_female } = this.state;

        if (!is_greenlight_on_male && !counter_profile.is_male){
            PlayerActions.handleGreenLightOn({ male: true });
            this.setState({ is_greenlight_on_male : true }); 
            
        } else if (!is_greenlight_on_female && counter_profile.is_male){
            PlayerActions.handleGreenLightOn({ female: true });
            this.setState({ is_greenlight_on_female: true });

        } else if (is_greenlight_on_male && !counter_profile.is_male){
            PlayerActions.handleGreenLightOff({ male: false });
            this.setState({ is_greenlight_on_male: false });
            
        } else if (is_greenlight_on_female && counter_profile.is_male){
            PlayerActions.handleGreenLightOff({ female: false });
            this.setState({ is_greenlight_on_female: false });
        }

        CurrentMatchingActions.getCurrentMatching();

    };


    handleGift = () => {
        const { PlayerActions, counter_profile, CurrentMatchingActions } = this.props;
        const { is_gift_on_male, is_gift_on_female } = this.state;

        if (!is_gift_on_male && !counter_profile.is_male) {
            PlayerActions.handleGiftOn({ male: true });

        } else if (!is_gift_on_female && counter_profile.is_male) {
            PlayerActions.handleGiftOn({ female: true });

        //popup 닫기 및 매칭 업데이트해서 받기
        PlayerActions.deletePopup();
        CurrentMatchingActions.getCurrentMatching();
    
        }
    };

    handleGiftPopup = () => {
        const { PlayerActions } = this.props;
        PlayerActions.createPopup();
    }

    render() {
        const { PlayerActions, is_gift_popup, my_profile, counter_profile, current_matching, time } = this.props;  
        const { is_greenlight_on_male, is_greenlight_on_female } = this.state;
        // 문서객체에 대한 필요한 분기는 여기서 미리 처리하기
        console.log(is_gift_popup);

        return (
            <div className="control-container">

                <div className="gift-pop">
                    {is_gift_popup 
                        && 
                    <GiftPopup 
                        PlayerActions={PlayerActions}
                        is_gift_popup={is_gift_popup}
                        counter_profile={counter_profile}
                        current_matching={current_matching}
                        handleGift={this.handleGift} 
                    />
                    }
                </div>

                {/* 임시적으로 1분 미만의 시간 카운트  */}
                <div className="timer font-notosan">
                    {time < 10 ? 
                        <div> 00 : 0 {time} </div>
                    : 
                        <div> 00 : {time} </div>
                    }
                </div>

                <div className="action-container">
                    <div className="column">
                        <Link to="/team_profile">
                            {/* 대표사진 */}
                            <img className="my-team" src={my_profile.image || require("../../images/noPhoto.jpg")} />
                        </Link> 
                    </div>


                    <div className="column">      
                        {!counter_profile.is_male ? 
                        <div className="greenlight-back">
                            <div className="greenlight move-1" onClick={this.handleGreenLight}>
                                {is_greenlight_on_male &&
                                    <div className="call-button font-jua">
                                        콜?
                                    </div> 
                                }
                                {!is_greenlight_on_male &&
                                    <div className="call-button font-jua">
                                        콜!!
                                    </div> 
                                }
                            </div>
                        </div>
                        :
                        <div className="greenlight-back">
                            <div className="greenlight move-1" onClick={this.handleGreenLight}>
                                {is_greenlight_on_female &&
                                    <div className="call-button font-jua">
                                        콜?
                                    </div> 
                                }
                                {!is_greenlight_on_female &&
                                    <div className="call-button font-jua">
                                        콜!!
                                    </div> 
                                }
                            </div>
                        </div>
                        }
                    </div>   
                    
                    <div className="column">
                        {!counter_profile.is_male ? 
                        <div className="gift" onClick={this.handleGiftPopup}>
                            {current_matching.is_gift_male &&
                                <div className="gift-on font-jua">
                                    안주쏘기
                                </div> 
                            }
                            {!current_matching.is_gift_male &&
                                <div className="gift-off font-jua">
                                    안주쏘기
                                </div> 
                            }
                        </div>
                        :
                        <div className="gift" onClick={this.handleGiftPopup}>
                            {current_matching.is_gift_female &&
                                <div className="gift-on font-jua">
                                    안주쏘기
                                </div> 
                            }
                            {!current_matching.is_gift_female &&
                                <div className="gift-off font-jua">
                                    안주쏘기2
                                </div> 
                            }
                        </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    PlayerActions: bindActionCreators(playerActions, dispatch),
    CurrentMatchingActions: bindActionCreators(currentMatchingActions, dispatch),
});

const mapStateToProps = (state) => ({
    counter_profile: state.player.get('counter_profile'),
    is_gift_popup : state.player.get('is_gift_popup'),
    current_matching: state.current_matching.get('current_matching'),
    is_current_matching: state.current_matching.get('is_current_matching'),
})

export default connect(mapStateToProps, mapDispatchToProps)(ControlTool);