import React, { Component } from "react";
import "../css/player_styles.scss";
import MyPlayer from "./MyPlayer";
import CounterPlayer from "./CounterPlayer";

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
    }

    render(){
        const{ action } = this.state;
        const { PlayerActions, current_matching, my_profile, counter_profile, is_counter_profile,  joined_user } = this.props;
        console.log(this.props);
        return (
            <div className="container">
                <div className="white-box form-box">
                    {action === "user" && <MyPlayer
                                            current_matching={current_matching} 
                                            />
                    }
                    {action === "counter_user" 
                        && is_counter_profile 
                        && <CounterPlayer />
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

export default Player;
