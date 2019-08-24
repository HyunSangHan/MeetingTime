import React, { Component } from 'react';
import '../../css/Reuse.scss'; //도구성컴포넌트의CSS(SCSS)
import '../../App.css'; //공통CSS
import { Link } from 'react-router-dom'; //다른 페이지로 링크 걸 때 필요

class CountDown extends Component {

    constructor(props){
        super(props);
        const nowTime = new Date()
        const targetTime = this.props.time
        const gapSecondTotal = Math.floor((targetTime - nowTime.getTime()) / 1000)
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

    // timeNotification = (seconds) => () => {
    // }
    a = function timeNotification() {

    }

    render() {
        const { gapSecondTotal } = this.state;

        let gapDatePart = parseInt(gapSecondTotal / (60 * 60 * 24));
        let gapHourPart = parseInt((gapSecondTotal - gapDatePart * 60 * 60 * 24) / (60 * 60));
        let gapMinutePart = parseInt((gapSecondTotal - gapDatePart * 60 * 60 * 24 - gapHourPart * 60 * 60) / 60);
        let gapSecondPart = gapSecondTotal - gapDatePart * 60 * 60 * 24 - gapHourPart * 60 * 60 - gapMinutePart * 60;

        if (gapHourPart < 10 && gapDatePart !== 0) {
            gapHourPart = "0" + gapHourPart
        }

        if (gapMinutePart < 10) {
            gapMinutePart = "0" + gapMinutePart
        }

        if (gapSecondPart < 10) {
            gapSecondPart = "0" + gapSecondPart
        }

        let notification;
        if (gapDatePart < 1) {
            notification = gapHourPart+":"+gapMinutePart+":"+gapSecondPart
        } else {
            notification = gapDatePart+"일 "+gapHourPart+":"+gapMinutePart+":"+gapSecondPart
        }

        return (
            <span className={"ml-1"}>
                {notification}
            </span>
        );
    }
}

export default CountDown;