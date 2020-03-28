import React, { Component, Fragment } from "react"
import "../../css/Reuse.scss" //도구성컴포넌트의CSS(SCSS)
import "../../App.css" //공통CSS
import { getTimeNotification } from "../../modules/utils"

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

  render() {
    const { gapSecondTotal } = this.state

    return (
      <Fragment>
        {gapSecondTotal > 0 && getTimeNotification(gapSecondTotal)}
      </Fragment>
    )
  }
}

export default CountDown
