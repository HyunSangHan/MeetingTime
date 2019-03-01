import React, { Component } from 'react';
import '../../css/Body.css';
import '../../App.css';
import { Container, Row, Col } from 'reactstrap';
import Header from "./Header";

class Profile extends Component {

    render() {
        return (
            <div className={"App"}>
                <Header/>
                <div className="offset-down">
                    <Container>
                        <Row>
                            <div>프로필 개발 필요</div>
                        </Row>
                    </Container>
                </div>
            </div>
        );
    }
}

export default Profile;