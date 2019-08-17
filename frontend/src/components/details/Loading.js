import React from "react";
import "../../css/Reuse.scss"; //도구성컴포넌트 CSS


const Loading = props => (
    <div className="container">
        <img
            src={require("../../images/loading.png")}
            className="spinner"
            alt="loading"
        />
    </div>
)


export default Loading;