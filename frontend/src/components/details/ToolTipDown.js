import React, { Component } from 'react';
import '../../css/Reuse.scss'; //도구성컴포넌트의CSS(SCSS)
import '../../App.css'; //공통CSS

class ToolTipDown extends Component {
    render() {
        return (
            <div className={"App"}>
                <div className="tool-tip-up">
                    <div className="down-text-area">
                        여기가 툴팁DOWN!
                    </div>
                    <div className="down-white-triangle-part"/>
                    <div className="down-triangle-part"/>
                </div>
            </div>
        );
    }
}

export default ToolTipDown;