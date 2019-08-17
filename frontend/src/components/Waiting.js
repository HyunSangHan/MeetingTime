import React, { Component } from 'react';
import * as joinActions from "../modules/join";
import "../css/Waiting.scss";
import '../App.css';
import MeetingInfo from './details/MeetingInfo';
import MyNumber from './details/MyNumber';
import ResultNumber from './details/ResultNumber';
import CountDown from './details/CountDown';
import JoinButton from './details/JoinButton';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import Textarea from "react-textarea-autosize";
import { post } from "axios";
import { Link } from 'react-router-dom';

class Waiting extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { JoinActions } = this.props;
        JoinActions.getJoinedUser();
    }

    render(){    
        const { joined_user } = this.props;
        console.log(joined_user)
        return (
            <div className="App">
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    JoinActions: bindActionCreators(joinActions, dispatch),
});

const mapStateToProps = (state) => ({
    joined_user: state.join.get('joined_user'),
})

export default connect(mapStateToProps, mapDispatchToProps)(Waiting);