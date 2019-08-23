import React, { Component } from 'react';
import '../../css/Reuse.scss'; //도구성컴포넌트의CSS(SCSS)
import '../../App.css'; //공통CSS
import { Link } from 'react-router-dom'; //다른 페이지로 링크 걸 때 필요

class CountDown extends Component {

    // constructor(props){
    //     super(props);
    // }

    // componentDidMount(){
    // }

    render() {
        const { } = this.props;
        // 문서객체에 대한 필요한 분기는 여기서 미리 처리하기

        return (
            <div className={"App"}>
                {this.props.meetingTime}
                {/* UI 코드 들어갈 곳 */}
            </div>
        );
    }
}

export default CountDown;