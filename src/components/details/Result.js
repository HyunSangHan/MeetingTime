import React, { Component } from 'react';
import '../../css/Body.css';
import '../../App.css';
import { Container, Row, Col } from 'reactstrap';

class Result extends Component {

    render() {
        return (
            <div className={"App"}>
                <Container>
                    <Row>
                        <Col>
                            <div className={"App"}>
                                개발 필요
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Result;