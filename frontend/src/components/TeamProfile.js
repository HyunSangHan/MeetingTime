import React, { Component } from 'react';
import * as myProfileActions from "../modules/my_profile";
import "../css/Profile.scss";
import '../App.css';
import Header from './details/Header';
import TwoTab from "./details/TwoTab";
import TeamProfileBody from "./details/TeamProfileBody";
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";

class TeamProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            empty_profile: {
                age_range: null,
                company: {
                    name: ""
                },
                created_at: null,
                id: null,
                image: null,
                image_two: null,
                image_three: null,
                is_male: false,
                last_intro_modified_at: null,
                last_login_at: null,
                team_introduce: "",
                user: {
                    username: ""
                },
                validated: false,
            }
        }
    }

    render(){
        const { is_edited_profile } = this.state;
        const { my_profile, action, MyProfileActions } = this.props;
        return (
            <div className="frame-scrollable bg-init-color" >
                <Header
                    content = {"미팅 그룹 생성"}
                />
                <TwoTab
                    clicked_tab = {action}
                    MyProfileActions = {MyProfileActions}
                />

                { action === "new" &&
                <TeamProfileBody
                    my_profile = {this.state.empty_profile}
                    is_edited_profile = {is_edited_profile}
                    clicked_tab = {action}
                />}
                { action === "prev" &&
                <TeamProfileBody
                    my_profile = {my_profile}
                    is_edited_profile = {is_edited_profile}
                    clicked_tab = {action}
                />}
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    MyProfileActions: bindActionCreators(myProfileActions, dispatch),
});

const mapStateToProps = (state) => ({
    action: state.my_profile.get('action'),
})

export default connect(mapStateToProps, mapDispatchToProps)(TeamProfile);
