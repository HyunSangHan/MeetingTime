import React, { Component } from 'react';
import '../css/Body.css';
import '../App.css';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText, CustomInput } from 'reactstrap';
import Header from "./Header";
import FooterScrollable from "./FooterScrollable";

class SignUp extends Component {

    render() {
        return (
            <div>
                <Header title="회원가입"/>
                <Container className={"offset-down"}>
                    <Row>
                        <Col>
                            <div className={"mt-4"}>
                                <Form>
                                    <div className={"font-3 mb-3"}><b>로그인 기본 정보 (필수)</b></div>
                                    <FormGroup>
                                        <Label for="email">이메일주소</Label>
                                        <Input type="email" name="email" id="email" placeholder="이메일주소 입력" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="password">비밀번호</Label>
                                        <Input type="password" name="password" id="password" placeholder="비밀번호 입력" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="password_confirm">비밀번호 확인</Label>
                                        <Input type="password" name="password_confirm" id="password_confirm" placeholder="비밀번호 재입력" />
                                    </FormGroup>
                                    <div className={"font-3 mt-5 mb-3"}><b>미팅 정보 (필수)</b></div>
                                    <FormGroup tag="fieldset">
                                        <Label for="gender">성별</Label>
                                        <FormGroup check>
                                            <Label check>
                                                <Input type="radio" name="gender" />{' '}
                                                여성
                                            </Label>
                                        </FormGroup>
                                        <FormGroup check>
                                            <Label check>
                                                <Input type="radio" name="gender" />{' '}
                                                남성
                                            </Label>
                                        </FormGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="img">사진 첨부</Label>
                                        <CustomInput className={"base-box"} type="file" name="img" id="img" />
                                        <FormText color="muted">
                                            가로와 세로 길이가 같은 정방형 사진을 업로드해주세요.<br/>
                                            팀 전체 얼굴이 잘 보이는 사진을 올려주세요.
                                        </FormText>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="nickname">닉네임</Label>
                                        <Input type="text" name="nickname" id="nickname" placeholder="상대방에게 보여질 닉네임 입력" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="phone">휴대폰 번호</Label>
                                        <Input type="text" name="phone" id="phone" placeholder="ex) 010-0000-0000" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="company">직장명</Label>
                                        <Input type="select" name="company" id="company">
                                            <option>- select -</option>
                                            <option>삼성전자</option>
                                            <option>SK계열</option>
                                            <option>현대자동차</option>
                                            <option>네이버</option>
                                            <option>카카오</option>
                                        </Input>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="location">선호지역</Label>
                                        <Input type="select" name="location" id="location">
                                            <option>- select -</option>
                                            <option>강남</option>
                                            <option>홍대</option>
                                            <option>이태원</option>
                                            {/*추가 필요*/}
                                        </Input>
                                    </FormGroup>

                                    <FormGroup>
                                        <Label for="team_detail">팀 소개</Label>
                                        <Input type="textarea" name="team_detail" id="team_detail" />
                                    </FormGroup>
                                    <div className={"font-3 mt-5 mb-3"}>
                                        <b>추천인이 있으신가요? (선택)</b>
                                    </div>
                                    <FormGroup>
                                        <Label for="code">추천인코드</Label>
                                        <Input type="text" name="code" id="code" placeholder="ex) DKADMF252MDK3" />
                                    </FormGroup>
                                    <Button className={"mt-2"}>가입하기</Button>
                                </Form>

                            </div>
                        </Col>
                    </Row>
                    <FooterScrollable/>
                </Container>
            </div>
        );
    }
}

export default SignUp;