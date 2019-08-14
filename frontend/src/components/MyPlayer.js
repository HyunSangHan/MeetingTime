import React, { Component } from "react";
import "../css/info_styles.scss";
import { Link } from 'react-router-dom';


class MyPlayer extends Component {

    constructor(props) {
        super(props);
    }

    render(){
        const { joined_user } = this.props;
        console.log(joined_user);
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
                            <li className="list-item">연령대 : {joined_user.profile.age_range + "대"}</li>
                            <li className="list-item">회사명 : {joined_user.profile.company.name}</li>
                            <li className="list-item">팀소개 : {joined_user.profile.team_introduce}</li>
                            <li className="list-item">최종 로그인 시간 : {joined_user.profile.last_login_at}</li>
                        </ul>
                    </div>
                    <Link to="/profile">
                        프로필 수정하기
                    </Link>
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