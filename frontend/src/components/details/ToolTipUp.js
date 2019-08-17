import React, { Component } from 'react';
import '../../css/Reuse.scss'; //도구성컴포넌트의CSS(SCSS)
import '../../App.css'; //공통CSS


class ToolTipUp extends Component {

    // constructor(props){
    //     super(props);
    // }

    // componentDidMount(){
    // }

    render() {
        // const { } = this.props;
        // 문서객체에 대한 필요한 분기는 여기서 미리 처리하기

        return (
            <div className={"App"}>
                <div className="cont">
                    <h1>tooltip입니다.</h1>
                </div>
            </div>
        );
    }
}

export default ToolTipUp;