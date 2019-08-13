import React, { Component } from "react";
import "../css/player_styles.scss";
import MyPlayer from "./MyPlayer";
import CounterPlayer from "./CounterPlayer";

import * as joinActions from '../modules/join';
import * as playerActions from '../modules/player';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";


class Player extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            action: "user"
        }
    }

    changeAction = () => {
        this.setState(prevState => {
            const { action } = prevState;
            if (action === 'user') {
                return {
                    action: 'counter_user'
                };
            } else if (action === 'counter_user') {
                return {
                    action: 'user'
                };
            }
        });
    }

    componentDidMount() {
        const { PlayerActions, JoinActions } = this.props;
        PlayerActions.getCounterProfile();
        JoinActions.getJoinedUser();
        //PlayerActions.handleGreenLightClick();
    }

    render(){
        const{ action } = this.state;
        const { PlayerActions, my_profile, joined_user, counter_profile, is_counterProfile, is_greenlight_on } = this.props;
        console.log(this.props);
        return (
            <div className="container">
                <div className="white-box form-box">
                    {action === "user" && <MyPlayer
                                            my_profile={my_profile} 
                    />}
                    {action === "counter_user" 
                        && is_counterProfile 
                        && <CounterPlayer 
                            handleGreenLightOn={PlayerActions.handleGreenLightOn}
                            handleGreenLightOff={PlayerActions.handleGreenLightOff}
                            counter_profile={counter_profile}
                            is_greenlight_on={is_greenlight_on}
                    />}
                </div>
                <div className="white-box">
                    {action === "user" && (<p>
                        매칭된 상대방을 정보를 확인하시겠습니까?{" "}
                        <span
                            className="change-link"
                            onClick={this.changeAction}
                        >
                            상대방 프로필
                        </span>
                    </p>)}
                    {action === "counter_user" && (<p>
                        내 정보를 보시겠습니까?{" "}
                        <span
                            className="change-link"
                            onClick={this.changeAction}
                        >
                            내 프로필
                        </span>
                    </p>)}
                </div>
            </div>
        );
    };

}

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    PlayerActions: bindActionCreators(playerActions, dispatch),
    JoinActions: bindActionCreators(joinActions, dispatch),
    
});

const mapStateToProps = (state) => ({
    joined_user: state.join.get('joined_user'),
    counter_profile: state.player.get('counter_profile'),
    is_greenlight_on: state.player.get('is_greenlight_on'),
    is_counterProfile: state.player.get('is_counterProfile'),
})

export default connect(mapStateToProps, mapDispatchToProps)(Player);
