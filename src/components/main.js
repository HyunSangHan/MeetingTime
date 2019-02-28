import React, { Component } from 'react';
import '../css/body.css';
import '../App.css';
import { Grid, Row, Col } from 'react-bootstrap';

class main extends Component {
    render() {
        return (
            <div className="App offset-down">
                <div className={"App"}>
                <Grid>
                    <Row>
                        <Col xs={12} md={6}>
                            <div>
                                1 of 2
                            </div>
                        </Col>
                        <Col xs={12} md={6}>
                            <div>
                                2 of 2
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>1 of 3</Col>
                        <Col>2 of 3</Col>
                        <Col>3 of 3</Col>
                    </Row>
                </Grid>
                </div>
            </div>
        );
    }
}

export default main;