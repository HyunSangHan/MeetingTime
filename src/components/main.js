import React, { Component } from 'react';
import '../css/Body.css';
import '../App.css';
import { Container, Row, Col } from 'reactstrap';
import MaterialIcon from 'material-icons-react';
import { Link } from 'react-router-dom';

class Main extends Component {

    render() {
        return (
            <div className="App">
                <div className="up-bg flex-center">
                    <Container>
                        <Row className={"App"}>
                            <Col xs={12}>
                                <div className={"font-big font-white mt-4"}>
                                    이번주 🔥금 in 강남
                                </div>
                            </Col>
                            <Col xs={12}>
                                <div className={"font-1 font-white mt-3 opacity05"}>
                                    매칭오픈 - 3월 4일 월요일 오전 10시
                                </div>
                                <div className={"font-1 font-white mt-1 opacity05"}>
                                    결과발표 - 3월 6일 수요일 오후 10시
                                </div>
                            </Col>
                            <Col xs={12} className={"flex-center"}>
                                <div className={"big-button flex-center font-2 font-white"}>
                                    선착순 번호표 뽑기
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div className="down-bg">
                        <div className={"profile"}>
                            <Container>
                                <Row className={"align-center"}>
                                    <Col xs={3}>
                                        <div className={"img-circle"}>
                                        </div>
                                    </Col>
                                    <Col xs={7} className={"align-left"}>
                                        <div className={"font-3 ml-1"}><b>필요data: 닉네임</b></div>
                                        <div className={"font-1 font-grey mt-2 ml-1"}>필요data: 회사이름</div>
                                    </Col>
                                    <Link to="/profile">
                                    <Col xs={2} className={"h17vh flex-j-start"}>
                                        <MaterialIcon icon="arrow_forward_ios" size="30px" color="#f0f0f0"/>
                                    </Col>
                                    </Link>

                                </Row>
                            </Container>
                        </div>
                    <div className={"heart"}>
                        <Container>
                            <Row className={"align-center"}>
                                <Col xs={8} className={"align-left"}>
                                    <div className={"font-05 opacity08 ml-1"}>내 하트 <b>[하트개수]</b>개</div>
                                </Col>
                                <Col xs={4} className={"align-right align-center"}>
                                    <Link to="/heart">
                                        <div className={"heart-button flex-center font-05"}>
                                            <MaterialIcon icon="favorite" size="18px" color="red"/>
                                            하트충전
                                        </div>
                                    </Link>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                    <div className={"chat"}>
                        <Container>
                            <Row className={"align-center"}>
                                <Col xs={10} className={"align-left"}>
                                    <div className={"font-05 opacity08 ml-1"}>지난 대화 <b>[대화방개수]</b>개</div>
                                </Col>
                                <Col xs={2}>
                                    <MaterialIcon icon="arrow_forward_ios" size="20px" color="#f0f0f0"/>
                                </Col>
                            </Row>
                        </Container>

                    </div>

                    <div className={"invite"}>
                        <Container>
                            <Row>
                                <Col xs={12} className={"align-left"}>
                                    <div className={"font-1 ml-1"}>
                                        <b>친구 초대 </b>
                                        <font color="#808080" size="10px">(추천인코드: <b>[추천코드]</b>)</font>
                                        </div>
                                    <div className={"font-0 ml-1 mt-2"}>여자사람친구를 초대해오시면 하트 1,000개를 드려요!</div>
                                    <div className={"font-05 ml-1"}>blah blah</div>
                                    {/*<Link to="/">*/}
                                        {/*<MaterialIcon icon="file_copy" size="35px" color="white"/>*/}
                                    {/*</Link>*/}
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </div>
            </div>
        );
    }
}

export default Main;