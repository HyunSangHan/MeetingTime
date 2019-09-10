/* eslint-disable */
import React, { Component } from 'react';
import './App.css';
import Home from "./components/Home"
import Main from "./components/Main"
import Profile from "./components/Profile";
import TeamProfile from "./components/TeamProfile";
import Initpage from "./components/Initpage";
import Waiting from "./components/Waiting";
import { BrowserRouter, Route } from 'react-router-dom';
import axios from 'axios';

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

class App extends Component {

    constructor(props){
        super(props);

        this.state = {
            my_profile: {
                age_range: "20",
                company: {
                    name: "네이버"
                },
                created_at: "2019-08-24T11:02:53+09:00",
                id: 1,
                image: require('./images/1oyj.jpg'),
                image_two: require('./images/2sde.png'),
                image_three: require('./images/3lhj.jpg'),
                is_male: false,
                last_intro_modified_at: "2019-08-24T11:02:53+09:00",
                last_login_at: "2019-08-24T11:02:53+09:00",
                team_name: "세얼간이",
                team_introduce: "테스트 소개 문구입니다.",
                user: {
                    username: "한현상"
                }
            },
            current_meeting : {
                id: 1,
                open_time: "2019-08-24T11:02:53+09:00",
                prev_meeting_last_shuffle_time: "2019-08-05T21:59:20+09:00",
                close_time: "2019-08-24T12:00:00+09:00",
                first_shuffle_time: "2019-08-24T12:35:12+09:00",
                second_shuffle_time: "2019-09-07T20:41:12+09:00",
                third_shuffle_time: "2019-09-09T19:22:27+09:00",
                meeting_time: "2019-09-10T19:21:46+09:00",
                location: "강남",
                cutline: 9,
                description: "자만추 모여라"
            },
            current_meeting_1 : { //오픈전
                id: 1,
                open_time: "2020-09-24T11:02:53+09:00",
                prev_meeting_last_shuffle_time: "2020-08-05T21:59:20+09:00",
                close_time: "2020-09-24T12:00:00+09:00",
                first_shuffle_time: "2020-10-24T12:35:12+09:00",
                second_shuffle_time: "2020-10-07T20:41:12+09:00",
                third_shuffle_time: "2020-10-09T19:22:27+09:00",
                meeting_time: "2020-10-10T19:21:46+09:00",
                location: "강남",
                cutline: 9,
                description: "자만추 모여라"
            },
            current_meeting_2 : { //오픈~마감전
                id: 1,
                open_time: "2019-08-24T11:02:53+09:00",
                prev_meeting_last_shuffle_time: "2020-08-05T21:59:20+09:00",
                close_time: "2020-09-24T12:00:00+09:00",
                first_shuffle_time: "2020-10-24T12:35:12+09:00",
                second_shuffle_time: "2020-10-07T20:41:12+09:00",
                third_shuffle_time: "2020-10-09T19:22:27+09:00",
                meeting_time: "2020-10-10T19:21:46+09:00",
                location: "강남",
                cutline: 9,
                description: "자만추 모여라"
            },
            current_meeting_3 : { //마감후
                id: 1,
                open_time: "2018-09-24T11:02:53+09:00",
                prev_meeting_last_shuffle_time: "2020-08-05T21:59:20+09:00",
                close_time: "2018-09-24T12:00:00+09:00",
                first_shuffle_time: "2020-10-24T12:35:12+09:00",
                second_shuffle_time: "2020-10-07T20:41:12+09:00",
                third_shuffle_time: "2020-10-09T19:22:27+09:00",
                meeting_time: "2020-10-10T19:21:46+09:00",
                location: "강남",
                cutline: 9,
                description: "자만추 모여라"
            },
            joined_user : {
                profile: {
                    age_range: "20",
                    company: {
                        name: "네이버"
                    },
                    created_at: "2019-08-24T11:02:53+09:00",
                    id: 1,
                    image: require('./images/1oyj.jpg'),
                    image_two: require('./images/2sde.png'),
                    image_three: require('./images/3lhj.jpg'),
                    is_male: false,
                    last_intro_modified_at: "2019-08-24T11:02:53+09:00",
                    last_login_at: "2019-08-24T11:02:53+09:00",
                    team_name: "세얼간이",
                    team_introduce: "테스트 소개 문구입니다.",
                    user: {
                        username: "한현상"
                    }
                },
                rank: 7,
                is_matched: false,
                meeting: 1
            },
            joined_user_0 : {
                profile: {
                    age_range: "20",
                    company: {
                        name: "네이버"
                    },
                    created_at: "2019-08-24T11:02:53+09:00",
                    id: 1,
                    image: require('./images/1oyj.jpg'),
                    image_two: require('./images/2sde.png'),
                    image_three: require('./images/3lhj.jpg'),
                    is_male: false,
                    last_intro_modified_at: "2019-08-24T11:02:53+09:00",
                    last_login_at: "2019-08-24T11:02:53+09:00",
                    team_name: "세얼간이",
                    team_introduce: "테스트 소개 문구입니다.",
                    user: {
                        username: "한현상"
                    }
                },
                rank: 28,
                is_matched: false,
                meeting: 1
            },
            joined_user_1 : {
                profile: {
                    age_range: "20",
                    company: {
                        name: "네이버"
                    },
                    created_at: "2019-08-24T11:02:53+09:00",
                    id: 1,
                    image: require('./images/1oyj.jpg'),
                    image_two: require('./images/2sde.png'),
                    image_three: require('./images/3lhj.jpg'),
                    is_male: false,
                    last_intro_modified_at: "2019-08-24T11:02:53+09:00",
                    last_login_at: "2019-08-24T11:02:53+09:00",
                    team_name: "세얼간이",
                    team_introduce: "테스트 소개 문구입니다.",
                    user: {
                        username: "한현상"
                    }
                },
                rank: 28,
                is_matched: false,
                meeting: 1
            },
            joined_user_2 : {
                profile: {
                    age_range: "20",
                    company: {
                        name: "네이버"
                    },
                    created_at: "2019-08-24T11:02:53+09:00",
                    id: 1,
                    image: require('./images/1oyj.jpg'),
                    image_two: require('./images/2sde.png'),
                    image_three: require('./images/3lhj.jpg'),
                    is_male: false,
                    last_intro_modified_at: "2019-08-24T11:02:53+09:00",
                    last_login_at: "2019-08-24T11:02:53+09:00",
                    team_name: "세얼간이",
                    team_introduce: "테스트 소개 문구입니다.",
                    user: {
                        username: "한현상"
                    }
                },
                rank: 7,
                is_matched: false,
                meeting: 1
            }
        }
    }

