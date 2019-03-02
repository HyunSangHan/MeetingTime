import React, { Component } from 'react';
import '../../css/Body.css';
import '../../App.css';
import { Container, Row, Col } from 'reactstrap';
import Header from "./Header";

class Chat extends Component {

    render() {
        return (
            <div className={"App"}>
                <Header title="지난 대화"/>
                <div className="offset-down">
                    <Container>
                        <Row>
                            <Col>
                                <div className={"App"}>지난 채팅 개발 필요</div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        );
    }
}

export default Chat;