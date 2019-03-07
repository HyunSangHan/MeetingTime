import React, { Component } from 'react';
import '../css/Body.css';
import '../App.css';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input} from 'reactstrap';
import Footer from "./Footer";
import { Link } from 'react-router-dom';
import SignUp from "./SignUp";

class Initpage extends Component {
    render() {
        return (
            <div className={"frame flex-center bg-main-color"}>
                <Container className={"font-white"}>
                    <Row>
                        <Col>
                            <div className={"App font-big mb-3"}><b>Meeting Time</b></div>
                            <Form>
                                <FormGroup>
                                    <Label for="email">ID(이메일주소)</Label>
                                    <Input type="email" name="email" id="email" placeholder="Email Address" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="password">비밀번호</Label>
                                    <Input type="password" name="password" id="password" placeholder="Password" />
                                </FormGroup>
                                <Button color="danger" className={"mt-1"}>로그인하기</Button>
                            </Form>
                        </Col>
                    </Row>
                    <Row>
                        <Col className={"App mt-4 font-2 deco-none"}>
                            <Link to={"./sign_up"}>
                                <u className={"font-white"}>설마, 아직도 회원이 아니신가요?</u>
                            </Link>
                        </Col>
                    </Row>
                </Container>
                <Footer/>
            </div>
        );
    }
}

export default Initpage;