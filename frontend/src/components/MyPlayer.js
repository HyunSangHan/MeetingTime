import React, { Component } from "react";
import "../css/info_styles.scss";

class MyPlayer extends Component {

    constructor(props) {
        super(props);

    }

        
    render(){
        console.log(this.props);
        return (
            <h2>나의 프로필 정보 임돠.</h2>
        )
    }

};

export default MyPlayer;