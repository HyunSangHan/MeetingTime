import React, { Component } from 'react';
import '../css/Body.css';
import '../App.css';
import { Container, Row, Col } from 'reactstrap';
import MaterialIcon from 'material-icons-react';
import { Link, Redirect } from 'react-router-dom';
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

        this.state = {
            time: 179,
        }
        this.startTimer = this.startTimer.bind(this);

    }

    componentDidMount() {
        const { CurrentMeetingActions, JoinActions } = this.props;
        CurrentMeetingActions.getCurrentMeeting();
        JoinActions.getJoinedUser();

        this.startTimer();
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

    startTimer() { //일단 넣어둔 함수TODO: 커스터마이징해야됨
        // const { history } = this.props; //시간 관련해서 받아올 곳
        this.setState(prevState => ({
            time: prevState.time,
        }));
        this.timer = setInterval(() => this.setState(prevState => ({
            ...prevState,
            time: prevState.time - 1
        })), 1000);
        this.ifTimer = setInterval(() => {
            const { time } = this.state;
            if (time <= 0) {
                window.location.reload(); //리프레시
                clearInterval(this.timer, this.ifTimer);
            }
        }, 1000);
    }

    getInputDayLabel = (meetingTime) => {
        const week = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
        const today = new Date(meetingTime).getDay();
        const todayLabel = week[today];
        return todayLabel;
    }

    render() {
        const {user, current_meeting, is_login_already } = this.props;

        const meetingTime = new Date(current_meeting.meeting_time);
        const nowTime = new Date();
        const meetingTimeNum = Date.parse(current_meeting.meeting_time);
        const nowTimeNum = new Date().getTime()
        const meetingDay = this.getInputDayLabel(current_meeting.meeting_time);

        let meetingWeek = null;
        if (nowTime.getDay() < meetingTime.getDay() && meetingTimeNum - nowTimeNum <= 561600000) {
            meetingWeek = "이번"
        } else if (nowTime.getDay() < meetingTime.getDay() && meetingTimeNum - nowTimeNum > 561600000) {
            meetingWeek = "다음"
        } else if (nowTime.getDay() > meetingTime.getDay() && meetingTimeNum - nowTimeNum <= 561600000) {
            meetingWeek = "다음"
        } else if (nowTime.getDay() > meetingTime.getDay() && meetingTimeNum - nowTimeNum > 561600000) {
            meetingWeek = "다다음"
        } else if (nowTime.getDay() === meetingTime.getDay() && meetingTimeNum - nowTimeNum <= 561600000) {
            meetingWeek = "이번"
        } else if (nowTime.getDay() === meetingTime.getDay() && meetingTimeNum - nowTimeNum > 561600000) {
            meetingWeek = "다음"
        } else {
            meetingWeek = ""
        }

        return (
            <div className={"frame"}>
                {
                    !is_login_already && <Redirect to="/"/>
                }

{/*PC와 모바일 공통*/}
                <div className="up-bg flex-center frame-half">
                    <div className={"up-bg-color fix"}/>
                    <Container>
                        <Row className={"App"}>
                            <Col xs={12}>
                                <div className={"font-big font-white mt-4"}>
                                    <div className="font-05 hover" onClick={this.kakaoLogout()}>로그아웃</div>
                                    {meetingWeek} {meetingDay} {current_meeting.location}
                                </div>
                            </Col>
                            <Col xs={12}>
                                <div className={"font-1 font-white mt-3 opacity05"}>
                                    {/* TODO: 카운트다운 들어갈 곳 */}

                                    {/* TODO: current_matching 모듈 생기면, 셔플회차 들어갈 곳 */}
                                    ?번째 셔플 결과입니다.
                                </div>
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
    is_login_already: state.my_profile.get('is_login_already'),
    joined_user: state.join.get('joined_user'),
    current_meeting: state.current_meeting.get('current_meeting'),
})

export default connect(mapStateToProps, mapDispatchToProps)(Main);