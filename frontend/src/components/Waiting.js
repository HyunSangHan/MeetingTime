import React, { Component } from 'react';
import "../css/Waiting.scss";
import '../App.css';
import MeetingInfo from './details/MeetingInfo';
import MyNumber from './details/MyNumber';
import ResultNumber from './details/ResultNumber';
import JoinButton from './details/JoinButton';
import JoinedPopup from './details/JoinedPopup';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import Textarea from "react-textarea-autosize";
import { post } from "axios";
import { Link, Redirect } from 'react-router-dom';
import * as currentMeetingActions from './../modules/current_meeting';
import * as joinActions from './../modules/join';

class Waiting extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { JoinActions, CurrentMeetingActions } = this.props;
        JoinActions.getJoinedUser();
        CurrentMeetingActions.getCurrentMeeting();
    }

    render(){    
        const { joined_user, current_meeting, is_login_already } = this.props;
        const closeTime = Date.parse(current_meeting.close_time)
        const nowTime = new Date().getTime()

        let numberInfo = null
        if (nowTime < closeTime) {
            numberInfo = 
            <MyNumber
                rank = { joined_user.rank} 
            />
        } else {
            numberInfo = 
            <ResultNumber
                cutline = { current_meeting.cutline }
                rank = { joined_user.rank }
            />
        }

        return (
            <div className="frame bg-init-color">
                <div className="container-shadow mh-auto">
                    <div className="waiting-header flex-center">
                        <img src={require("./../images/callCall.png")} width="100px" alt="logo" />
                    </div>
                    { numberInfo }
                    <MeetingInfo
                        makeTeamButton = { null }
                        isMadeTeam = { true }
                        current_meeting = { current_meeting }
                    />
                </div>
                <div className="fix-bottom-waiting w100percent mb-36 mt-2">
                    <JoinButton 
                        is_login_already = {is_login_already} />
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    JoinActions: bindActionCreators(joinActions, dispatch),
    CurrentMeetingActions: bindActionCreators(currentMeetingActions, dispatch),
});

const mapStateToProps = (state) => ({
    joined_user: state.join.get('joined_user'),
    current_meeting: state.current_meeting.get('current_meeting'),
    is_login_already: state.my_profile.get('is_login_already'),
})

export default connect(mapStateToProps, mapDispatchToProps)(Waiting);