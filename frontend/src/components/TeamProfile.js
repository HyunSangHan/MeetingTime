import React, { Component } from 'react';
import * as myProfileActions from "../modules/my_profile";
import "../css/Profile.scss";
import '../App.css';
import Header from './details/Header';
import TwoTab from "./details/TwoTab";
import TeamProfileNew from "./details/TeamProfileNew";
import TeamProfilePrev from "./details/TeamProfilePrev";
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import Textarea from "react-textarea-autosize";
import axios from "axios";
import { Link } from 'react-router-dom';

class TeamProfile extends Component {

    constructor(props) {
        console.log(props);
        super(props);
        this.state = {
            action: "new"
            
        }
    }

    
    
    render(){    
        return (
            <div className="tab-container">
                <TwoTab />
            </div>
        );
    }
}

export default TeamProfile;