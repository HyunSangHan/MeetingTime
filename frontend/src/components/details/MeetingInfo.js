import React, { Component } from "react"
import "../../css/Initpage.scss" //부모컴포넌트의CSS(SCSS)
import "../../css/Waiting.scss" //부모컴포넌트의CSS(SCSS)
import "../../App.css" //공통CSS

class MeetingInfo extends Component {
  getInputDayLabel = time => {
    const week = [
      "일요일",
      "월요일",
      "화요일",
      "수요일",
      "목요일",
      "금요일",
      "토요일"
    ]
    const today = time.getDay()
    const todayLabel = week[today]
    return todayLabel
  }

  getDateGap = time => {
    const nowTime = new Date()
    const nowDate = new Date(
      nowTime.getFullYear(),
      nowTime.getMonth(),
      nowTime.getDate(),
      0,
      0,
      0,
      0
    )
    const targetDate = new Date(
      time.getFullYear(),
      time.getMonth(),
      time.getDate(),
      0,
      0,
      0,
      0
    )
    const gap = Math.floor((nowDate - targetDate) / (1000 * 60 * 60 * 24))
    if (gap < 0) {
      return gap
    } else if (gap === 0) {
      return "-day"
    } else {
      return "+" + gap
    }
  }

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
          <div className="d-day mh-auto flex-center mb-3">
            {/* 디데이 */}
            <div className="font-jua font-white font-18 mt-1">
              {/* 디데이 */}D{this.getDateGap(meetingTime)}
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
            {meetingTime.getDate()}일 {this.getInputDayLabel(meetingTime)}
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
