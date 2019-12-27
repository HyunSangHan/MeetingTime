import React, { Component } from "react"
import "../../css/Reuse.scss" //도구성컴포넌트의CSS(SCSS)
import "../../App.css" //공통CSS
import { Link, withRouter } from "react-router-dom" //다른 페이지로 링크 걸 때 필요
import MaterialIcon from "material-icons-react" //뒤로가기 아이콘을 위해 필요

class Header extends Component {
  constructor(props) {
    super(props)
    this.goBack = this.goBack.bind(this) // i think you are missing this
  }

  goBack() {
    this.props.history.goBack()
  }

  render() {
    return (
      <div className="Rectangle">
        <div className="ArrowBack" onClick={() => this.props.history.goBack()}>
          <MaterialIcon icon="arrow_back_ios" size="23x" color="black" />
        </div>
        <div className="MessageWrapper">
          <span className="HeaderMessage">{this.props.content}</span>
        </div>
      </div>
    )
  }
}

export default withRouter(Header)
