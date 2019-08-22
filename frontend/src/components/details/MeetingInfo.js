import React, { Component } from 'react';
import '../../css/Initpage.scss'; //부모컴포넌트의CSS(SCSS)
import '../../css/Waiting.scss'; //부모컴포넌트의CSS(SCSS)
import '../../App.css'; //공통CSS
import MakeTeamButton from './MakeTeamButton';
import { Link } from 'react-router-dom'; //다른 페이지로 링크 걸 때 필요

class MeetingInfo extends Component {

    // constructor(props){
    //     super(props);
    // }

    // componentDidMount(){
    // }

    render() {
        const { current_meeting } = this.props;
        return (
            <div className={"meeting-info-container mh-auto"}>
                <div className="bg-circle left"> {/* 왼쪽원 */}</div>
                <div className="bg-circle right"> {/* 오른쪽원 */}</div>
                <div className="meeting-info-content">{/* 글 영역 껍데기 */}
                <div className="hr-container">
                    <hr/>
                </div>
                    <div className="d-day mh-auto flex-center mb-3">{/* 디데이 */}
                        <div className="font-jua font-white font-18 mt-1">{/* 디데이 */}
                            D-3 {/* TODO: 데이터 넣어야함 */}
                        </div>
                    </div>
                    <div className="font-jua font-30 mb-1">{/* 디스크립션 */}
                        { current_meeting.description } in { current_meeting.location }
                    </div>
                    <div className="font-notosan font-grey font-15 mb-1">{/* 일시 */}
                        <strong>일시 </strong>{'\u00A0'}2019년 8월 31일 금요일 {/* TODO: 데이터 넣어야함 */}
                    </div>
                    <div>
                        <div className="font-notosan font-grey font-15">{/* 장소 */}
                            <strong>장소 </strong>{'\u00A0'}{ current_meeting.location} 근처 어딘가
                        </div>
                    </div>
                </div>
                {this.props.makeTeamButton}
            </div>
        );
    }
}

export default MeetingInfo;