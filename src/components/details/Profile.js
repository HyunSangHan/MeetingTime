import React, { Component } from 'react';
import '../../css/Body.css';
import '../../App.css';
import { Container, Row, Col } from 'reactstrap';
import Header from "./../Header";
import FooterScrollable from "./../FooterScrollable";
import { Button, Form, FormGroup, Label, Input, FormText, CustomInput } from 'reactstrap';
import EditPW from "./EditPW";

class Profile extends Component {

    render() {
        return (
            <div>
                <Header title="팀 프로필 수정"/>
                <div className={"offset-down"}>
                    <Container>
                    <Row>
                        <Col>
                            <div className={"mt-4 flex-j-center"}>
                                <EditPW/>
                                <Form>
                                    <div>
                                    <div className={"font-3 mt-5 mb-3"}><b>미팅 정보 변경</b></div>
                                    <FormGroup>
                                        <Label for="img">프로필 사진</Label>
                                        <CustomInput className={"base-box"} type="file" name="img" id="img" />
                                        <FormText color="muted">
                                            가로가 더 긴 사진으로 업로드해주세요.<br/>
                                            팀 전체 얼굴이 잘 보이는 사진으로요.
                                        </FormText>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="nickname">닉네임</Label>
                                        <Input type="text" name="nickname" id="nickname" placeholder="여기는 props로 현재 닉네임을 미리 보여줄 부분임" />
                                    </FormGroup>
                                    </div>
                                    <div>
                                    <FormGroup>
                                        <Label for="company">직장명</Label>
                                        <Input type="select" name="company" id="company" required>
                                            <option disabled selected value>- select -</option>
                                            <option value="삼성전자">삼성전자</option>
                                            <option value="SK">SK</option>
                                            <option value="현대자동차">현대자동차</option>
                                            <option value="네이버">네이버</option>
                                            <option value="카카오">카카오</option>
                                            {/*추가 필요*/}
                                        </Input>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="location">선호지역</Label>
                                        <Input type="select" name="location" id="location" required>
                                            <option disabled selected value>- select -</option>
                                            <option value="강남">강남</option>
                                            <option value="홍대">홍대</option>
                                            <option value="이태원">이태원</option>
                                            {/*추가 필요*/}
                                        </Input>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="phone">대표 연락처</Label>
                                        <Input type="text" name="phone" id="phone" placeholder="여기는 props로 현재 전화번호를 미리 보여줄 부분임" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="team_detail">팀 소개</Label>
                                        <Input type="textarea" name="team_detail" id="team_detail" placeholder="여기는 props로 현재 팀소개를 미리 보여줄 부분임" />
                                    </FormGroup>
                                    </div>
                                    <Button>반영하기</Button>
                                </Form>
                                <div className={"App font-grey font-2 mt-2 hover deco-none"}>
                                    <u>로그아웃</u>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    </Container>
                        <FooterScrollable/>
                </div>
            </div>
        );
    }
}

export default Profile;