import React, { Component } from "react";
import "../css/info_styles.scss";
import { Link } from 'react-router-dom';


class MyPlayer extends Component {

    constructor(props) {
        super(props);
    }

    render(){
        const { joined_user } = this.props;
        return ( 
            <div className="container">
                <span>
                    <div className="column">
                        <img src={joined_user.profile.image || require("../images/noPhoto.jpg")}
                            alt={joined_user.profile.user.username} 
                            className="main-profile"
                        />
                        <ul className="info-list">
                            <li className="list-item">이름 : {joined_user.profile.user.username}</li>
                            <li className="list-item">성별 : {joined_user.profile.is_male ? "남" : "여"}</li>
                            <li className="list-item">연령대 : {joined_user.profile.age_range ? joined_user.profile.age_range + "대" : "몰라요"}</li>
                            <li className="list-item">회사명 : {joined_user.profile.company.name}</li>
                            <li className="list-item">팀소개 : {joined_user.profile.team_introduce}</li>
                        </ul>
                    </div>
                    <br/>
                    <Link to="/profile" className="update">
                        프로필 수정하기
                    </Link>
                    <h3 className="update-time">{!joined_user.profile.natural_time === null ? " 최종 수정 : " + joined_user.profile.natural_time : "null"}</h3>
                </span>
                <span>
                    <div className="column">
                   
                    </div>
                </span> 
            </div>
        )
    }

};

export default MyPlayer;