import React, { Component } from 'react';
import '../../css/Body.css';
import '../../App.css';
import { Container, Row, Col } from 'reactstrap';
import Header from "../Header";
import MaterialIcon from 'material-icons-react';
import Footer from "./../Footer";

class Heart extends Component {

    render() {
        return (
            <div className={"App"}>
                <div className="offset-down pc-none">
                    <Header title="하트 충전하기"/>
                </div>
                <div className="offset-down-mobile-only">
                    <Container>
                        <Row className={"flex-center font-2"}>
                            <Col xs={12} md={6}>
                                <div className={"heart-box flex-center mt-3"}>
                                    <MaterialIcon icon="favorite" size="18px" color="red"/>
                                    x 1 = 1,200원</div>
                            </Col>
                            <Col xs={12} md={6}>
                                <div className={"heart-box flex-center"}>
                                    <MaterialIcon icon="favorite" size="18px" color="red"/>
                                    x 3 = 3,300원</div>
                            </Col>
                        </Row>
                        <Row className={"flex-center font-2"}>
                            <Col xs={12} md={6}>
                                <div className={"heart-box flex-center"}>
                                    <MaterialIcon icon="favorite" size="18px" color="red"/>
                                    x 5 = 5,300원</div>
                            </Col>
                            <Col xs={12} md={6}>
                                <div className={"heart-box flex-center"}>
                                    <MaterialIcon icon="favorite" size="18px" color="red"/>
                                    x 10 = 9,900원</div>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default Heart;