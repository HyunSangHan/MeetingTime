import React, { Component } from 'react';
import '../../css/Body.css';
import '../../App.css';
import { Container, Row, Col } from 'reactstrap';
import Header from "./Header";

class Heart extends Component {

    render() {
        return (
            <div className={"App"}>
                <Header title="하트 충전하기"/>
                <div className="offset-down">
                    <Container>
                        <Row className={"flex-center"}>
                            <Col xs={12}>
                                <div>하트 개발 필요1</div>
                            </Col>
                            <Col xs={12}>
                                <div>하트 개발 필요2</div>
                            </Col>
                        </Row>
                        <Row className={"flex-center"}>
                            <Col xs={12}>
                                <div>하트 개발 필요3</div>
                            </Col>
                            <Col xs={12}>
                                <div>하트 개발 필요4</div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        );
    }
}

export default Heart;