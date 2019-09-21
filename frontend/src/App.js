/* eslint-disable */
import React, { Component } from 'react';
import './App.css';
import Main from "./components/Main"
import Profile from "./components/Profile";
import TeamProfile from "./components/TeamProfile";
import Initpage from "./components/Initpage";
import Waiting from "./components/Waiting";
import CounterPlayer from "./components/details/CounterPlayer";
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as myProfileActions from './modules/my_profile';
import * as currentMeetingActions from './modules/current_meeting';
import axios from 'axios';

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

class App extends Component {

    componentDidMount () {
        const { MyProfileActions, CurrentMeetingActions } = this.props;
        MyProfileActions.getMyProfile();
        CurrentMeetingActions.getCurrentMeeting();
    }

    render() {

        const { is_login_already, is_joined_already, current_meeting, my_profile  } = this.props;
        const openTime = Date.parse(current_meeting.open_time)
        const nowTime = new Date().getTime()

        return (
            <BrowserRouter>
                <div className="App">

                    {/* {nowTime > openTime && is_joined_already
                    ?
                    <Route exact path="/" component={Waiting}/>
                    : */}
                    <Route exact path="/"
                            render={(props) => (
                                <Initpage
                                    {...props}
                                    is_login_already={is_login_already}
                                    my_profile={my_profile}
                                />
                            )}
                        />
                    {/* } */}

                    <Route path="/matching"
                        render={(props) => (
                            <Main
                                {...props}
                                my_profile={my_profile}
                                is_validated={my_profile.validated}
                            />
                        )}
                    />

                    <Route path="/profile"
                        render={(props) => (
                            <Profile
                                {...props}
                                my_profile_from_app={my_profile}
                            />
                        )}
                    />

                    <Route path="/team_profile"
                        render={(props) => (
                            <TeamProfile
                                {...props}
                                is_validated={my_profile.validated}
                            />
                        )} 
                    />

                    <Route path="/matching_result"
                        render={(props) => (
                            <CounterPlayer
                                {...props}
                                is_validated={my_profile.validated}
                            />
                        )} 
                    />
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
    is_joined_already: state.join.get('is_joined_already'),
    my_profile: state.my_profile.get('my_profile'),
    current_meeting: state.current_meeting.get('current_meeting'),
})

export default connect(mapStateToProps, mapDispatchToProps)(App);