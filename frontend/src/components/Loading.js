import React from "react";
import "../css/loading.scss";


const Loading = props => (
    <div className="container">
        <img
            src={require("../images/loading.png")}
            className="spinner"
            alt="loading"
        />
    </div>
)


export default Loading;