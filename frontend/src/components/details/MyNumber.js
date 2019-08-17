import React, { Component } from 'react';
import '../../css/Waiting.scss'; //부모컴포넌트의CSS(SCSS)
import '../../App.css'; //공통CSS
import { Link } from 'react-router-dom'; //다른 페이지로 링크 걸 때 필요

class MyNumber extends Component {

    // constructor(props){
    //     super(props);
    // }

    // componentDidMount(){
    // }

    render() {
        const { } = this.props;
        // 문서객체에 대한 필요한 분기는 여기서 미리 처리하기

        return (
            <div className="number-info-container pt-36 mb--36">
                <div className="font-18 font-bold font-notosan">
                    선착순 번호
                </div>
                <div className="font-80 font-jua mt--1 mb--2">
                    036 {/* 데이터 들어가야 할 곳 */}
                </div>
            </div>
        );
    }
}

export default MyNumber;