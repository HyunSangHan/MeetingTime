import React, { Component } from "react";
import "../css/player_styles.scss";
import MyPlayer from "./MyPlayer";
import CounterPlayer from "./CounterPlayer";

import * as joinActions from '../modules/join';
import * as playerActions from '../modules/player';
import * as matchingActions from '../modules/matching';
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
        const { JoinActions, MatchingActions, PlayerActions } = this.props;
        JoinActions.getJoinedUser();
        MatchingActions.getCurrentMatching();
        PlayerActions.getCounterProfile();
    }

    render(){
        const{ action } = this.state;
        const {  current_matching, joined_user, is_counterProfile } = this.props;
        console.log(this.props);
        return (
            <div className="container">
                <div className="white-box form-box">
                    {action === "user" && <MyPlayer
                                            current_matching={current_matching} 
                                            joined_user={joined_user}
                                          />
                    }
                    {action === "counter_user" 
                        && is_counterProfile 
                        && <CounterPlayer 
                            current_matching={current_matching}
                           />
                    }
                    {action === "counter_user"
                        && !is_counterProfile && "현재 매칭된 상대가 없습니다."
                    }
                </div>
                
                <div className="white-box">
                    {action === "user" && (<p>
                        매칭 상대의 정보를 확인하시겠습니까?{" "}
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
    JoinActions: bindActionCreators(joinActions, dispatch),
    MatchingActions: bindActionCreators(matchingActions, dispatch),
    PlayerActions: bindActionCreators(playerActions, dispatch),
});

const mapStateToProps = (state) => ({
    joined_user: state.join.get('joined_user'),
    current_matching: state.matching.get('current_matching'),
    is_counterProfile: state.player.get('is_counterProfile'),
})

export default connect(mapStateToProps, mapDispatchToProps)(Player);
