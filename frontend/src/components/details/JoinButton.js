import React, { Component } from 'react';
import '../../css/Body.css';
import '../../App.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as joinActions from '../../modules/join';
import { BrowserRouter, Route, Link } from 'react-router-dom';

class JoinButton extends Component {

    constructor(props){
        super(props);
    }

    componentDidMount(){
        const { JoinActions } = this.props;
        JoinActions.getJoinedUser();
        // console.log(Date(new Date().toLocaleString())) //테스트
        // console.log(new Date("2019-09-09T08:25:39+09:00")) //.getTime()??

        // console.log(new Date().getTime()) //테스트
        // console.log(Date.parse("2019-09-09T08:25:39+09:00"))


    }

    render() {
        const { JoinActions, is_joined_already, is_login_already, joined_user, current_meeting } = this.props;
        let button = null;
        const openTime = Date.parse(current_meeting.open_time)
        const closeTime = Date.parse(current_meeting.close_time)
        const nowTime = new Date().getTime()
        console.log(openTime)
        console.log(nowTime) 
        console.log(closeTime)

        if (is_login_already) {
            if (nowTime < openTime) {
                button = <div className={"big-button-black flex-center font-2 font-white"}>
                            오픈대기중
                        </div>;
            } else if (openTime <= nowTime && nowTime <= closeTime) {
                if (is_joined_already) {
                    button = <div className={"big-button-black flex-center font-2 font-white"}
                                onClick={JoinActions.reclickJoinedPopup}>
                                현재 순위: {joined_user.rank}위
                            </div>;
                } else {
                    button = <div className={"big-button-red flex-center font-2 font-white"}
                                onClick={JoinActions.createJoinedPopup}>
                                Join
                            </div>;
                }
            } else {
                button = <div className={"big-button-black flex-center font-2 font-white"}>
                            <Link to="/matching">커트라인 공개 / 매칭 입장하기</Link>
                        </div>;
                //커트라인 안에 들기 실패한 경우도 분기해야하
            }
        } else {
            button = <div className={"big-button-red flex-center font-2 font-white"}
                onClick={() => {window.alert('로그인이 필요한 서비스입니다.')}}>
                Join
            </div>;
        }

        return (
            <div className={"App"}>
                { button }
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    JoinActions: bindActionCreators(joinActions, dispatch),
});

const mapStateToProps = (state) => ({
    is_joined_popup_on: state.join.get('is_joined_popup_on'),
    is_joined_already: state.join.get('is_joined_already'),
    joined_user: state.join.get('joined_user'),
    current_meeting: state.current_meeting.get('current_meeting'),
})

export default connect(mapStateToProps, mapDispatchToProps)(JoinButton);