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
                <img src={joined_user.profile.image || require("../images/noPhoto.jpg")}
                    alt={joined_user.profile.user.username} 
                    className="main-profile"
                />
                <div className="information">
                    <div>이름 : {joined_user.profile.user.username}</div>
                    <div>성별 : {joined_user.profile.is_male ? "남" : "여"</div>
                    <div>연령대 : {joined_user.profile.age_range + "대"}</div>
                    <div>회사명 : {joined_user.profile.company.name}</div>
                    <div>팀소개 : {joined_user.profile.team_introduce}</div>
                    <div>최종 로그인 시간 : {joined_user.last_login_at}</div>
                </div>

                <Link to="/profile">
                    프로필 수정하기
                </Link>
            </div>
        )
    }

};

export default MyPlayer;