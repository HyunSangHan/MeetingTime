import React, { Component } from "react";
import "../css/info_styles.scss";
import MaterialIcon from 'material-icons-react';


class CounterPlayer extends Component {

    constructor(props) {
        super(props);

    }
    
    render() {
        
        console.log(this.props);
        return (
            <div>
                <img src={this.props.counter_profile.image || require("../images/noPhoto.jpg")} 
                     alt={this.props.counter_profile.user.username}/>
                <div className="information">
                    <div>이름 : {this.props.counter_profile.user.username}</div>
                    <div>연령대 : {this.props.counter_profile.age_range}</div>
                    <div>회사명 : {this.props.counter_profile.company.name}</div>
                    <div>팀소개 : {this.props.counter_profile.team_introduce}</div>
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