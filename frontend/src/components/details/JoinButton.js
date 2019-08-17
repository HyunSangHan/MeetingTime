import React, { Component } from 'react';
import '../../css/Initpage.scss'; //부모컴포넌트의CSS(SCSS)
import '../../css/Waiting.scss'; //부모컴포넌트의CSS(SCSS)
import '../../App.css'; //공통CSS
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as joinActions from '../../modules/join';
import { Link } from 'react-router-dom';

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
        const openTime = Date.parse(current_meeting.open_time)
        const closeTime = Date.parse(current_meeting.close_time)
        const nowTime = new Date().getTime()
        let button = null;

        if (is_login_already) {
            if (nowTime < openTime) {
                button =
                <div>
                    <div className="mb-2 font-15 font-grey font-notosan">
                        남은 시간 32:05:25
                    </div>                
                    <div className="join-button-wrap bg-color-waiting mh-auto flex-center">
                        <div className="font-notosan">
                            오픈 준비중
                        </div>
                    </div>
                </div>;
            } else if (openTime <= nowTime && nowTime <= closeTime) {
                if (is_joined_already) {
                    // 추후 개발할 부분
                    button = <div className={"big-button-black flex-center font-2 font-white"}
                                onClick={JoinActions.reclickJoinedPopup}>
                                현재 순위: {joined_user.rank}위
                            </div>;
                } else {
                    button = 
                    <div className="join-button-wrap bg-color-join mh-auto flex-center">
                        <div className="font-notosan"
                            onClick={JoinActions.createJoinedPopup}>
                            번호표 뽑기
                        </div>
                    </div>;
                }
            } else {
                
                if (is_joined_already && joined_user.rank <= current_meeting.cutline) {
                    //for winner
                    button = <Link to="/matching">
                                <div className={"big-button-black flex-center font-2 font-white"}>
                                    커트라인:{current_meeting.cutline}명<br/>매칭 입장하기
                                </div>
                            </Link>;
                } else if (is_joined_already && joined_user.rank > current_meeting.cutline) {
                    //for loser
                    button = <div className={"big-button-black flex-center font-2 font-white"}>
                                커트라인:{current_meeting.cutline}명에<br/> 들지 못했어요
                            </div>;
                } else {
                    button = <div className={"big-button-black flex-center font-2 font-white"}>
                                다음 미팅을 기다려주세요
                            </div>;
                }

            }
        } else {
            button = 
            <div className="join-button-wrap bg-color-join mh-auto flex-center">
                <div className="font-notosan"
                    onClick={() => {window.alert('로그인이 필요한 서비스입니다.')}}>
                    번호표 뽑기
                </div>
            </div>;
        }

        return (
            <div>
                <div>
                    { button }
                </div>
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