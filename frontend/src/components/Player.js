import React, { Component } from "react";
import "../css/player_styles.scss";
import MyPlayer from "./MyPlayer";
import CounterPlayer from "./CounterPlayer";

import * as currentMatchingActions from "../modules/current_matching";
import * as joinActions from '../modules/join';
import * as playerActions from '../modules/player';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";


class Player extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            action: "user",
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
        const { JoinActions, PlayerActions, CurrentMatchingActions } = this.props;
        console.log("매칭 새로받기 성공");
        CurrentMatchingActions.getCurrentMatching();
        JoinActions.getJoinedUser();
        PlayerActions.getCounterProfile();
    }

    render(){
        const{ action } = this.state;
        const { current_matching, joined_user, is_counter_profile } = this.props;
        console.log(current_matching);
        return (
            <div className="container">
                <div className="white-box form-box">
                    {action === "user" && <MyPlayer
                                            current_matching={current_matching} 
                                            joined_user={joined_user}
                                          />
                    }
                    {action === "counter_user" 
                        && is_counter_profile 
                        && <CounterPlayer 
                           />
                    }
                    {action === "counter_user"
                        && !is_counter_profile && <p className="no-matching">"현재 매칭된 상대가 없습니다."</p>
                    }
                </div>

                <div className="white-box">
                    {action === "user" && (<p className="change-player">
                        매칭 상대의 정보를 확인하시겠습니까?{" "}
                        <span
                            className="change-link"
                            onClick={this.changeAction}
                        >
                            상대방 프로필
                        </span>
                    </p>)}
                    {action === "counter_user" && (<p className="change-player">
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
    JoinActions: bindActionCreators(joinActions, dispatch),
    PlayerActions: bindActionCreators(playerActions, dispatch),
    CurrentMatchingActions: bindActionCreators(currentMatchingActions, dispatch),
});

const mapStateToProps = (state) => ({
    joined_user: state.join.get('joined_user'),
    is_counter_profile: state.player.get('is_counter_profile'),
    current_matching : state.current_matching.get('current_matching'),
    is_current_matching: state.current_matching.get('is_current_matching'),
})

export default connect(mapStateToProps, mapDispatchToProps)(Player);
