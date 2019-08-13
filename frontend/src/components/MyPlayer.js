import React, { Component } from "react";
import "../css/info_styles.scss";
import { Link } from 'react-router-dom';


class MyPlayer extends Component {

    constructor(props) {
        super(props);

    }

    render(){
        const { joined_user, my_profile } = this.props;
        return ( 
            <div className="container">
                <img src={this.props.my_profile.image || require("../images/noPhoto.jpg")}
                    alt={this.props.my_profile.user.username} />
                <div className="information">
                    <div>이름 : {this.props.my_profile.user.username}</div>
                    <div>연령대 : {this.props.my_profile.age_range}</div>
                    <div>회사명 : {this.props.my_profile.company.name}</div>
                    <div>팀소개 : {this.props.my_profile.team_introduce}</div>
                </div>

                <Link to="/profile">
                    프로필 수정하기
                </Link>
            </div>
        )
    }

};

export default MyPlayer;