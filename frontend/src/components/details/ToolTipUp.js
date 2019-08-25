import React, { Component } from 'react';
import '../../css/Reuse.scss'; //도구성컴포넌트의CSS(SCSS)
import '../../App.css'; //공통CSS


class ToolTipUp extends Component {
    render() {
        return (
            <div className="tool-tip-up">
                <div className="up-triangle-part"></div>
                <div className="up-white-triangle-part"></div>
                <div className="up-text-area">
                    여기가 툴팁UP!
                </div>
            </div>
        );
    }
}

export default ToolTipUp;