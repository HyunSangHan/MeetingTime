import React, { Component } from 'react';
import '../../css/Body.css';
import '../../App.css';
import { Container, Row, Col } from 'reactstrap';
import Header from "../Header";

class Profile extends Component {

    render() {
        return (
            <div className={"App"}>
                <Header/>
                <div className="offset-down">
                    <div className="up-bg flex-center">
                        <Container>
                            <Row>
                                dffff
                            </Row>
                        </Container>
                    </div>
                    <div className="down-bg flex-center">
                        <Container>
                            <Row>
                                dd
                            </Row>
                        </Container>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;