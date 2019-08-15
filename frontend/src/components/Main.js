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
            time: 179,
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

    getInputDayLabel = (meetingTime) => {
        const week = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
        const today = new Date(meetingTime).getDay();
        const todayLabel = week[today];
        return todayLabel;
    }

    render() {
        const { is_login_already, current_meeting, current_matching } = this.props;
        console.log(current_matching);
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
            <div className={"frame"}>
                {
                    !is_login_already && <Redirect to="/"/>
                }

{/*PC와 모바일 공통*/}
                <div className="up-bg flex-center frame-half">
                    <div className={"up-bg-color fix"}/>
                    <Container>
                        <Row className={"App"}>
                            <Col xs={12}>
                                <div className={"font-big font-white mt-4"}>
                                    <div className="font-05 hover" onClick={this.kakaoLogout()}>로그아웃</div>
                                    {meetingWeek} {meetingDay} {current_meeting.location}
                                </div>
                            </Col>
                            <Col xs={12}>
                                <div className={"font-1 font-white mt-3 opacity05"}>
                                    {/* TODO: 카운트다운 들어갈 곳 */}

                                    {current_matching.trial_time + "번째 매칭입니다."}
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div className="down-bg frame-half bg-white absolute z-2">
{/*모바일 전용*/}
                    {/*<div className={"hover z-5"} onClick={this.props.testFunc}>이것은 테스트~~~!!여기를 클릭</div>*/}

                    <div className={"profile bg-white pc-none"}>
                        <div className={"pc-max-width bg-white z-2"}>
                            {this.state.loading ? <Loading/> 
                            :
                            <Player  />
                            }  
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