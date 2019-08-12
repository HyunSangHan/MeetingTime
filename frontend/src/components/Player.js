import React, { Component } from "react";

class Player extends Component {



    render(){
        console.log(this.props);
        return (
            <div>
                <h3>제발 나와라</h3>
                <h1>{this.props.joined_user}</h1>
                
            </div>
        )
    }

}

export default Player;
