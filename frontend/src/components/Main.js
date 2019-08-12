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
        const {user, JoinActions, is_joined_already, joined_user, current_meeting } = this.props;
        return (
            <div className={"frame"}>

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
                                <Link to="/profile">
                                <Row className={"align-center deco-none"}>
                                    {/*<Col xs={3} md={3}>*/}
                                        {/*<div className={"img-my-circle"}>*/}
                                            {/*/!*img 태그와 props 들어갈 부분*!/*/}
                                        {/*</div>*/}
                                    {/*</Col>*/}
                                    <Col xs={10} md={9} className={"align-left"}>
                                        <div className={"ml-name ml-1"}>
                                            <div className={"font-3 font-black font-bolder"}>
                                                {user.nickname}
                                            </div>
                                            <div className={"font-1 font-grey mt-2"}>
                                                {user.company}
                                            </div>
                                        </div>
                                    </Col>
                                    <Col xs={2} md={3} className={"h17vh flex-j-end"}>
                                        <div className={"pc-none"}>
                                            <MaterialIcon icon="arrow_forward_ios" size="23px" color="#f0f0f0"/>
                                        </div>
                                    </Col>
                                </Row>
                                </Link>
                            </Container>
                        </div>
                    </div>
                    <div className={"heart pc-none"}>
                        <Container>
                            <Row className={"align-center"}>
                                <Col xs={8} className={"align-left"}>
                                    <div className={"font-05 opacity08 ml-1"}>내 하트 <strong>{user.current_heart}</strong>개</div>
                                </Col>
                                <Col xs={4} className={"align-right align-center"}>
                                    <Link to="/heart">
                                        <div className={"heart-button deco-none flex-center font-05"}>
                                            <MaterialIcon icon="favorite" size="18px" color="red"/>
                                            <span className={"ml-1"}>충전하기</span>
                                        </div>
                                    </Link>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                    <div className={"chat pc-none"}>
                        <Container>
                            <Row className={"align-center"}>
                                <Col xs={8} className={"align-left"}>
                                    <span className={"font-05 opacity08 ml-1"}>지난 대화 <strong>{user.chat}</strong>개</span>
                                </Col>
                                <Col xs={4} className={"align-right align-center"}>
                                    <Link to="/chat">
                                        <div className={"heart-button hover flex-center font-05"}>
                                            <MaterialIcon icon="forum" size="18px" color="grey"/>
                                            <span className={"ml-1 hover"}>대화하기</span>
                                        </div>
                                    </Link>
                                </Col>
                            </Row>
                        </Container>
                    </div>
{/*PC 전용 */}
                    <div className={"profile mobile-none z-2"}>
                        {/*<div className="profile h100percent w50percent bg-white fix z-1"/>*/}
                        <div className={"pc-max-width z-2"}>
                            <Container>
                                    <Row className={"align-center deco-none z-2"}>
                                        {/*<Col md={4} lg={3}>*/}
                                            {/*<div className={"img-my-circle"}>*/}
                                                {/*/!*img 태그와 props 들어갈 부분*!/*/}
                                            {/*</div>*/}
                                        {/*</Col>*/}
                                        <Col md={9} lg={9} className={"align-left"}>
                                            <div className={"ml-1 inline-flex"}>
                                                <div className={"font-3 font-black font-bolder"}>
                                                    {user.nickname}
                                                </div>
                                                <div className={"font-1 font-black mt-1"}>
                                                    &nbsp; {user.company}
                                                </div>
                                            </div>
                                            <div className={"font-05 ml-1 mt-3 font-grey"}>
                                                {user.team_detail}
                                            </div>
                                        </Col>
                                        <Col md={3} lg={3} className={"h17vh flex-j-end"}>
                                            <Link to="/profile">
                                                <div className={"font-grey deco-none"}>
                                                    <div className={"copy-button deco-none flex-center"}>
                                                        <MaterialIcon icon="edit" size="25px" color="lightgrey"/>
                                                    </div>
                                                </div>
                                            </Link>
                                        </Col>
                                    </Row>
                            </Container>
                        </div>
                    </div>

                    <div className={"invite"}>
                        <div className={"pc-max-width"}>
                            <Container>
                                <Row>
                                    <Col xs={9} className={"align-left"}>
                                        <div className={"font-1 ml-1"}>
                                            <b>
                                                <span className="font-black deco-none">친구</span>초대
                                            </b>
                                            <font color="#808080" size="10px">(추천인코드: <strong>{user.recommendation_code}</strong>)</font>
                                            </div>
                                        <div className={"font-05 ml-1 mt-2"}>여자사람친구를 초대해주세요.</div>
                                        <div className={"font-05 ml-1"}>하트 2개를 드려요!</div>
                                    </Col>
                                    <Col xs={3} className={"h8vh flex-j-end"}>
                                        <CopyToClipboard text={user.recommendation_code}>
                                            <div className={"copy-button deco-none flex-center"}>
                                                <MaterialIcon icon="file_copy" size="25px" color="lightgrey"/>
                                            </div>
                                        </CopyToClipboard>
                                    </Col>
                                </Row>
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