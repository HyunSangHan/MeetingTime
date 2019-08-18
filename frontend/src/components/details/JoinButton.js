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
                        남은 시간 32:05:25 {/* TODO: 실제 데이터 넣어야함 */}
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
                    button =
                    <div>
                        <div className="mb-2 font-15 font-grey font-notosan">
                            남은 시간 32:05:25 {/* TODO: 실제 데이터 넣어야함 */}
                        </div>                
                        <div className="join-button-wrap bg-color-waiting mh-auto flex-center">
                            <div className="font-notosan"
                            onClick={JoinActions.reclickJoinedPopup}>
                                입장전
                            </div>
                        </div>
                    </div>;
                } else {
                    button = 
                    <div>
                        <div className="mb-2 font-15 font-grey font-notosan">
                            남은 시간 32:05:25 {/* TODO: 실제 데이터 넣어야함 */}
                        </div>      
                        <div className="join-button-wrap bg-color-join mh-auto flex-center">
                            <div className="font-notosan"
                                onClick={JoinActions.createJoinedPopup}>
                                번호표 뽑기
                            </div>
                        </div>
                    </div>;
                }
            } else {
                // else와 if를 뒤바꾸는게낫겠다
                if (is_joined_already && joined_user.rank <= current_meeting.cutline && joined_user.rank != null) {
                    console.log(joined_user.rank)
                    console.log(current_meeting.cutline)
                    //for winner
                    button = 
                    <div>
                        <div className="mb-2 font-15 font-purple font-notosan">
                            축하합니다! 선착순에 통과하였습니다!
                        </div>
                        <Link to="/matching" style={{ textDecoration: 'none' }}>
                            <div className="join-button-wrap bg-color-join mh-auto flex-center">
                                <div className="font-notosan">
                                입장하기
                                </div>
                            </div>
                        </Link>
                    </div>;
                } else if (is_joined_already && joined_user.rank > current_meeting.cutline && joined_user.rank != null) {
                    // 나중에는 다음 미팅 알림받기로 변경
                    button = 
                    <div>
                        <div className="mb-2 font-15 font-grey font-notosan">
                            안타깝지만 선착순에 들지 못했어요ㅠㅠ
                        </div>
                        <div className="join-button-wrap bg-color-fail mh-auto flex-center">
                            <div className="font-notosan">
                                입장불가
                            </div>
                        </div>
                    </div>;
                } else {
                    button = 
                    <div>
                        <div className="mb-2 font-15 font-grey font-notosan">
                            이번 미팅은 이미 매칭이 진행중이에요ㅠㅠ 
                        </div>
                        <div className="join-button-wrap bg-color-fail mh-auto flex-center">
                            <div className="font-notosan">
                                다음 미팅을 기다려주세요
                            </div>
                        </div>
                    </div>;
                }

            }
        } else {
            button = 
            <div className="join-button-wrap bg-color-join mh-auto flex-center">
                <div className="font-notosan"
                    onClick={() => {window.alert('로그인이 필요한 서비스입니다.')}}>
                    이번주 미팅상대 찾기
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