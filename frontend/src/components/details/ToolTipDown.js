import React, { Component } from "react"
import "../../css/Reuse.scss" //도구성컴포넌트의CSS(SCSS)
import "../../App.css" //공통CSS

class ToolTipDown extends Component {
    render() {
        const content = this.props.content || "";
        return (
            <div className="tool-tip-down font-14 font-jua font-purple">
                <div className="up-text-area">
                    { content }
                </div>
                <div className="flex-center">
                    <div>
                        <div className="down-triangle-part"/>
                        <div className="down-white-triangle-part"/>
                    </div>
                </div>
            </div>
        );
    }
}

export default ToolTipDown
