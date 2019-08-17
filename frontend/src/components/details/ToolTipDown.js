import React, { Component } from 'react';
import '../../css/Reuse.scss'; //도구성컴포넌트의CSS(SCSS)
import '../../App.css'; //공통CSS

class ToolTipDown extends Component {

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
                <div className="tool-tip-up">
                    <div className="down-text-area">
                        여기가 툴팁DOWN!
                    </div>
                    <div className="down-white-triangle-part"></div>
                    <div className="down-triangle-part"></div>
                </div>
                {/* UI 코드 들어갈 곳 */}
            </div>
        );
    }
}

export default ToolTipDown;