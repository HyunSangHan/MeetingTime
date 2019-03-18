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
                <div className="offset-down pc-none">
                    <Header title="지난 대화"/>
                </div>
                <div className={"font-05 font-grey opacity08 ml-3 mb-2 align-left"}>
                    지난 대화 {this.props.user.chat}개가 있습니다.
                </div>
                <div className="offset-down-mobile-only mt-1 mb-1">
                    <Container>
                        <div className={"flex-center font-2"}>
                               <div className={"chat-box flex-center"}>
                                   <Col xs={3}>
                                       <div className={"img-your-circle"}>
                                       </div>
                                   </Col>
                                   <Col xs={7} className={"align-left"}>
                                       <div className={"font-2 ml-1"}>
                                          {this.props.ex_user.nickname}
                                       </div>
                                       <div className={"font-05 font-grey mt-1 ml-1"}>
                                           {this.props.ex_user.company}
                                       </div>
                                   </Col>
                                   <Col xs={2} className={"h17vh flex-j-start"}>
                                       <MaterialIcon icon="arrow_forward_ios" size="23x" color="#f0f0f0"/>
                                   </Col>
                                </div>
                        </div>
                    </Container>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default Chat;