/* eslint-disable */
import React, { Component } from 'react';
import '../css/Initpage.scss';
import '../App.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import MeetingInfo from './details/MeetingInfo';
import MakeTeamButton from './details/MakeTeamButton';
import JoinButton from './details/JoinButton';
import JoinedPopup from './details/JoinedPopup';
import ToolTipUp from './details/ToolTipUp';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as joinActions from './../modules/join';
import * as myProfileActions from './../modules/my_profile';

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
        const { MyProfileActions } = this.props;
        MyProfileActions.getMyProfile();
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

    getInputDayLabel = (time) => {
        const week = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
        const today = new Date(time).getDay();
        const todayLabel = week[today];
        return todayLabel;
    }
    render() {
        const { my_profile, is_joined_popup_on, joined_user, JoinActions, is_joined_already, current_meeting, is_login_already } = this.props;

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

        let authButton = null;
        if (is_login_already) {
            authButton = 
                <div className="mt-18">
                    {/* <div className="App font-05 hover" onClick={this.kakaoLogout()}>로그아웃</div> */}
                    <Link to="/profile" className="font-grey font-bold font-16 w100percent" style={{ textDecoration: 'none' }}>개인정보수정</Link>
                </div>;
        } else {
            authButton = <div className="App"><a id="kakao-login-btn"></a></div>;
        }

        const lastShuffledAt = new Date(my_profile.last_matching_time); //나중에 하위 필드 추가되면 수정필요
        const lastTeamModifiedAt = new Date(my_profile.last_intro_modified_at);
        let isMadeTeam = null;
        if (lastShuffledAt < lastTeamModifiedAt) {
            isMadeTeam = true;
        } else {
            isMadeTeam = false;
        }
        let makeTeamButton = null;
        if (is_login_already) {
            makeTeamButton = <MakeTeamButton
                            isMadeTeam = { isMadeTeam }
                            />;
        } 

        return (
            <div className="frame bg-init-color">
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
                <div className="container-shadow mh-auto">
                    <MeetingInfo
                        makeTeamButton = { makeTeamButton }
                        isMadeTeam = { isMadeTeam }
                        current_meeting = { current_meeting }
                    />
                </div>
                <div className="fix-bottom w100percent mb-36">
                    <JoinButton 
                        is_login_already = {is_login_already} />
                    { authButton }
                </div>
            </div>
        );
    }
    
}


const mapDispatchToProps = (dispatch) => ({
    dispatch,
    JoinActions: bindActionCreators(joinActions, dispatch),
    MyProfileActions: bindActionCreators(myProfileActions, dispatch),
});

const mapStateToProps = (state) => ({
    is_joined_popup_on: state.join.get('is_joined_popup_on'),
    joined_user: state.join.get('joined_user'),
    is_login_already: state.my_profile.get('is_login_already'),
    current_meeting: state.current_meeting.get('current_meeting'),
})

export default connect(mapStateToProps, mapDispatchToProps)(Initpage);