import React, { Component } from 'react';
import '../../css/Body.css';
import '../../App.css';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class EditPW extends Component {

    render() {
        return (
            <div>
                <Form>
                    <div className={"font-3 mb-3"}><b>비밀번호 변경</b></div>
                    <FormGroup>
                        <Label for="password">비밀번호</Label>
                        <Input type="password" name="password" id="password" placeholder="비밀번호 입력" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password_confirm">비밀번호 확인</Label>
                        <Input type="password" name="password_confirm" id="password_confirm" placeholder="비밀번호 재입력" />
                    </FormGroup>
                    <Button>반영하기</Button>
                </Form>
            </div>
        );
    }
}

export default EditPW;