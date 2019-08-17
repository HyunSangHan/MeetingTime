import React, { Component, Fragment } from 'react';
import '../css/Body.css';
import '../App.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './../modules/email';

class Email extends Component {


    constructor(props){
        super(props);

        this.state = {
            emailId: "",
            companyEmail: "@naver.com",
            code: "",
        };
    };

    handleCompanyChange(e) {
        this.setState({
			companyEmail: e.target.value
		});
    }

    onSend() {
        const { Actions } = this.props;
        const { emailId, companyEmail } = this.state;
        Actions.sendEmail({
            email: emailId + companyEmail
        })
    }

    onValidate() {
        const { Actions } = this.props;
        const { code } = this.state;
        Actions.validateEmail({
            code: code
        })
    }

    render() {
        const { companyEmail } = this.state;
        if (!this.props.sent) {
            return (
                <Fragment>
                    <input onChange={(e)=> {this.setState({emailId: e.target.value})}}></input>
                    <select value={companyEmail} onChange={this.handleCompanyChange.bind(this)}>
                        <option value="@naver.com">네이버</option>
                        <option value="@samsung.com">삼성</option>
                        <option value="@likelion.org">멋쟁이사자처럼</option>
                        <option value="@google.com">구글</option>
                    </select>
                    <button type="submit" onClick={e => this.onSend(e)}>전송</button>
                </Fragment>
            )
        }
        else {
            return (
                <Fragment>
                    <input onChange={(e)=> {this.setState({code: e.target.value})}}></input>
                    <button type="submit" onClick={e => this.onValidate(e)}>검사</button>
                    {this.props.validated ?
                        (<div>인증되었습니다</div>)
                        : (<div>인증되지 않았습니다</div>)
                    }
                </Fragment>
            )
        }
    }
}


const mapDispatchToProps = (dispatch) => ({
    dispatch,
    Actions: bindActionCreators(actions, dispatch),
});

const mapStateToProps = (state) => ({
    sent: state.email.get('sent'),
    validated: state.email.get('validated'),
})

export default connect(mapStateToProps, mapDispatchToProps)(Email);