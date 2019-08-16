/* eslint-disable */
import React, { Component } from 'react';
import '../css/Body.css';
import '../App.css';
import { Container, Row, Col } from 'reactstrap';
import MaterialIcon from 'material-icons-react';
import { Link, Redirect } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Footer from "./Footer";
import Player from "./Player";
import Loading from "./Loading";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as joinActions from '../modules/join';
import * as currentMeetingActions from '../modules/current_meeting';
import * as currentMatchingActions from "../modules/current_matching";
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
        const { CurrentMeetingActions, CurrentMatchingActions, JoinActions, is_joined_already } = this.props;
        CurrentMeetingActions.getCurrentMeeting();
        CurrentMatchingActions.getCurrentMatching();    
        if (!is_joined_already){
            JoinActions.getJoinedUser();
        } else {
            this.setState({
                loading: false
            });
        }
        this.startTimer();

    }

    componentWillReceiveProps = nextProps => {
        if (nextProps.is_joined_already) {
            this.setState({
                loading: false
            });
        }

    };

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

    startTimer() {
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

    getInputDayLabel = (meetingTime) => {
        const week = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
        const today = new Date(meetingTime).getDay();
        const todayLabel = week[today];
        return todayLabel;
    }

    render() {
        const { is_login_already, current_meeting, current_matching } = this.props;
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

{/*PC와 모바일 공통*/}
                <div className="flex-center">
                    <Container>
                        <Row className={"App"}>
                            <Col xs={12}>
                                <div className={"font-big font-white mt-4"}>
                                    {meetingWeek} {meetingDay} {current_meeting.location}
                                    <br/>
                                    {this.state.time}초 남음 {/* TODO: 예시로 넣어둔 것으로, 추후 수정 필요 */}
                                    <br/>
                                    {current_matching.trial_time}번째 셔플 결과입니다.
                                </div>
                            </Col>
                            <Col xs={12}>
                                <div className={"bg-white"}>
                                    <div className={"bg-white"}>
                                        {this.state.loading ? <Loading/> 
                                        :
                                        <Player
                                        current_matching = {current_matching}
                                        />
                                        }  
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
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
    CurrentMatchingActions : bindActionCreators(currentMatchingActions, dispatch),
});

const mapStateToProps = (state) => ({
    is_joined_popup_on: state.join.get('is_joined_popup_on'),
    is_joined_already: state.join.get('is_joined_already'),
    is_login_already: state.my_profile.get('is_login_already'),
    is_current_matching: state.current_matching.get('is_current_matching'),
    current_matching: state.current_matching.get('current_matching'),
    joined_user: state.join.get('joined_user'),
    current_meeting: state.current_meeting.get('current_meeting'),

})

export default connect(mapStateToProps, mapDispatchToProps)(Main);