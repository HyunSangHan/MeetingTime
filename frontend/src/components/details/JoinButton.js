import React, { Component, Fragment } from 'react';
import '../../css/Initpage.scss'; //부모컴포넌트의CSS(SCSS)
import '../../css/Waiting.scss'; //부모컴포넌트의CSS(SCSS)
import '../../App.css'; //공통CSS
import * as joinActions from '../../modules/join';
import { Link  } from 'react-router-dom';
import CountDown from './CountDown';

class JoinButton extends Component {

    render() {
        const { is_joined_already, is_login_already, joined_user, current_meeting, isMadeTeam } = this.props;
        const openTime = Date.parse(current_meeting.open_time)
        const closeTime = Date.parse(current_meeting.close_time)
        // const meetingTime = Date.parse(current_meeting.meeting_time)
        const nowTime = new Date().getTime()
        let hardCode = null;
        let button = null;
        hardCode = this.props.hardCode
        if (hardCode) {
            button =
            <div>
                <div className="mb-2 font-15 font-grey font-notosan">
                    <CountDown
                        time={closeTime}
                    />
                </div>                
                    <div className="join-button-wrap bg-color-waiting mh-auto flex-center">
                        <div className="font-notosan">
                            입장대기중
                        </div>
                    </div>
            </div>;
            } else {
            if (is_login_already) {
                if (nowTime < openTime) {
                    button =
                    <div>
                        <div className="mb-2 font-15 font-grey font-notosan">
                            <CountDown
                                time={openTime}
                            />
                        </div>                
                        <div className="join-button-wrap bg-color-waiting mh-auto flex-center">
                            <div className="font-notosan">
                                오픈 준비중
                            </div>
                        </div>
                    </div>;
                } else if (openTime <= nowTime && nowTime <= closeTime) {
                    if (is_joined_already) {
                        if (isMadeTeam) {
                            button = 
                            <div>
                                <div className="mb-2 font-15 font-grey font-notosan">
                                    <CountDown
                                        time={closeTime}
                                    />
                                </div>
                                    <Link to="/waiting0" style={{ textDecoration: 'none' }}>
                                    <div className="join-button-wrap bg-color-join mh-auto flex-center">
                                        <div className="font-notosan">
                                            번호표 뽑기
                                        </div>
                                    </div>
                                </Link>
                            </div>;
                        } else {
                            button =
                            <div>
                                <div className="mb-2 font-15 font-grey font-notosan">
                                    <CountDown
                                        time={closeTime}
                                    />
                                </div>                
                                <div className="join-button-wrap bg-color-waiting mh-auto flex-center">
                                    <div className="font-notosan">
                                        입장대기중
                                    </div>
                                </div>
                            </div>;
                        }
                    } else {
                        if (isMadeTeam) {
                            button = 
                            <div>
                                <div className="mb-2 font-15 font-grey font-notosan">
                                    <CountDown
                                        time={closeTime}
                                    />
                                </div>
                                <Link to="/waiting0" style={{ textDecoration: 'none' }}>
                                    <div className="join-button-wrap bg-color-join mh-auto flex-center">                                    <div className="font-notosan">
                                            번호표 뽑기
                                        </div>
                                    </div>
                                </Link>
                            </div>;    
                        } else {
                            button = 
                            <div>
                                <div className="mb-2 font-15 font-grey font-notosan">
                                    <CountDown
                                        time={closeTime}
                                    />
                                </div>
                                <Link to="/team_profile" style={{ textDecoration: 'none' }} onClick={()=>alert('그룹을 생성하셔야 번호표를 뽑으실 수 있어요!')}>
                                    <div className="join-button-wrap bg-color-fail mh-auto flex-center">
                                        <div className="font-notosan">
                                            번호표 뽑기
                                        </div>
                                    </div>
                                </Link>
                            </div>;    
                        }
                    }
                } else {
                    if ( is_joined_already && joined_user.rank <= current_meeting.cutline && joined_user.rank != null) {
                        //for winner
                        button = 
                        <div>
                            <div className="mb-2 font-15 font-purple font-notosan">
                                축하합니다! 커트라인을 넘었습니다!
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
                            <div className="join-button-wrap bg-color-fail mh-auto flex-center" onClick={()=>alert('테스트페이지라 서버와의 연결을 끊어두었습니다.')}>
                                <div className="font-notosan" >
                                    다음 미팅 오픈 알림받기
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
                <div className="join-button-wrap bg-color-fail mh-auto flex-center">
                    <div className="font-notosan">
                        이번주 미팅상대 찾기
                    </div>
                </div>;
            }
        }
        return (
            <Fragment>
                { button }
            </Fragment>
        );
    }
}

export default JoinButton;