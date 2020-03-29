import React, { Component, Fragment } from "react"
import "../../css/Initpage.scss" //부모컴포넌트의CSS(SCSS)
import "../../css/Waiting.scss" //부모컴포넌트의CSS(SCSS)
import "../../App.css" //공통CSS
import { Link } from "react-router-dom"
import CountDown from "./CountDown"
import { isEmpty } from "../../modules/utils"

class JoinButton extends Component {
  componentDidMount() {
    const { getJoinedUser } = this.props
    getJoinedUser()
  }

  handleJoin = () => {
    const { createJoinedUser } = this.props
    createJoinedUser()
    window.location.reload()
  }

  render() {
    const {
      isJoinedAlready,
      isLoginAlready,
      joinedUser,
      currentMeeting,
      isMadeTeam
    } = this.props
    const openTime = Date.parse(currentMeeting.openTime)
    const closeTime = Date.parse(currentMeeting.closeTime)
    // const meetingTime = Date.parse(currentMeeting.meetingTime)
    const nowTime = new Date().getTime()
    let button = null
    if (isLoginAlready) {
      if (nowTime < openTime) {
        button = (
          <div>
            <div className="mb-2 font-15 font-grey font-notosan">
              <CountDown time={openTime} />
            </div>
            <div className="join-button-wrap bg-color-waiting mh-auto flex-center">
              <div className="font-notosan">오픈 준비중</div>
            </div>
          </div>
        )
      } else if (openTime <= nowTime && nowTime <= closeTime) {
        if (isJoinedAlready) {
          button = (
            <div>
              <div className="mb-2 font-15 font-grey font-notosan">
                <CountDown time={closeTime} />
              </div>
              <div className="join-button-wrap bg-color-waiting mh-auto flex-center">
                <div className="font-notosan">입장대기중</div>
              </div>
            </div>
          )
        } else {
          if (isMadeTeam) {
            button = (
              <div>
                <div className="mb-2 font-15 font-grey font-notosan">
                  <CountDown time={closeTime} />
                </div>
                <div
                  className="join-button-wrap bg-color-join mh-auto flex-center"
                  onClick={this.handleJoin}
                >
                  <div className="font-notosan">번호표 뽑기</div>
                </div>
              </div>
            )
          } else {
            button = (
              <div>
                <div className="mb-2 font-15 font-grey font-notosan">
                  <CountDown time={closeTime} />
                </div>
                <div className="join-button-wrap bg-color-fail mh-auto flex-center">
                  <div className="font-notosan">번호표 뽑기</div>
                </div>
              </div>
            )
          }
        }
      } else {
        if (
          isJoinedAlready &&
          joinedUser.rank <= currentMeeting.cutline &&
          !isEmpty(joinedUser.rank) &&
          nowTime > closeTime
        ) {
          //for winner
          button = (
            <div>
              <div className="mb-2 font-15 font-purple font-notosan">
                축하합니다! 커트라인을 넘었습니다!
              </div>
              <div className="join-button-wrap bg-color-join mh-auto flex-center">
                <Link
                  to="/matching"
                  style={{ textDecoration: "none", color: "inherit" }}
                  className="flex-center w-100 h-100"
                >
                  <div className="font-notosan">입장하기</div>
                </Link>
              </div>
            </div>
          )
        } else if (
          isJoinedAlready &&
          joinedUser.rank > currentMeeting.cutline &&
          !isEmpty(joinedUser.rank) &&
          nowTime > closeTime
        ) {
          // 나중에는 다음 미팅 알림받기로 변경
          button = (
            <div>
              <div className="mb-2 font-15 font-grey font-notosan">
                안타깝지만 선착순에 들지 못했어요ㅠㅠ
              </div>
              <div className="join-button-wrap bg-color-fail mh-auto flex-center">
                <div className="font-notosan">입장불가</div>
              </div>
            </div>
          )
        } else {
          button = (
            <div>
              <div className="mb-2 font-15 font-grey font-notosan">
                이번 미팅은 이미 매칭이 진행중이에요ㅠㅠ
              </div>
              <div className="join-button-wrap bg-color-fail mh-auto flex-center">
                <div className="font-notosan">다음 미팅을 기다려주세요</div>
              </div>
            </div>
          )
        }
      }
    } else {
      button = (
        <div className="join-button-wrap bg-color-fail mh-auto flex-center">
          <div className="font-notosan">이번주 미팅상대 찾기</div>
        </div>
      )
    }

    return <Fragment>{button}</Fragment>
  }
}

export default JoinButton
