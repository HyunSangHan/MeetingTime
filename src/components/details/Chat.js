import React, { Component } from 'react';
import '../../css/Body.css';
import '../../App.css';
import { Container, Row, Col } from 'reactstrap';
import Header from "../Header";
import Footer from "./../Footer";
import MaterialIcon from 'material-icons-react';

class Chat extends Component {

    render() {
        return (
            <div className={"App"}>
                <Header title="지난 대화"/>
                <div className="offset-down">
                    <Container>
                        <Row className={"flex-center font-2"}>
                            <Col>
                               <div className={"chat-box flex-center mt-3"}>
                                   <Col xs={3}>
                                       <div className={"img-your-circle"}>
                                       </div>
                                   </Col>
                                   <Col xs={7} className={"align-left"}>
                                       <div className={"font-3 ml-1"}>
                                          {this.props.ex_user.nickname}
                                       </div>
                                       <div className={"font-1 font-grey mt-1 ml-1"}>
                                           {this.props.ex_user.company}
                                       </div>
                                   </Col>
                                   <Col xs={2} className={"h17vh flex-j-start"}>
                                       <MaterialIcon icon="arrow_forward_ios" size="23x" color="#f0f0f0"/>
                                   </Col>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default Chat;