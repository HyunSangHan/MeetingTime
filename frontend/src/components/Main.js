/* eslint-disable */
import React, { Component } from 'react';
import '../css/Body.css';
import '../App.css';
import { Container, Row, Col } from 'reactstrap';
import MaterialIcon from 'material-icons-react';
import { Link, Redirect } from 'react-router-dom';
import Footer from "./Footer";
import Player from "./Player";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as joinActions from '../modules/join';
import * as currentMeetingActions from '../modules/current_meeting';
import * as matchingActions from '../modules/matching';
import * as playerActions from '../modules/player';
import * as myProfileActions from '../modules/my_profile';
import axios from 'axios';


class Main extends Component {
    constructor(props){
        super(props);

        this.state = {
            time: 179,
        }
        this.startTimer = this.startTimer.bind(this);

    }

    componentDidMount() {
        const { JoinActions, MatchingActions, PlayerActions } = this.props;
        JoinActions.getJoinedUser();
        MatchingActions.getCurrentMatching();
        PlayerActions.getCounterProfile();
        this.startTimer();
    }

    kakaoLogout = () => () => {
        console.log(window.Kakao.Auth.getAccessToken());
        window.Kakao.Auth.logout(function(data){
            console.log(data)
        });
        axios.get("/logout")
        .then(response => {
            console.log(response.data)
            console.log("로그아웃 완료")
            window.location.reload();
        })
        .catch(err => console.log(err));
    }

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
        const {user, my_profile, JoinActions, is_joined_popup_on, is_joined_already, is_login_already, joined_user, current_meeting, current_matching, PlayerActions, counter_profile, is_counter_profile, is_greenlight_on } = this.props;

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
            <div className={"App"}>
                {
                    !is_login_already && <Redirect to="/"/>
                }
                <div className="flex-center">
                    <Container>
                        <Row className={"App"}>
                            <Col xs={12}>
                                <div className={"font-big mt-4"}>
                                    <div className="font-05 hover" onClick={this.kakaoLogout()}>로그아웃</div>
                                    {meetingWeek} {meetingDay} {current_meeting.location}
                                </div>
                            </Col>
                            <Col xs={12}>
                                <div className={"font-1 mt-3 opacity05"}>
                                    {/* TODO: 카운트다운 들어갈 곳 */}

                                    {/* TODO: current_matching 모듈 생기면, 셔플회차 들어갈 곳 */}
                                    {current_matching.trial_time}번째 셔플 결과입니다.
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div className="App">
                    {/*<div className={"hover z-5"} onClick={this.props.testFunc}>이것은 테스트~~~!!여기를 클릭</div>*/}

                    <div className={"profile"}>
                        <div className={"App"}>
                            <Container>    
                                <Row className={"align-center deco-none"}>
                                    <Player
                                        my_profile={my_profile}
                                        current_matching={current_matching}
                                        PlayerActions={PlayerActions}
                                        counter_profile={counter_profile}
                                        is_counter_profile={is_counter_profile}
                                        is_greenlight_on={is_greenlight_on}
                                        />  
                                    <Col xs={2} md={3} className={"flex-center"}>
                                        <div>
                                            <MaterialIcon icon="arrow_forward_ios" size="23px" color="#f0f0f0"/>
                                        </div>
                                    </Col>
                                </Row>
                                
                            </Container>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    JoinActions: bindActionCreators(joinActions, dispatch),
    CurrentMeetingActions: bindActionCreators(currentMeetingActions, dispatch),
    MatchingActions: bindActionCreators(matchingActions, dispatch),
    PlayerActions: bindActionCreators(playerActions, dispatch),
    MyProfileActions: bindActionCreators(myProfileActions, dispatch),
});

const mapStateToProps = (state) => ({
    is_joined_popup_on: state.join.get('is_joined_popup_on'),
    is_joined_already: state.join.get('is_joined_already'),
    is_login_already: state.my_profile.get('is_login_already'),
    is_login_already: state.my_profile.get('is_login_already'),
    joined_user: state.join.get('joined_user'),
    current_meeting: state.current_meeting.get('current_meeting'),
    current_matching: state.matching.get('current_matching'),
    counter_profile: state.player.get('counter_profile'),
    is_greenlight_on: state.player.get('is_greenlight_on'),
    is_counter_profile: state.player.get('is_counter_profile'),

})

export default connect(mapStateToProps, mapDispatchToProps)(Main);