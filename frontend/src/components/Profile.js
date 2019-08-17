import React, { Component } from 'react';
import * as myProfileActions from "../modules/my_profile";
import "../css/Profile.scss";
import '../App.css';
import Header from './details/Header';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import Textarea from "react-textarea-autosize";
import { post } from "axios";
import { Link } from 'react-router-dom';

//import EditPW from "./EditPW";

class Profile extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { MyProfileActions } = this.props;
        MyProfileActions.getMyProfile();
    }

    render(){    
        const { my_profile } = this.props;

        return (    
            <div className="App">
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    MyProfileActions: bindActionCreators(myProfileActions, dispatch),
});

const mapStateToProps = (state) => ({
    my_profile: state.my_profile.get('my_profile'),
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile);