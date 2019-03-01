import React, { Component } from 'react';
import '../../css/Body.css';
import '../../App.css';
import { Container, Row, Col } from 'reactstrap';
import Header from "./Header";

class Heart extends Component {

    render() {
        return (
            <div className={"App"}>
                <Header/>
                <div className="offset-down">
                    <Container>
                        <Row>
                            <div className={"App"}>하트 개발 필요</div>
                        </Row>
                    </Container>
                </div>
            </div>
        );
    }
}

export default Heart;