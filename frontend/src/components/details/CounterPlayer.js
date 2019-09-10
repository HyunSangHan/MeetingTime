import React, { Component } from "react";
import '../../css/Main.scss'; //부모컴포넌트의CSS(SCSS)
import '../../App.css'; //공통CSS

class CounterPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            counter_profile: {
                age_range: "20",
                company: {
                    name: "네이버"
                },
                created_at: null,
                id: 2,
                image: require("./../../images/1kdk.jpg"),
                image_two: require("./../../images/2jjh.gif"),
                image_three: require("./../../images/3lkb.jpg"),
                is_male: true,
                last_intro_modified_at: null,
                last_login_at: null,
                team_name: "술살라빔",
                team_introduce: "입사한 지 1년 정도 된 네이버 개발자 3명입니다 :D 한명은 비주얼담당, 한명은 개그담당, 한명은 술담당으로 네이버 드림팀이예요 그린라이트 눌러주세요!",
                user: {
                    username: "한현상"
                }
            },
        }
    }

    render() {
        const { counter_profile } = this.state;  
        return (
            <div className="total-container top-m">
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
                            <img className="user-image" src={counter_profile.image || require("./../../images/noPhoto.jpg")} alt="" />
                        </div>
                        <div className="each-image flex-center" >
                            <img className="user-image" src={counter_profile.image_two || require("./../../images/noPhoto.jpg")} alt="" />
                        </div>
                        <div className="each-image flex-center" >
                            <img className="user-image" src={counter_profile.image_three || require("./../../images/noPhoto.jpg")} alt="" />
                        </div>
                        <div className="last-child-gap"/>
                    </div>
                </div>
            </div>
        )
    };
};


export default CounterPlayer;