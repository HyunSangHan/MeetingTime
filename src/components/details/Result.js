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
            <div className={"App"}>
                <Header title="이번주 매칭 상대"/>
                <div className={"offset-down"}>
                <Container>
                    <Row>
                        <Col>
                            <div className={"App"}>
                                <img src={this.props.ex_user.img_url} className="w-100" />
                            </div>
                            <div>
                                {this.props.ex_user.nickname}
                            </div>
                            <div>
                                {this.props.ex_user.team_detail}
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