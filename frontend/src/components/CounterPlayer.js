import React, { Component } from "react";
import "../css/info_styles.scss";
import * as playerActions from '../modules/player';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import Ionicon from "react-ionicons";


class CounterPlayer extends Component {

    constructor(props) {
        super(props);

    }
    

    render() {
        const { counter_propfile, is_greenlight_on, is_greenlight_off } = this.props;
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

            </div>

        )
    };

};

export default CounterPlayer;