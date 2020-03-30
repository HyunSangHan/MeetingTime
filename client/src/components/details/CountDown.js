import React, { Component, Fragment } from "react"
import "../../css/Reuse.scss" //도구성컴포넌트의CSS(SCSS)
import "../../App.css" //공통CSS
import { getTimeNotification } from "../../modules/utils"

class CountDown extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gapSecond: 1
    }
    this.startTimer = this.startTimer.bind(this)
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const nowTime = new Date().getTime()
    const targetTime = nextProps.time
    const gapSecond = Math.floor((targetTime - nowTime) / 1000)

    return {
      gapSecond: gapSecond
    }
  }

  componentDidMount() {
    this.startTimer()
  }

  startTimer() {
    this.setState(prevState => ({
      time: prevState.time
    }))
    this.timer = setInterval(
      () =>
        this.setState(prevState => ({
          ...prevState,
          gapSecond: prevState.gapSecond - 1
        })),
      1000
    )
    this.ifTimer = setInterval(() => {
      const { gapSecond } = this.state
      if (gapSecond < 0) {
        window.location.reload() //리프레시
        this.timer && clearInterval(this.timer)
        this.ifTimer && clearInterval(this.ifTimer)
      }
    }, 1000)
  }
  componentWillUnmount() {
    this.timer && clearInterval(this.timer)
    this.ifTimer && clearInterval(this.ifTimer)
  }

  render() {
    const { gapSecond } = this.state

    return (
      <Fragment>{gapSecond > 0 && getTimeNotification(gapSecond)}</Fragment>
    )
  }
}

export default CountDown
