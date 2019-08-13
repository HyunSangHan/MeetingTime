import React, { Component } from "react";
import "../css/info_styles.scss";

class CounterPlayer extends Component {

    constructor(props) {
        super(props);

    }


    render() {
        console.log(this.props);
        return (
            <h2>상대방 프로필 정보 입니다.</h2>
        )
    }

}

export default CounterPlayer;