import React, { Component } from "react";
import "../css/info_styles.scss";
import MaterialIcon from 'material-icons-react';
import * as playerActions from '../modules/player';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";

class CounterPlayer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            is_greenlight_on_male: this.props.current_matching.is_greenlight_male,
            is_greenlight_on_female: this.props.current_matching.is_greenlight_female,
            is_gift_on_male: this.props.current_matching.is_gift_male,
            is_gift_on_female: this.props.current_matching.is_gift_female
        };

    }

    componentDidMount() {
        const { PlayerActions } = this.props;
        PlayerActions.getCounterProfile();

    }

    _handleGreenLight = (event) =>{
        const { PlayerActions, counter_profile } = this.props;
        const { is_greenlight_on_male, is_greenlight_on_female } = this.state;
        
        if (is_greenlight_on_male === false && counter_profile.is_male === false){
            PlayerActions.handleGreenLightOn({ value1 : true });
            this.setState({ is_greenlight_on_male : true }); 
            
        } else if (is_greenlight_on_female === false && counter_profile.is_male === true){
            PlayerActions.handleGreenLightOn({ value2 : true });
            this.setState({ is_greenlight_on_female: true });

        } else if (is_greenlight_on_male === true && counter_profile.is_male === false){
            PlayerActions.handleGreenLightOff({ value1: false });
            this.setState({ is_greenlight_on_male: false });
            
        } else if (is_greenlight_on_female === true && counter_profile.is_male === true){
            PlayerActions.handleGreenLightOff({ value2: false });
            this.setState({ is_greenlight_on_female: false });
        }
    };

    _handleGift = (event) => {
        const { PlayerActions, counter_profile } = this.props;
        const { is_gift_on_male, is_gift_on_female } = this.state;

        if (is_gift_on_male === false && counter_profile.is_male === false) {
            PlayerActions.handleGiftOn({ value1: true });
            this.setState({ is_gift_on_male: true });

        } else if (is_gift_on_female === false && counter_profile.is_male === true) {
            PlayerActions.handleGiftOn({ value2: true });
            this.setState({ is_gift_on_female: true });

        } else if (is_gift_on_male === true && counter_profile.is_male === false) {
            PlayerActions.handleGiftOff({ value1: false });
            this.setState({ is_gift_on_male: false });

        } else if (is_gift_on_female === true && counter_profile.is_male === true) {
            PlayerActions.handleGiftOff({ value2: false });
            this.setState({ is_gift_on_female: false });
        }
    };
    
    
    render() {
        const { counter_profile, current_matching } = this.props;  
        const { is_greenlight_on_male, is_greenlight_on_female, is_gift_on_male, is_gift_on_female } = this.state;

        return (
            <div className="container">
                <h2 className="trial-time">당신의 { current_matching.trial_time } 번째 매칭상대</h2>
                <br/>
                <span>
                    <div className="column">
                        <img src={counter_profile.image || require("../images/noPhoto.jpg")}
                            alt={counter_profile.user.username}
                            className="main-profile"
                        />
                        <ul className="info-list">
                            <li className="list-item">이름 : {counter_profile.user.username}</li>
                            <li className="list-item">성별 : {counter_profile.is_male ? "남" : "여"}</li>
                            <li className="list-item">연령대 : {counter_profile.age_range ? counter_profile.age_range + "대" : "몰라요"}</li>
                            <li className="list-item">회사명 : {counter_profile.company.name}</li>
                            <li className="list-item">팀소개 : {counter_profile.team_introduce}</li>
                        </ul>
                    </div>
                </span>
                <br/>
                <div className="counter-actions">
                {!counter_profile.is_male ? 
                <div  className="action-item">
                    그린라이트 : 
                    <span className="icon" onClick={this._handleGreenLight}>                    
                        {is_greenlight_on_male &&
                            <MaterialIcon icon="favorite" fontSize="200px" color="#0b6623" />
                        }
                        {!is_greenlight_on_male &&
                            <MaterialIcon icon="favorite" fontSize="200px" color="black" />
                        }
                    </span>
                    
                    안주쏘기 :
                    <span className="icon" onClick={this._handleGift}>
                        {is_gift_on_male &&
                            <MaterialIcon icon="local_bar" fontSize="200px" color="orange" />
                        }
                        {!is_gift_on_male &&
                            <MaterialIcon icon="local_bar" fontSize="200px" color="black" />
                        }
                    </span>
                </div>
                :
                <div className="action-item">
                    그린라이트 :
                    <span className="icon" onClick={this._handleGreenLight}>
                        {is_greenlight_on_female &&
                            <MaterialIcon icon="favorite" fontSize="200px" color="#0b6623" />
                        }
                        {!is_greenlight_on_female &&
                            <MaterialIcon icon="favorite" fontSize="200px" color="black" />
                        }
                    </span>
                    
                    안주쏘기 :
                    <span className="icon" onClick={this._handleGift}>
                        {is_gift_on_female &&
                            <MaterialIcon icon="local_bar" fontSize="200px" color="orange" />
                        }
                        {!is_gift_on_female &&
                            <MaterialIcon icon="local_bar" fontSize="200px" color="black" />
                        }
                    </span>
                </div>
                }
                </div>
            </div>
         
        )
    };
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    PlayerActions: bindActionCreators(playerActions, dispatch),
});

const mapStateToProps = (state) => ({
    counter_profile: state.player.get('counter_profile'),
    is_greenlight_on: state.player.get('is_greenlight_on'),
    is_counter_profile: state.player.get('is_counter_profile'),
    
})

export default connect(mapStateToProps, mapDispatchToProps)(CounterPlayer);