import React, { Component, Fragment } from "react"
import "../../css/Reuse.scss" //도구성컴포넌트의CSS(SCSS)
import "../../App.css" //공통CSS

class CountDown extends Component {
  constructor(props) {
    super(props)
    const nowTime = new Date().getTime()
    const targetTime = this.props.time
    const gapSecondTotal = Math.floor((targetTime - nowTime) / 1000)
    this.state = {
      gapSecondTotal: gapSecondTotal
    }
    this.startTimer = this.startTimer.bind(this)
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
          gapSecondTotal: prevState.gapSecondTotal - 1
        })),
      1000
    )
    this.ifTimer = setInterval(() => {
      const { gapSecondTotal } = this.state
      if (gapSecondTotal <= 0) {
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

  timeNotification = seconds => {
    let gapDatePart = parseInt(seconds / (60 * 60 * 24))
    let gapHourPart = parseInt(
      (seconds - gapDatePart * 60 * 60 * 24) / (60 * 60)
    )
    let gapMinutePart = parseInt(
      (seconds - gapDatePart * 60 * 60 * 24 - gapHourPart * 60 * 60) / 60
    )
    let gapSecondPart =
      seconds -
      gapDatePart * 60 * 60 * 24 -
      gapHourPart * 60 * 60 -
      gapMinutePart * 60

    if (gapHourPart < 10 && gapDatePart !== 0) {
      gapHourPart = "0" + gapHourPart
    }

    if (gapMinutePart < 10) {
      gapMinutePart = "0" + gapMinutePart
    }

    if (gapSecondPart < 10) {
      gapSecondPart = "0" + gapSecondPart
    }

    if (gapDatePart < 1) {
      return (
        "남은시간 " + gapHourPart + ":" + gapMinutePart + ":" + gapSecondPart
      )
    } else {
      return (
        "남은시간 " +
        gapDatePart +
        "일 " +
        gapHourPart +
        ":" +
        gapMinutePart +
        ":" +
        gapSecondPart
      )
    }
  }

  render() {
    const { gapSecondTotal } = this.state

    return (
      <Fragment>
        {gapSecondTotal > 0 && this.timeNotification(gapSecondTotal)}
      </Fragment>
    )
  }
}

export default CountDown
