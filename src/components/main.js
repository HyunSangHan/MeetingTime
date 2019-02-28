import React, { Component } from 'react';
import '../css/Body.css';
import '../App.css';
import { Container, Row, Col } from 'reactstrap';

class Main extends Component {

    render() {
        return (
            <div className="App">
                <div className="up-bg flex-center">
                    <Container>
                        <Row className={"App"}>
                            <Col xs={12}>
                                <div className={"font-5 font-white"}>
                                    이번주 불금 in 강남
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
                            <Row>
                                <Col xs={3}>
                                    <div className={"img-circle"}>
                                        (이미지)
                                    </div>
                                </Col>
                                <Col xs={6} className={"align-left"}>
                                    <div className={"font-3"}><b>닉네임</b></div>
                                    <div className={"font-2 mt-2"}>회사 이름</div>
                                </Col>
                                <Col xs={3}>
                                    (화살표)
                                </Col>

                            </Row>
                        </Container>
                    </div>
                    <div className={"chat"}>
                        <Container>
                            <Row>
                                <Col>
                                    (지난 대화방 보기)
                                </Col>
                            </Row>
                        </Container>

                    </div>
                    <div className={"heart"}>
                        <Container>
                            <Row>
                                <Col>
                                    (하트 상태 들어갈 곳)
                                </Col>
                            </Row>
                        </Container>

                    </div>
                    <div className={"invite"}>
                        <Container>
                            <Row>
                                <Col>
                                    (초대하기 문구, 추천인코드 들어갈 곳)
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