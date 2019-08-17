import React, { Component } from 'react';
import '../../css/Main.scss'; //부모컴포넌트의CSS(SCSS)
import '../../App.css'; //공통CSS
import { Link } from 'react-router-dom'; //다른 페이지로 링크 걸 때 필요
import GiftPopup from "./GiftPopup";
import MaterialIcon from 'material-icons-react';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import * as currentMatchingActions from '../../modules/current_matching';
import * as playerActions from '../../modules/player';

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
        const { is_gift_popup, counter_profile, current_matching } = this.props;  
        const { is_greenlight_on_male, is_greenlight_on_female } = this.state;
        // 문서객체에 대한 필요한 분기는 여기서 미리 처리하기

        return (
            <div className={"App"}>
                {/* UI 코드 들어갈 곳 */}
                <Link to="/team_profile" className="App w100percent">내 팀 정보</Link>


                {is_gift_popup ? <GiftPopup  handleGift={this.handleGift} /> :
                
                <div className="counter-actions">
                {!counter_profile.is_male ? 
                <div  className="action-item">
                    그린라이트 : 
                    <span className="icon" onClick={this.handleGreenLight}>                    
                        {is_greenlight_on_male &&
                            <MaterialIcon icon="favorite" fontSize="200px" color="#0b6623" />
                        }
                        {!is_greenlight_on_male &&
                            <MaterialIcon icon="favorite" fontSize="200px" color="black" />
                        }
                    </span>
                    
                    안주쏘기 :
                    <span className="icon" onClick={this.handleGiftPopup}>
                        {current_matching.is_gift_male &&
                            <MaterialIcon icon="local_bar" fontSize="200px" color="orange" />
                        }
                        {!current_matching.is_gift_male &&
                            <MaterialIcon icon="local_bar" fontSize="200px" color="black" />
                        }
                    </span>
                </div>
                :
                <div className="action-item">
                    그린라이트 :
                    <span className="icon" onClick={this.handleGreenLight}>
                        {is_greenlight_on_female &&
                            <MaterialIcon icon="favorite" fontSize="200px" color="#0b6623" />
                        }
                        {!is_greenlight_on_female &&
                            <MaterialIcon icon="favorite" fontSize="200px" color="black" />
                        }
                    </span>
                    
                    안주쏘기 :
                    <span className="icon" onClick={this.handleGiftPopup}>
                        {current_matching.is_gift_female &&
                            <MaterialIcon icon="local_bar" fontSize="200px" color="orange" />
                        }
                        {!current_matching.is_gift_female &&
                            <MaterialIcon icon="local_bar" fontSize="200px" color="black" />
                        }
                    </span>
                </div>
                }
                </div>
                } 
                {/* 팝업용 분기 */}
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