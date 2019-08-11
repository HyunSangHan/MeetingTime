import React, { Component } from 'react';
import '../css/Body.css';
import '../App.css';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input} from 'reactstrap';
import Footer from "./Footer";
import { Link } from 'react-router-dom';
import axios from 'axios';

class Initpage extends Component {


    constructor(props){
        super(props);
    }
    componentDidMount(){
        try {
            window.Kakao.init(process.env.REACT_APP_KAKAO_JAVSCRIPT_SDK_KEY);            
        } catch (error) {
            console.log(error);
        }
        // 카카오 로그인 버튼을 생성
        window.Kakao.Auth.createLoginButton({
            container: '#kakao-login-btn',
            success: function(authObj) {
                // 로그인 성공시, 장고의 KAKAO Login API를 호출함
                axios.post("/rest-auth/kakao/", {
                    access_token: authObj.access_token,
                    code: process.env.REACT_APP_KAKAO_REST_API_KEY
                })
                .then( response => {
                    axios.get("/profile")
                    .then(response => {
                        console.log("[로그인성공] " + response.data.user.username + "(회사:" + response.data.company.name + ")")
                        window.location.reload();
                    })
                    .catch(err => console.log(err));
                })
                .catch( err => {
                    console.log(err);
                });

            },
            fail: function(err) {
                alert(JSON.stringify(err));
                console.log(err);
            }
        });
    }

    render() {
        return (
            <div className={"pc-none frame flex-center bg-main-color"}>
                <Container className={"font-white"}>
                    <Row>
                        <Col>
                            <div className="App font-big mb-3"><b>Meeting Time</b></div>
                            <div className="App"><a id="kakao-login-btn"></a></div>
                        </Col>
                    </Row>
                </Container>
                <Footer/>
            </div>
        );
    }
}

export default Initpage;