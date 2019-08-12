import React, { Component } from 'react';
import '../css/Body.css';
import '../App.css';
import { Container, Row, Col } from 'reactstrap';
import MaterialIcon from 'material-icons-react';
import { Link } from 'react-router-dom';
import JoinedPopup from "./popups/JoinedPopup";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Footer from "./Footer";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as joinActions from '../modules/join';
import * as currentMeetingActions from '../modules/current_meeting';
import axios from 'axios';

class Main extends Component {

    constructor(props){
        super(props);
    }

    componentDidMount(){
        const { CurrentMeetingActions, JoinActions } = this.props;
        CurrentMeetingActions.getCurrentMeeting();
        JoinActions.getJoinedUser();
        // console.log(Date(new Date().toLocaleString())) //테스트
        // console.log(new Date("2019-09-09T08:25:39+09:00")) //.getTime()??

        // console.log(new Date().getTime()) //테스트
        // console.log(Date.parse("2019-09-09T08:25:39+09:00"))


    }

    render() {
        const {user, JoinActions, is_joined_popup_on, is_joined_already, joined_user, current_meeting } = this.props;
        return (
            <div className={"App"}>
                {is_joined_already
                ? (<div className={"big-button-black flex-center font-2 font-white"}
                        onClick={JoinActions.reclickJoinedPopup}>
                    현재 순위: {joined_user.rank}위
                </div>)
                : (<div className={"big-button-red flex-center font-2 font-white"}
                        onClick={JoinActions.createJoinedPopup}>
                    선착순 번호표 뽑기
                    {/*{this.props.cutline}*/}
                </div>)}
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
    is_joined_popup_on: state.join.get('is_joined_popup_on'),
    is_joined_already: state.join.get('is_joined_already'),
    joined_user: state.join.get('joined_user'),
    current_meeting: state.current_meeting.get('current_meeting'),
})

export default connect(mapStateToProps, mapDispatchToProps)(Main);