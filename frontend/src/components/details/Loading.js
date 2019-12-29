import React from "react"
import "../../css/Reuse.scss" //도구성컴포넌트 CSS

const Loading = props => (
  <div className="container spinner">
    <img
      src={require("../../images/loading.png")}
      style={{ width: "30px" }}
      alt="loading"
    />
  </div>
)

export default Loading
