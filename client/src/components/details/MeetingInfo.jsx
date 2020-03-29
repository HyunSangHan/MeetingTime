import React, { Component } from "react"
import "../../css/Initpage.scss" //부모컴포넌트의CSS(SCSS)
import "../../css/Waiting.scss" //부모컴포넌트의CSS(SCSS)
import "../../App.css" //공통CSS
import { getInputDayLabel, getDateGap } from "../../modules/utils"

class MeetingInfo extends Component {
  render() {
    const { currentMeeting } = this.props
    const meetingTime = new Date(currentMeeting.meetingTime)

    return (
      <div className={"meeting-info-container mh-auto"}>
        <div className="bg-circle left"> {/* 왼쪽원 */}</div>
        <div className="bg-circle right"> {/* 오른쪽원 */}</div>
        <div className="meeting-info-content">
          {/* 글 영역 껍데기 */}
          <div className="hr-container">
            <hr />
          </div>
          <div className="mh-auto flex-center mb-3">
            {/* 디데이 */}
            <div className="d-day flex-center font-jua font-white font-18 mt-1">
              {/* 디데이 */}D{getDateGap(meetingTime)}
            </div>
          </div>
          <div className="font-jua font-30 mb-1">
            {/* 디스크립션 */}
            {currentMeeting.description} in {currentMeeting.location}
          </div>
          <div className="font-notosan font-grey font-15 mb-1">
            {/* 일시 */}
            <strong>일시 </strong>
            {"\u00A0"}
            {meetingTime.getFullYear()}년 {meetingTime.getMonth() + 1}월{" "}
            {meetingTime.getDate()}일 {getInputDayLabel(meetingTime)}
          </div>
          <div>
            <div className="font-notosan font-grey font-15">
              {/* 장소 */}
              <strong>장소 </strong>
              {"\u00A0"}
              {currentMeeting.location} 근처 어딘가
            </div>
          </div>
        </div>
        {this.props.makeTeamButton}
      </div>
    )
  }
}

export default MeetingInfo
