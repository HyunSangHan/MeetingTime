/* eslint-disable */
import React, { Component } from 'react';
import './App.css';
import Main from "./components/Main"
import Profile from "./components/details/Profile";
import Initpage from "./components/Initpage";
import Result from "./components/details/Result";
import Email from "./components/Email";
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as myProfileActions from './modules/my_profile';
import * as currentMeetingActions from './modules/current_meeting';
import axios from 'axios';
import { Link } from 'react-router-dom';

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

class App extends Component {

    constructor(props){
        super(props);

        this.state = {
            
            user: {//삭제 요망
                nickname: "data_닉네임",
                company: "data_회사명",
                img_url: "/images/exampleProfile.jpeg",
                recommendation_code: "data_코드",
                current_heart: "data_하트개수",
                chat: "data_대화방개수",
                rank: "data_순번",
                location: "data_선호지역",
                phone_number: "data_대표연락처",
                team_detail: "data_팀소개문구_blah blah~ 이건 테스트입니다. 우리 팀은 평범하지 않습니다. 테스트입니다. 테스트입니다. blah blah blah blah 테스트다 블라 blah"
                //나중에 유저의 모델 내 필드 개수와 맞춰야 할 것임
            },
            ex_user: {//삭제 요망
                nickname: "data_상대닉네임",
                company: "data_상대회사명",
                img_url: "/images/counterProfile.jpeg",
                team_detail: "data_상대팀소개문구_동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한사람 대한으로 길이 보전하세",
            },
        }
    }

    componentDidMount () {
        const { MyProfileActions, CurrentMeetingActions } = this.props;
        MyProfileActions.getMyProfile();
        CurrentMeetingActions.getCurrentMeeting();

        // //원본
        // console.log(new Date()) 
        // console.log("2019-09-09T08:25:39+09:00")

        // //스트링용
        // console.log(Date(new Date().toLocaleString()))
        // console.log(new Date("2019-09-09T08:25:39+09:00"))

        // //요일뽑기
        // console.log(this.getInputDayLabel(Date(new Date().toLocaleString())))
        // console.log(this.getInputDayLabel("2019-09-09T08:25:39+09:00"))

        // //부등호 비교용
        // console.log(new Date().getTime()) 
        // console.log(Date.parse("2019-09-09T08:25:39+09:00"))

    }

    render() {
        const { is_login_already, current_meeting, my_profile } = this.props;
        console.log(my_profile)

        return (
            <BrowserRouter>
                <div className="frame">

                    <Route exact path="/"
                        render={(props) => (
                            <Initpage
                                {...props}
                                is_login_already={is_login_already}
                            />
                        )}
                    />

                    <Route path="/matching"
                        render={(props) => (
                            <Main
                                {...props}
                                my_profile={my_profile}
                                user={this.state.user} //삭제 요망
                                ex_user={this.state.ex_user} //삭제 요망
                            />
                        )}
                    />

                    <Route exact path="/email"
                        render={(props) => (
                            <Email
                                {...props}
                                is_login_already={is_login_already}
                            />
                        )}
                    />


                    <Route path="/profile"
                        render={(props) => (
                            <Profile
                                {...props}
                                user={this.state.user}
                            />
                        )} />
                    <Route path="/matching_result"
                        render={(props) => (
                            <Result
                                {...props}
                                ex_user={this.state.ex_user}
                            />
                        )} />
                    {/*<Redirect from="/" to="/init" />*/}

                </div>
            </BrowserRouter>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    MyProfileActions: bindActionCreators(myProfileActions, dispatch),
    CurrentMeetingActions: bindActionCreators(currentMeetingActions, dispatch),
});

const mapStateToProps = (state) => ({
    is_login_already: state.my_profile.get('is_login_already'),
    my_profile: state.my_profile.get('my_profile'),
    current_meeting: state.current_meeting.get('current_meeting'),
})

export default connect(mapStateToProps, mapDispatchToProps)(App);