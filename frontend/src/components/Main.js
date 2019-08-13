/* eslint-disable */
import React, { Component } from 'react';
import '../css/Body.css';
import '../App.css';
import { Container, Row, Col } from 'reactstrap';
import MaterialIcon from 'material-icons-react';
import { Link } from 'react-router-dom';
import JoinedPopup from "./popups/JoinedPopup";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Footer from "./Footer";
import Player from "./Player";
import { connect } from "react-redux";
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
    }

    kakaoLogout = () => () => {
        console.log(window.Kakao.Auth.getAccessToken());
        window.Kakao.Auth.logout(function(data){
            console.log(data)
        });
        axios.get("/logout")
        .then(response => {
            console.log(response.data)
            console.log("로그아웃 완료")
            window.location.reload();
        })
        .catch(err => console.log(err));
    }

    
    render() {
        const {user, JoinActions, is_joined_popup_on, is_joined_already, joined_user, current_meeting } = this.props;
        return (
            <div className={"frame"}>
{/*팝업*/}
                {is_joined_popup_on &&
                <div className={"App"}>
                    <div className={"flex-center"}>
                        <div className={"fix minus-height z-4"}>
                            <JoinedPopup
                                rank={joined_user.rank}
                                deletePopup={JoinActions.deletePopup}
                                is_joined_already={is_joined_already}
                            />
                        </div>
                    </div>
                    <div className={"frame-dark fix z-3"}/>
                </div>
                }

{/*PC와 모바일 공통*/}
                <div className="up-bg flex-center frame-half">
                    <div className={"fix flex-center frame-half"}>
                        <img src={user.img_url} className={"bg-under-img"} alt={"profile-large-img"}/>
                    </div>
                    <div className={"up-bg-color fix"}/>
                    <Container>
                        <Row className={"App"}>
                            <Col xs={12}>
                                <div className={"font-big font-white mt-4"}>
                                    <div className="font-05 hover" onClick={this.kakaoLogout()}>로그아웃</div>
                                    {current_meeting.location}
                                </div>
                            </Col>
                            <Col xs={12}>
                                <div className={"font-1 font-white mt-3 opacity05"}>
                                    {current_meeting.first_shuffle_time}
                                </div>
                                <div className={"font-1 font-white mt-1 opacity05"}>
                                    {current_meeting.second_shuffle_time}
                                </div>
                            </Col>
                            <Col xs={12} className={"flex-center"}>

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
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div className="down-bg frame-half bg-white absolute z-2">
{/*모바일 전용*/}
                    {/*<div className={"hover z-5"} onClick={this.props.testFunc}>이것은 테스트~~~!!여기를 클릭</div>*/}

                    <div className={"profile bg-white pc-none"}>
                        <div className="profile h100percent w50percent bg-white absolute z-1"/>
                        <div className={"pc-max-width bg-white z-2"}>
                            <Container>    
                                <Row className={"align-center deco-none"}>
                                    <Player
                                        {...this.props}
                                        joined_player={joined_user}
                                    />  
                                    <Col xs={2} md={3} className={"h17vh flex-j-end"}>
                                        <div className={"pc-none"}>
                                            <MaterialIcon icon="arrow_forward_ios" size="23px" color="#f0f0f0"/>
                                        </div>
                                    </Col>
                                </Row>
                                
                            </Container>
                        </div>
                    </div>
                    
{/*PC 전용 */} 
                    <div className={"profile mobile-none z-2"}>
                        {/*<div className="profile h100percent w50percent bg-white fix z-1"/>*/}
                        <div className={"pc-max-width z-2"}>
                            <Container>
                    
                            </Container>
                        </div>
                    </div>
                </div>
                <Footer/>
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