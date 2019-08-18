/* eslint-disable */
import React, { Component } from 'react';
import '../css/Main.scss';
import '../App.css';
import { Container, Row, Col } from 'reactstrap';
import MaterialIcon from 'material-icons-react';
import { Link, Redirect } from 'react-router-dom';
import Footer from "./../outdated/Footer";
import Player from "../outdated/Player";
import Header from "./details/Header";
import HeaderMain from './details/HeaderMain';

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
import axios from 'axios';

class Main extends Component {
    constructor(props){
        super(props);

        this.state = {
            time: 15,
            loading: true
        }
        this.startTimer = this.startTimer.bind(this);

    }

    componentDidMount() {
        const { CurrentMeetingActions, CurrentMatchingActions, PlayerActions, JoinActions, is_joined_already, is_login_already } = this.props;
        CurrentMeetingActions.getCurrentMeeting();
        CurrentMatchingActions.getCurrentMatching();
        PlayerActions.getCounterProfile();  
        if (!is_joined_already){
            JoinActions.getJoinedUser();
        } else {
            this.setState({
                loading: false
            });
        }
        this.startTimer();

        {
            !is_login_already && <Redirect to="/"/>
        }
    }

    componentWillReceiveProps = nextProps => {
        if (nextProps.is_joined_already) {
            this.setState({
                loading: false
            });
        }
    };

    startTimer() { //일단 넣어둔 함수TODO: 커스터마이징해야됨
        // const { history } = this.props; //시간 관련해서 받아올 곳
        this.setState(prevState => ({
            time: prevState.time,
        }));
        this.timer = setInterval(() => this.setState(prevState => ({
            ...prevState,
            time: prevState.time - 1
        })), 1000);
        this.ifTimer = setInterval(() => {
            const { time } = this.state;
            if (time <= 0) {
                window.location.reload(); //리프레시
                clearInterval(this.timer, this.ifTimer);
            }
        }, 1000);
    }

    getInputDayLabel = (time) => {
        const week = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
        const today = new Date(time).getDay();
        const todayLabel = week[today];
        return todayLabel;
    }

    render() {
        const {user, my_profile, JoinActions, is_joined_popup_on, is_joined_already, is_login_already, joined_user, current_meeting, is_current_matching, current_matching, PlayerActions, counter_profile, is_counter_profile,  } = this.props;

        const nowTime = new Date();
        const meetingTime = new Date(current_meeting.meeting_time);
        const meetingDay = this.getInputDayLabel(current_meeting.meeting_time);

        let meetingWeek = null;
        if (nowTime.getDay() < meetingTime.getDay() && meetingTime.getTime() - nowTime.getTime() <= 561600000) {
            meetingWeek = "이번"
        } else if (nowTime.getDay() < meetingTime.getDay() && meetingTime.getTime() - nowTime.getTime() > 561600000) {
            meetingWeek = "다음"
        } else if (nowTime.getDay() > meetingTime.getDay() && meetingTime.getTime() - nowTime.getTime() <= 561600000) {
            meetingWeek = "다음"
        } else if (nowTime.getDay() > meetingTime.getDay() && meetingTime.getTime() - nowTime.getTime() > 561600000) {
            meetingWeek = "다다음"
        } else if (nowTime.getDay() === meetingTime.getDay() && meetingTime.getTime() - nowTime.getTime() <= 561600000) {
            meetingWeek = "이번"
        } else if (nowTime.getDay() === meetingTime.getDay() && meetingTime.getTime() - nowTime.getTime() > 561600000) {
            meetingWeek = "다음"
        } else {
            meetingWeek = ""
        }

        return (
                <div className="main-container">
                    <HeaderMain/>
                    <div className="profile">  
                        {this.state.loading
                        ?
                        <Loading/> 
                        :
                        <CounterPlayer
                            my_profile={my_profile}
                            PlayerActions={PlayerActions}
                            counter_profile={counter_profile}
                            is_counter_profile={is_counter_profile}
                        />  
                        }  
                </div>
                
                <div className="control-container">
                    <ControlTool 
                        time={this.state.time} 
                        my_profile={my_profile}
                        PlayerActions={PlayerActions}
                        counter_profile={counter_profile}
                        is_counter_profile={is_counter_profile}
                    /> 
                    <br/>
                </div>
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
    is_current_matching: state.current_matching.get('is_current_matching'),
})

export default connect(mapStateToProps, mapDispatchToProps)(Main);