    render() {

        const { my_profile, current_meeting, current_meeting_1, current_meeting_2, current_meeting_3, joined_user, joined_user_0, joined_user_1, joined_user_2 } = this.state;

        return (
            <BrowserRouter>
                <div className="App">

                    <Route exact path="/"
                        render={() => (
                            <Home/>
                        )} />

                    <Route path="/initpage0"
                        render={(props) => (
                            <Initpage
                                {...props}
                                is_login_already={false}
                                is_joined_already={false} 
                                my_profile={my_profile}
                                current_meeting={current_meeting_1}
                                joined_user={joined_user}
                                isMadeTeam={false}
                            />
                        )}
                    />

                    <Route path="/initpage1"
                        render={(props) => (
                            <Initpage
                                {...props}
                                is_login_already={true}
                                is_joined_already={false} 
                                my_profile={my_profile}
                                current_meeting={current_meeting_1}
                                joined_user={joined_user}
                                isMadeTeam={false}
                            />
                        )}
                    />

                    <Route path="/initpage2"
                        render={(props) => (
                            <Initpage
                                {...props}
                                is_login_already={true}
                                is_joined_already={false} 
                                my_profile={my_profile}
                                current_meeting={current_meeting_1}
                                joined_user={joined_user}
                                isMadeTeam={true}
                            />
                        )}
                    />

                    <Route path="/initpage3"
                        render={(props) => (
                            <Initpage
                                {...props}
                                is_login_already={true}
                                is_joined_already={true} 
                                my_profile={my_profile}
                                current_meeting={current_meeting_2}
                                joined_user={joined_user}
                                isMadeTeam={true}
                            />
                        )}
                    />

                    <Route path="/waiting0"
                        render={(props) => (
                            <Waiting
                                {...props}
                                is_login_already={true}
                                my_profile={my_profile}
                                current_meeting={current_meeting}
                                joined_user={joined_user_0}
                                isMine={true}
                                hardCode={true}
                            />
                        )}
                    />

                    <Route path="/waiting1"
                        render={(props) => (
                            <Waiting
                                {...props}
                                is_login_already={true}
                                my_profile={my_profile}
                                current_meeting={current_meeting}
                                joined_user={joined_user_1}
                                isMine={false}
                            />
                        )}
                    />

                    <Route path="/waiting2"
                        render={(props) => (
                            <Waiting
                                {...props}
                                is_login_already={true}
                                my_profile={my_profile}
                                current_meeting={current_meeting}
                                joined_user={joined_user_2}
                                isMine={false}
                            />
                        )}
                    />

                    <Route path="/matching"
                        render={(props) => (
                            <Main
                                {...props}
                                my_profile={my_profile}
                            />
                        )}
                    />

                    <Route path="/profile"
                        render={(props) => (
                            <Profile
                                {...props}
                                my_profile_from_app={my_profile}
                                my_profile={my_profile}
                            />
                        )}
                    />

                    <Route path="/team_profile"
                        render={(props) => (
                            <TeamProfile
                                my_profile={my_profile}
                            />
                        )} 
                    />
                </div>
            </BrowserRouter>
        );
    }
}
export default App;