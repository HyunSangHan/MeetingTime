import React, { Component } from "react";
import '../../css/Main.scss'; //부모컴포넌트의CSS(SCSS)
import '../../App.css'; //공통CSS


class CounterPlayer extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };  

    }

    componentDidMount() {

    }

    
    
    render() {
        const { counter_profile } = this.props;  

        
        return (
            <div className="counter-container">
                    <div className="team-info">
                        <div className="team-name">
                            {counter_profile.team_name}
                        </div>
                        <div className="age-range">
                            {counter_profile.age_range}
                        </div>
                        <div className="company">
                            {counter_profile.company.name}
                        </div>
                    </div>
                    <div className="team-intro font-notosan">
                        <p>{counter_profile.team_introduce}</p>
                    </div>
                    <div className="images">
                        <img src={counter_profile.image || require("./../../images/noPhoto.jpg")} />
                        <img src={counter_profile.image_two || require("./../../images/noPhoto.jpg")} />
                        <img src={counter_profile.image_three || require("./../../images/noPhoto.jpg")} />
                    </div>

                        {/* <ul className="info-list">
                            <li className="list-item">이름 : {counter_profile.user.username}</li>
                            <li className="list-item">성별 : {counter_profile.is_male ? "남" : "여"}</li>
                            <li className="list-item">연령대 : {counter_profile.age_range ? counter_profile.age_range + "대" : "몰라요"}</li>
                            <li className="list-item">회사명 : {counter_profile.company.name}</li>
                            <li className="list-item">팀소개 : {counter_profile.team_introduce}</li>
                        </ul> */}
                   
            </div>
        )
    };
};


export default CounterPlayer;