import React, { Component } from 'react';
import '../../css/Body.css';
import '../../App.css';
import { Container, Row, Col } from 'reactstrap';
import Footer from "../Footer";
import { Link } from 'react-router-dom';
import Header from "../Header";

class Result extends Component {

    render() {
        return (
            <div className="App">
                <Header title="이번주 매칭 상대"/>
                <div className="offset-down offset-down-same">
                    <div className="img-max-width margin-auto result-img">
                        <img src={this.props.ex_user.img_url} className="w-100" alt="counter-img" />
                    </div>

                    <Container>
                    <Row>
                        <Col>
                            <div>
                                <div className="mt-4 font-4">
                                    <strong>{this.props.ex_user.nickname}</strong>
                                </div>
                                <div className="mt-2 font-1">
                                    {this.props.ex_user.team_detail}
                                </div>
                                <div className="mid-button-red margin-auto flex-center font-2 font-white">
                                    대화하기
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
                </div>
            </div>
        );
    }
}

export default Result;