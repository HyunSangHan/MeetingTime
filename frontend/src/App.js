import React, { Component } from "react"
import "./App.css"
import Main from "./components/Main"
import Profile from "./components/Profile"
import TeamProfile from "./components/TeamProfile"
import Initpage from "./components/Initpage"
import Waiting from "./components/Waiting"
import CounterPlayer from "./components/details/CounterPlayer"
import { BrowserRouter, Route } from "react-router-dom"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as myProfileActions from "./modules/my_profile"
import * as currentMeetingActions from "./modules/current_meeting"
import axios from "axios"

axios.defaults.xsrfCookieName = "csrftoken"
axios.defaults.xsrfHeaderName = "X-CSRFToken"

class App extends Component {
  componentDidMount() {
    const { MyProfileActions, CurrentMeetingActions } = this.props
    MyProfileActions.getMyProfile()
    CurrentMeetingActions.getCurrentMeeting()
  }

  render() {
    const {
      isLoginAlready,
      isJoinedAlready,
      currentMeeting,
      myProfile
    } = this.props
    const openTime = Date.parse(currentMeeting.openTime)
    const nowTime = new Date().getTime()

    return (
      <BrowserRouter>
        <div className="App">
          {nowTime > openTime && isJoinedAlready ? (
            <Route exact path="/" component={Waiting} />
          ) : (
            <Route
              exact
              path="/"
              render={props => (
                <Initpage
                  {...props}
                  isLoginAlready={isLoginAlready}
                  myProfile={myProfile}
                />
              )}
            />
          )}

          <Route
            path="/matching"
            render={props => (
              <Main
                {...props}
                myProfile={myProfile}
                isValidated={myProfile.validated}
              />
            )}
          />

          <Route
            path="/profile"
            render={props => (
              <Profile {...props} myProfileFromApp={myProfile} />
            )}
          />

          <Route
            path="/team_profile"
            render={props => (
              <TeamProfile {...props} isValidated={myProfile.validated} />
            )}
          />

          <Route
            path="/matching_result"
            render={props => (
              <CounterPlayer {...props} isValidated={myProfile.validated} />
            )}
          />
        </div>
      </BrowserRouter>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  dispatch,
  MyProfileActions: bindActionCreators(myProfileActions, dispatch),
  CurrentMeetingActions: bindActionCreators(currentMeetingActions, dispatch)
})

const mapStateToProps = state => ({
  isLoginAlready: state.my_profile.get("isLoginAlready"),
  isJoinedAlready: state.join.get("isJoinedAlready"),
  myProfile: state.my_profile.get("myProfile"),
  currentMeeting: state.current_meeting.get("currentMeeting")
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
