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
    // constructor(props){
    //     super(props);
    // };

    render() {
        return (
            <div className={"frame"}>

{/*팝업들*/}
                {this.props.is_copied &&
                <div className={"App"}>
                    <div className={"flex-center"}>
                    <div className={"fix minus-height z-2"}>
                        <CopiedPopup user={this.props.user}
                                     offPopup={this.props.offPopup}/>
                    </div>
                    </div>
                    <div className={"frame-dark fix z-1"}></div>
                </div>
                }
                {this.props.is_joined &&
                <div className={"App"}>
                    <div className={"flex-center"}>
                        <div className={"fix minus-height z-2"}>
                            <JoinedPopup user={this.props.user}
                                         offPopup={this.props.offPopup}/>
                        </div>
                    </div>
                    <div className={"frame-dark fix z-1"}></div>
                </div>
                }


{/*PC전용*/}
                <div className={"mobile-none frame-half abs-right z-2"}>
                    <Container>
                        <Container className={"h100percent"}>
                            <div className={"font-3 font-grey font-bolder mt-4 ml-3"}>
                                하트 충전하기
                            </div>
                            <Heart/>
                            <div className={"font-3 font-grey font-bolder mt-5 mb-2 ml-3"}>
                                지난 대화목록
                            </div>
                            <Chat ex_user={this.props.ex_user}/>
                        </Container>
                    </Container>
                </div>

{/*PC와 모바일 공통*/}
                <div className="up-bg flex-center frame-half">
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
                                <div className={"big-button flex-center font-2 font-white"} onClick={this.props.onJoinedPopup}>
                                    선착순 번호표 뽑기
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
                {/*모바일 전용*/}

                <div className="down-bg frame-half">
                        <div className={"profile"}>
                            <Container>
                                <Link to="/profile">
                                <Row className={"align-center deco-none"}>
                                    <Col xs={3} md={3}>
                                        <div className={"img-my-circle"}>
                                            {/*img 태그와 props 들어갈 부분*/}
                                        </div>
                                    </Col>
                                    <Col xs={7} md={6} className={"align-left"}>
                                        <div className={"ml-name"}>
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
                                        <div className={"mobile-none font-black deco-none"}>
                                            정보 수정하기 >
                                        </div>
                                    </Col>

                                </Row>
                                </Link>
                            </Container>
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

                        <div className={"invite"}>
                            <Container>
                                <Row>
                                    <Col xs={9} className={"align-left"}>
                                        <div className={"font-1 ml-1"}>
                                            <b>친구 초대 </b>
                                            <font color="#808080" size="10px">(추천인코드: <b>{this.props.user.recommendation_code}</b>)</font>
                                            </div>
                                        <div className={"font-05 ml-1 mt-2"}>여자사람친구를 초대해주세요.</div>
                                        <div className={"font-05 ml-1"}>하트 1,000개를 드려요!</div>
                                    </Col>
                                    <Col xs={3} className={"h8vh flex-center"}>
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

                <Footer/>
            </div>
        );
    }
}

export default Main;