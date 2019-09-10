/* eslint-disable */
import React, { Component } from 'react';
import '../css/Main.scss';
import '../App.css';
import MaterialIcon from 'material-icons-react';
import { Link, Redirect } from 'react-router-dom';
import Footer from "./../outdated/Footer";
import Player from "../outdated/Player";
import Header from "./details/Header";
import CounterPlayer from "./details/CounterPlayer";
import ControlTool from "./details/ControlTool";
import ToolTipDown from "./details/ToolTipDown";
import Loading from "./details/Loading";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as joinActions from '../modules/join';
import * as currentMeetingActions from '../modules/current_meeting';
import * as currentMatchingActions from "../modules/current_matching";
import * as playerActions from '../modules/player';
import * as myProfileActions from '../modules/my_profile';

class Main extends Component {
    getInputDayLabel = (time) => {
        const week = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
        const today = new Date(time).getDay();
        const todayLabel = week[today];
        return todayLabel;
    }

    render() {
        const {user, is_gift_popup, my_profile, JoinActions, is_joined_popup_on, is_joined_already, is_login_already, joined_user, current_meeting, is_current_matching, current_matching, PlayerActions, CurrentMatchingActions, counter_profile, is_counter_profile,  } = this.props;

        const nowTime = new Date();
        const meetingTime = new Date(current_meeting.meeting_time);
        const meetingDay = this.getInputDayLabel(current_meeting.meeting_time);

        let meetingWeek = null;
        if (nowTime.getDay() < meetingTime.getDay() && meetingTime.getTime() - nowTime.getTime() <= 561600000) {
            meetingWeek = "이번주"
        } else if (nowTime.getDay() < meetingTime.getDay() && meetingTime.getTime() - nowTime.getTime() > 561600000) {
            meetingWeek = "다음주"
        } else if (nowTime.getDay() > meetingTime.getDay() && meetingTime.getTime() - nowTime.getTime() <= 561600000) {
            meetingWeek = "다음주"
        } else if (nowTime.getDay() > meetingTime.getDay() && meetingTime.getTime() - nowTime.getTime() > 561600000) {
            meetingWeek = "다다음주"
        } else if (nowTime.getDay() === meetingTime.getDay() && meetingTime.getTime() - nowTime.getTime() <= 561600000) {
            meetingWeek = "이번주"
        } else if (nowTime.getDay() === meetingTime.getDay() && meetingTime.getTime() - nowTime.getTime() > 561600000) {
            meetingWeek = "다음주"
        } else {
            meetingWeek = ""
        }

        const content =
            <div className="inline-flex">
                이번주 금요일 in 강남
                <div className="ml-1 font-lightgrey font-13">남은 셔플 2회</div>
            </div>;

        return (
                <div className="main-container">
                    <Header
                        content={content}
                    />
                    <div className="profile">  
                        <CounterPlayer
                            my_profile={my_profile}
                            PlayerActions={PlayerActions}
                            counter_profile={counter_profile}
                            is_counter_profile={is_counter_profile}
                        />  
                    </div>
                    <ControlTool 
                        time={6000} 
                        my_profile={my_profile}
                        PlayerActions={PlayerActions}
                        CurrentMatchingActions={CurrentMatchingActions}
                        counter_profile={counter_profile}
                        is_counter_profile={is_counter_profile}
                        is_gift_popup={is_gift_popup}
                        current_matching={current_matching}
                        current_meeting={current_meeting}
                    /> 
                    <br/>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    JoinActions: bindActionCreators(joinActions, dispatch),
    CurrentMeetingActions: bindActionCreators(currentMeetingActions, dispatch),
    CurrentMatchingActions : bindActionCreators(currentMatchingActions, dispatch),
    PlayerActions: bindActionCreators(playerActions, dispatch),
    MyProfileActions: bindActionCreators(myProfileActions, dispatch),
});

const mapStateToProps = (state) => ({
    is_joined_popup_on: state.join.get('is_joined_popup_on'),
    is_joined_already: state.join.get('is_joined_already'),
    is_login_already: state.my_profile.get('is_login_already'),
    joined_user: state.join.get('joined_user'),
    current_meeting: state.current_meeting.get('current_meeting'),
    current_matching: state.current_matching.get('current_matching'),
    counter_profile: state.player.get('counter_profile'),
    is_counter_profile: state.player.get('is_counter_profile'),
    is_gift_popup: state.player.get('is_gift_popup'),
    is_current_matching: state.current_matching.get('is_current_matching'),
})

export default connect(mapStateToProps, mapDispatchToProps)(Main);