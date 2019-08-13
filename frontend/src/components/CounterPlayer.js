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
                {this.props.counter_profile.age_range}
                {this.props.counter_profile.company.name}
                {this.props.counter_profile.image_url}
                <h2>상대방 프로필 정보 입니다.</h2>

            </div>

        )
    };

};

export default CounterPlayer;