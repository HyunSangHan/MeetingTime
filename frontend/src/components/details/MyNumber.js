import React, { Component } from 'react';
import '../../css/Waiting.scss'; //부모컴포넌트의CSS(SCSS)
import '../../App.css'; //공통CSS

class MyNumber extends Component {
    render() {
        return (
            <div className="number-info-container pt-36 mb--36">
                <div className="font-18 font-bold font-notosan">
                    선착순 번호
                </div>
                <div className="font-80 font-jua mt--1 mb--2">
                    {this.props.rank}
                </div>
            </div>
        );
    }
}

export default MyNumber;