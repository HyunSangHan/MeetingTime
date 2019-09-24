import React, { Component } from "react";
import '../../css/Main.scss'; //부모컴포넌트의CSS(SCSS)
import '../../App.css'; //공통CSS
import ToolTipDown from './ToolTipDown';

class CounterPlayer extends Component {
    render() {
        const { counter_profile } = this.props;  
        return (
            <div className="total-container top-m">
                <ToolTipDown content={ "테스트" }/>
                <div className="counter-container">
                    <div className="team-info">
                        <div className="team-name font-notosan">
                            {counter_profile.team_name}
                        </div>
                        <div className="age-range font-notosan">
                            {counter_profile.age_range}대 · 
                        </div>
                        <div className="company font-notosan">
                            {counter_profile.company.name}
                        </div>
                    </div>
                    <div className="team-intro font-notosan">
                        {counter_profile.team_introduce}
                    </div>
                    <div className="margin-wrap" />
                </div>
                <div className="images-wrapper">
                    <div className="images">
                        <div className="each-image flex-center" >
                            <img className="user-image" src={counter_profile.image || require("./../../images/noPhoto.jpg")} />
                        </div>
                        <div className="each-image flex-center" >
                            <img className="user-image" src={counter_profile.image_two || require("./../../images/noPhoto.jpg")} />
                        </div>
                        <div className="each-image flex-center" >
                            <img className="user-image" src={counter_profile.image_three || require("./../../images/noPhoto.jpg")} />
                        </div>
                        <div className="last-child-gap"/>
                    </div>
                </div>
            </div>
        )
    };
};


export default CounterPlayer;