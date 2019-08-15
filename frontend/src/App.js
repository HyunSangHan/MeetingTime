/* eslint-disable */
import React, { Component } from 'react';
import './App.css';
import Main from "./components/Main"
import Profile from "./components/details/Profile";
import Initpage from "./components/Initpage";
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
                            />
                        )}
                    />

                    <Route path="/profile"
                        render={(props) => (
                            <Profile
                                {...props}
                                my_profile={my_profile}
                            />
                        )} />

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