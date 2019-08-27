import React, { Component, Fragment } from 'react';
import '../../css/Reuse.scss'; //도구성컴포넌트의CSS(SCSS)
import '../../App.css'; //공통CSS

class CountDown extends Component {

    constructor(props){
        super(props);
        const nowTime = new Date().getTime()
        const targetTime = this.props.time
        const gapSecondTotal = Math.floor((targetTime - nowTime) / 1000)
        this.state = {
            gapSecondTotal : gapSecondTotal
        }
        this.startTimer = this.startTimer.bind(this);
    }

    componentDidMount() {
        this.startTimer();
    }

    startTimer() { 
        this.setState(prevState => ({
            time: prevState.time,
        }));
        this.timer = setInterval(() => this.setState(prevState => ({
            ...prevState,
            gapSecondTotal: prevState.gapSecondTotal - 1
        })), 1000);
        this.ifTimer = setInterval(() => {
            const { gapSecondTotal } = this.state;
            if (gapSecondTotal <= 0) {
                window.location.reload(); //리프레시
                clearInterval(this.timer, this.ifTimer);
            }
        }, 1000);
    }

    timeNotification = seconds => {
        const gapDatePart = parseInt(seconds / (60 * 60 * 24));
        const gapHourPart = parseInt((seconds - gapDatePart * 60 * 60 * 24) / (60 * 60));
        const gapMinutePart = parseInt((seconds - gapDatePart * 60 * 60 * 24 - gapHourPart * 60 * 60) / 60);
        const gapSecondPart = seconds - gapDatePart * 60 * 60 * 24 - gapHourPart * 60 * 60 - gapMinutePart * 60;

        if (gapHourPart < 10 && gapDatePart !== 0) {
            gapHourPart = "0" + gapHourPart
        }

        if (gapMinutePart < 10) {
            gapMinutePart = "0" + gapMinutePart
        }

        if (gapSecondPart < 10) {
            gapSecondPart = "0" + gapSecondPart
        }

        let notification = null;
        if (gapDatePart < 1) {
            notification = "남은시간 " + gapHourPart + ":" + gapMinutePart + ":" + gapSecondPart
        } else {
            notification = "남은시간 " + gapDatePart +"일 " + gapHourPart + ":" + gapMinutePart + ":" + gapSecondPart
        }
        return notification
    }

    render() {
        const { gapSecondTotal } = this.state;

        return (
            <Fragment>
                {gapSecondTotal > 0 &&
                    this.timeNotification(gapSecondTotal)
                }
            </Fragment>
        );
    }
}

export default CountDown;