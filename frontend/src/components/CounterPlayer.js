import React, { Component } from "react";
import "../css/info_styles.scss";
import MaterialIcon from 'material-icons-react';


class CounterPlayer extends Component {

    constructor(props) {
        super(props);

    }
    
    render() {
        const { counter_profile, current_matching } = this.props;
        console.log(this.props);
        return (
            
            <div>
                <h3>당신의 {current_matching.trial_time} 번째 매칭상대</h3>
                <img src={counter_profile.image || require("../images/noPhoto.jpg")} 
                     alt={counter_profile.user.username}/>
                <div className="information">
                    <div>이름 : {counter_profile.user.username}</div>
                    <div>연령대 : {counter_profile.age_range}</div>
                    <div>회사명 : {counter_profile.company.name}</div>
                    <div>팀소개 : {counter_profile.team_introduce}</div>
                </div>
                
                <span className="icon" onClick={this.props.handleGreenLightOn}>                    
                    
                    {this.props.is_greenlight_on &&
                        <MaterialIcon icon="favorite" fontSize="40px" color="#0b6623" />
                    }
                    {!this.props.is_greenlight_on &&
                        <MaterialIcon icon="favorite" fontSize="40px" color="darkgrey" />
                    }
                </span>
                그린라이트 ON 버튼
                <span className="icon" onClick={this.props.handleGreenLightOff}>
                    
                    {this.props.is_greenlight_on &&
                        <MaterialIcon icon="favorite" fontSize="40px" color="#0b6623" />
                    }
                    {!this.props.is_greenlight_on &&
                        <MaterialIcon icon="favorite" fontSize="40px" color="darkgrey" />
                    }
                </span>
                그린라이트 OFF 버튼 
            </div>

        )
    };

};

export default CounterPlayer;