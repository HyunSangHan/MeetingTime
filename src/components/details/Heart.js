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
                <Header title="하트 충전하기"/>
                <div className="offset-down">
                    <Container>
                        <Row className={"flex-center font-2"}>
                            <Col xs={12}>
                                <div className={"heart-box flex-center mt-3"}>
                                    <MaterialIcon icon="favorite" size="18px" color="red"/>
                                    x 1k = 1,200원</div>
                            </Col>
                            <Col xs={12}>
                                <div className={"heart-box flex-center"}>
                                    <MaterialIcon icon="favorite" size="18px" color="red"/>
                                    x 3k = 3,300원</div>
                            </Col>
                        </Row>
                        <Row className={"flex-center font-2"}>
                            <Col xs={12}>
                                <div className={"heart-box flex-center"}>
                                    <MaterialIcon icon="favorite" size="18px" color="red"/>
                                    x 5k = 5,300원</div>
                            </Col>
                            <Col xs={12}>
                                <div className={"heart-box flex-center"}>
                                    <MaterialIcon icon="favorite" size="18px" color="red"/>
                                    x 10k = 9,900원</div>
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