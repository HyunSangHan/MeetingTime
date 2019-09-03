import React, { Component } from 'react';
import '../../css/Waiting.scss'; //부모컴포넌트의CSS(SCSS)
import '../../App.css'; //공통CSS
import { Link } from 'react-router-dom'; //다른 페이지로 링크 걸 때 필요

class ResultNumber extends Component {

    render() {
        const { cutline, rank} = this.props;
        // 문서객체에 대한 필요한 분기는 여기서 미리 처리하기

        let judgment = "|";
        if (cutline > rank) {
            judgment = ">"
        } else if (cutline < rank) {
            judgment = "<"
        } else {
            judgment = ">="
        }

        return (
            <div className="number-info-container pt-36 mb--16 flex">
                <div className="w47percent">
                    <div className="font-18 font-bold font-notosan">
                        커트라인
                    </div>
                    <div className="font-64 font-jua mt--1 mb--2">
                        { cutline }
                    </div>
                </div>
                <div className="w6percent font-20 font-jua mt-6">
                    { judgment }
                </div>
                <div className="w47percent">
                    <div className="font-18 font-bold font-notosan">
                        나의순번
                    </div>
                    <div className="font-purple font-64 font-jua mt--1 mb--2">
                        { rank }
                    </div>
                </div>
            </div>
        );
    }
}

export default ResultNumber;