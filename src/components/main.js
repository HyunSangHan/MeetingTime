import React, { Component } from 'react';
import '../css/Body.css';
import '../App.css';
import { Container, Row, Col } from 'reactstrap';
import MaterialIcon from 'material-icons-react';
import { Link } from 'react-router-dom';
import CopiedPopup from "./popups/CopiedPopup";
import JoinedPopup from "./popups/JoinedPopup";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Footer from "./Footer";
import Heart from "./details/Heart";
import Chat from "./details/Chat";

class Main extends Component {
    constructor(props){
        super(props);
    };

    render() {
        return (
            <div className={"frame"}>

{/*팝업들*/}
                {this.props.is_copied &&
                <div className={"App"}>
                    <div className={"flex-center"}>
                        <div className={"fix minus-height z-4"}>
                            <CopiedPopup user={this.props.user}
                                         offPopup={this.props.offPopup}/>
                        </div>
                    </div>
                    <div className={"frame-dark fix z-3"}/>
                </div>
                }
                {this.props.is_joined &&
                <div className={"App"}>
                    <div className={"flex-center"}>
                        <div className={"fix minus-height z-4"}>
                            <JoinedPopup user={this.props.user}
                                         offPopup={this.props.offPopup}
                                         offPopupJoin={this.props.offPopupJoin}
                                         is_joined_done={this.props.is_joined_done}/>
                        </div>
                    </div>
                    <div className={"frame-dark fix z-3"}/>
                </div>
                }


{/*PC전용 1 */}
                <div className={"mobile-none frame-half abs-right"}>
                    <Container>
                        <Container className={"h100percent"}>
                            <div className={"font-3 font-grey font-bolder mt-4 ml-3"}>
                                하트 충전하기
                            </div>
                            <Heart user={this.props.user}/>
                            <div className={"font-3 font-grey font-bolder mt-5 ml-3"}>
                                지난 대화목록
                            </div>
                            <Chat user={this.props.user} ex_user={this.props.ex_user}/>
                        </Container>
                    </Container>
                </div>

{/*PC와 모바일 공통*/}
                <div className="up-bg flex-center frame-half">
                    <div className={"fix flex-center frame-half"}>
                        <img src={this.props.user.img_url} className={"bg-under-img"} alt={"profile-large-img"}/>
                    </div>
                    <div className={"up-bg-color fix"}/>
                    <Container>
                        <Row className={"App"}>
                            <Col xs={12}>
                                <div className={"font-big font-white mt-4"}>
                                    {this.props.info.title}
                                </div>
                            </Col>
                            <Col xs={12}>
                                <div className={"font-1 font-white mt-3 opacity05"}>
                                    {this.props.info.msg1}
                                </div>
                                <div className={"font-1 font-white mt-1 opacity05"}>
                                    {this.props.info.msg2}
                                </div>
                            </Col>
                            <Col xs={12} className={"flex-center"}>

                                {/*추후 조건부 렌더 필요한부분*/}
                                {this.props.is_joined_done
                                    ? (<div className={"big-button-black flex-center font-2 font-white"}
                                            onClick={this.props.onJoinedPopup}>
                                        현재 순위: {this.props.user.rank}
                                    </div>)
                                    : (<div className={"big-button-red flex-center font-2 font-white"}
                                            onClick={this.props.onJoinedPopup}>
                                        선착순 번호표 뽑기
                                    </div>)}
                            </Col>
                        </Row>
                    </Container>
                </div>
{/*absolute로 변경?*/}
                <div className="down-bg frame-half bg-white absolute z-2">
{/*모바일 전용*/}
                    {/*<div className={"hover"} onClick={this.props.testFunc}>이것은 테스트~~~!!여기를 클릭</div>*/}
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
                                                {this.props.user.nickname}
                                            </div>
                                            <div className={"font-1 font-grey mt-2"}>
                                                {this.props.user.company}
                                            </div>
                                        </div>
                                    </Col>
                                    <Col xs={2} md={3} className={"h17vh flex-j-start"}>
                                        <div className={"pc-none"}>
                                            <MaterialIcon icon="arrow_forward_ios" size="23x" color="#f0f0f0"/>
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
                                    <div className={"font-05 opacity08 ml-1"}>내 하트 <b>{this.props.user.current_heart}</b>개</div>
                                </Col>
                                <Col xs={4} className={"align-right align-center"}>
                                    <Link to="/heart">
                                        <div className={"heart-button deco-none flex-center font-05"}>
                                            <MaterialIcon icon="favorite" size="18px" color="red"/>
                                            <div className={"ml-1"}>충전하기</div>
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
                                    <div className={"font-05 opacity08 ml-1"}>지난 대화 <b>{this.props.user.chat}</b>개</div>
                                </Col>
                                <Col xs={4} className={"align-right align-center"}>
                                    <Link to="/chat">
                                        <div className={"heart-button deco-none flex-center font-05"}>
                                            <MaterialIcon icon="forum" size="18px" color="grey"/>
                                            <div className={"ml-1"}>대화하기</div>
                                        </div>
                                    </Link>
                                </Col>
                            </Row>
                        </Container>
                    </div>

{/*PC 전용 2 */}

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
                                                    {this.props.user.nickname}
                                                </div>
                                                <div className={"font-1 font-black mt-1"}>
                                                    &nbsp; {this.props.user.company}
                                                </div>
                                            </div>
                                            <div className={"font-05 ml-1 mt-3 font-grey"}>
                                                {this.props.user.team_detail}
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
                                            <b>친구 초대 </b>
                                            <font color="#808080" size="10px">(추천인코드: <b>{this.props.user.recommendation_code}</b>)</font>
                                            </div>
                                        <div className={"font-05 ml-1 mt-2"}>여자사람친구를 초대해주세요.</div>
                                        <div className={"font-05 ml-1"}>하트 2개를 드려요!</div>
                                    </Col>
                                    <Col xs={3} className={"h8vh flex-j-end"}>
                                        <CopyToClipboard text={this.props.user.recommendation_code}>
                                            <div className={"copy-button deco-none flex-center"} onClick={this.props.onCopiedPopup}>
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

export default Main;