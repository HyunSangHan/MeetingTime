import React, { Component } from 'react';
import "../css/Waiting.scss";
import '../App.css';
import MeetingInfo from './details/MeetingInfo';
import MyNumber from './details/MyNumber';
import ResultNumber from './details/ResultNumber';
import JoinButton from './details/JoinButton';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import * as currentMeetingActions from './../modules/current_meeting';
import * as joinActions from './../modules/join';

class Waiting extends Component {

    render(){
        const { joined_user, current_meeting, isMine, hardCode } = this.props;
        const isMadeTeam = true
        let numberInfo = null
        if (isMine) {
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
                <div className="fix-bottom-waiting w100percent mb-36 mt-3">
                    <JoinButton 
                            is_login_already = {true}
                            isMadeTeam = {isMadeTeam}
                            is_joined_already = {true}
                            joined_user = {joined_user}
                            current_meeting = {current_meeting}
                            hardCode = {hardCode}
                        />
                </div>
            </div>
        );
    }
}

export default Waiting;