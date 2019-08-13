import React, { Component } from "react";
import "../css/player_styles.scss";
import MyPlayer from "./MyPlayer";
import CounterPlayer from "./CounterPlayer";



class Player extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            action: "my_profile"
        }

    }

    changeAction = () => {
        this.setState(prevState => {
            const { action } = prevState;
            if (action === 'my_profile') {
                return {
                    action: 'counter_profile'
                };
            } else if (action === 'counter_profile') {
                return {
                    action: 'my_profile'
                };
            }
        });
    }
    render(){
        const{ action } = this.state;
        console.log(action);
        return (
            <div className="container">
                <div className="white-box form-box">
                    {action === "my_profile" && <MyPlayer/>}
                    {action === "counter_profile" && <CounterPlayer/>}
                </div>
                <div className="white-box">
                    {action === "my_profile" && (<p>
                        매칭된 상대방을 정보를 확인하시겠습니까?{" "}
                        <span
                            className="change-link"
                            onClick={this.changeAction}
                        >
                            상대방 프로필
                        </span>
                    </p>)}
                    {action === "counter_profile" && (<p>
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
