import React, { Component } from "react"
import "../../css/Initpage.scss" //부모컴포넌트의CSS(SCSS)
import "../../App.css" //공통CSS
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as joinActions from "../../modules/join"
import MaterialIcon from "material-icons-react"

class JoinedPopup extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { isJoinedAlready } = this.props
    let popup = null
    if (isJoinedAlready) {
      popup = (
        <div className={"copy-pop flex-center font-1"}>
          이미 번호표를 뽑으셨어요! 결과발표 전까지 조금만 기다려주세요.
        </div>
      )
    } else {
      popup = (
        <div className={"copy-pop flex-center font-1"}>
          번호표 {this.props.rank}번 뽑으셨네요!
        </div>
      )
    }

    return (
      <div className={"App flex-center"}>
        <div className={"abs hover"} onClick={this.props.deletePopup}>
          <MaterialIcon icon="clear" size="25px" color="lightgrey" />
        </div>
        {popup}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  dispatch,
  JoinActions: bindActionCreators(joinActions, dispatch)
})

const mapStateToProps = state => ({
  isJoinedPopupOn: state.join.get("isJoinedPopupOn"),
  isJoinedAlready: state.join.get("isJoinedAlready")
})

export default connect(mapStateToProps, mapDispatchToProps)(JoinedPopup)
