import React, { Component, Fragment } from "react"
import "../../css/Profile.scss" //부모컴포넌트의CSS(SCSS)
import "../../App.css" //공통CSS
import classNames from "classnames"

class TwoTab extends Component {
  render() {
    const { newTabOn, prevTabOn, clickedTab } = this.props
    return (
      <Fragment>
        <div className="tab-wrap">
          <div className="tab-content">
            <div
              className={classNames(
                "change-link font-notosan",
                clickedTab === "new" ? "active" : ""
              )}
              onClick={newTabOn}
            >
              새로운 그룹
            </div>
            <div
              className={classNames(
                "change-link font-notosan",
                clickedTab === "prev" ? "active" : ""
              )}
              onClick={prevTabOn}
            >
              지난번 그룹
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default TwoTab
