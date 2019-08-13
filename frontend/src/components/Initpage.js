import React, { Component } from 'react';
import '../css/Body.css';
import '../App.css';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input} from 'reactstrap';
import { Link } from 'react-router-dom';
import Footer from "./Footer";
import axios from 'axios';
import JoinButton from './details/JoinButton';
import JoinedPopup from './popups/JoinedPopup';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as joinActions from './../modules/join';

class Initpage extends Component {


    constructor(props){
        super(props);
    }

    componentDidMount(){


        try {
            window.Kakao.init(process.env.REACT_APP_KAKAO_JAVSCRIPT_SDK_KEY);    
            // 카카오 로그인 버튼을 생성
            window.Kakao.Auth.createLoginButton({
                container: '#kakao-login-btn',
                success: function(authObj) {
                    // 로그인 성공시, 장고의 KAKAO Login API를 호출함
                    axios.post("/rest-auth/kakao/", {
                        access_token: authObj.access_token,
                        code: process.env.REACT_APP_KAKAO_REST_API_KEY
                    })
                    .then( response => {
                        axios.get("/profile")
                        .then(response => {
                            console.log("[로그인성공] " + response.data.user.username + "(회사:" + response.data.company.name + ")")
                            window.location.reload();
                        })
                        .catch(err => console.log(err));
                    })
                    .catch( err => {
                        console.log(err);
                    });

                },
                fail: function(err) {
                    alert(JSON.stringify(err));
                    console.log(err);
                }
            });        
        } catch (error) {
            console.log(error);
        }
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

    getInputDayLabel = (meetingTime) => {
        const week = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
        const today = new Date(meetingTime).getDay();
        const todayLabel = week[today];
        return todayLabel;
    }

    render() {
        const { is_joined_popup_on, joined_user, JoinActions, is_joined_already, current_meeting } = this.props;

        const meetingTime = new Date(current_meeting.meeting_time);
        const nowTime = new Date();
        const meetingTimeNum = Date.parse(current_meeting.meeting_time);
        const nowTimeNum = new Date().getTime()
        const meetingDay = this.getInputDayLabel(current_meeting.meeting_time);

        let meetingWeek = null;
        if (nowTime.getDay() < meetingTime.getDay() && meetingTimeNum - nowTimeNum <= 561600000) {
            meetingWeek = "이번"
        } else if (nowTime.getDay() < meetingTime.getDay() && meetingTimeNum - nowTimeNum > 561600000) {
            meetingWeek = "다음"
        } else if (nowTime.getDay() > meetingTime.getDay() && meetingTimeNum - nowTimeNum <= 561600000) {
            meetingWeek = "다음"
        } else if (nowTime.getDay() > meetingTime.getDay() && meetingTimeNum - nowTimeNum > 561600000) {
            meetingWeek = "다다음"
        } else if (nowTime.getDay() === meetingTime.getDay() && meetingTimeNum - nowTimeNum <= 561600000) {
            meetingWeek = "이번"
        } else if (nowTime.getDay() === meetingTime.getDay() && meetingTimeNum - nowTimeNum > 561600000) {
            meetingWeek = "다음"
        } else {
            meetingWeek = ""
        }

        let authButton = null;
        if (this.props.is_login_already) {
            authButton = <div className="App font-05 hover" onClick={this.kakaoLogout()}>로그아웃</div>;
        } else {
            authButton = <div className="App"><a id="kakao-login-btn"></a></div>;
        }

        return (
            <div>
                {/*팝업*/}
                {is_joined_popup_on &&
                    <div className={"App"}>
                        <div className={"flex-center"}>
                            <div className={"fix minus-height z-4"}>
                                <JoinedPopup
                                    rank={joined_user.rank}
                                    deletePopup={JoinActions.deletePopup}
                                    is_joined_already={is_joined_already}
                                />
                            </div>
                        </div>
                        <div className={"frame-dark fix z-3"}/>
                    </div>
                }

            <div className={"frame flex-center bg-main-color"}>
                <Container className={"font-white"}>
                    <Row>
                        <Col>
                            <div className="App font-big"><b>{meetingWeek} {meetingDay} {current_meeting.location}</b></div>
                            <div className="flex-center mb-3">
                                <JoinButton 
                                    is_login_already={this.props.is_login_already}
                                />
                            </div>
                            { authButton }
                        </Col>
                    </Row>
                </Container>
                <Footer/>
            </div>

            </div>
        );
    }
}


const mapDispatchToProps = (dispatch) => ({
    dispatch,
    JoinActions: bindActionCreators(joinActions, dispatch),
});

const mapStateToProps = (state) => ({
    is_joined_popup_on: state.join.get('is_joined_popup_on'),
    joined_user: state.join.get('joined_user'),
    current_meeting: state.current_meeting.get('current_meeting'),
})

export default connect(mapStateToProps, mapDispatchToProps)(Initpage);