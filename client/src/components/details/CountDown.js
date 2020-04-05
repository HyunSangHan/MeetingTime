import React, { Component, Fragment } from "react"
import "../../css/Reuse.scss" //도구성컴포넌트의CSS(SCSS)
import "../../App.css" //공통CSS
import { getTimeNotification } from "../../modules/utils"

class CountDown extends Component {
  constructor(props) {
    super(props)
    const nowTime = new Date().getTime()
    this.state = {
      targetTime: nowTime,
      nowTime: nowTime
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.time !== prevState.targetTime) {
      return {
        targetTime: nextProps.time
      }
    }
    return null
  }

  componentDidMount() {
    this.startTimer()
  }

  componentWillUnmount() {
    this.timer && clearInterval(this.timer)
  }

  startTimer = () => {
    this.timer = setInterval(() => {
      const { nowTime, targetTime } = this.state
      if (nowTime < targetTime) {
        this.setState({
          nowTime: new Date().getTime()
        })
      } else {
        clearInterval(this.timer)
        window.location.reload() // TODO: 추후 socket 활용하면 이부분은 삭제가능
      }
    }, 1000)
  }

  render() {
    const { targetTime, nowTime } = this.state
    const gapSecond = Math.floor((targetTime - nowTime) / 1000)

    return (
      <Fragment>{gapSecond > 0 && getTimeNotification(gapSecond)}</Fragment>
    )
  }
}

export default CountDown
