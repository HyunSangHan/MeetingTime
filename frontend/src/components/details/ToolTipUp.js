import React, { Component } from "react"
import "../../css/Reuse.scss" //도구성컴포넌트의CSS(SCSS)
import "../../App.css" //공통CSS

class ToolTipUp extends Component {
  render() {
    const content = this.props.content || ""
    return (
      <div className="tool-tip-up font-14 font-jua font-purple">
        <div className="flex-center">
          <div>
            <div className="up-triangle-part" />
            <div className="up-white-triangle-part" />
          </div>
        </div>
        <div className="up-text-area">{content}</div>
      </div>
    )
  }
}

export default ToolTipUp
