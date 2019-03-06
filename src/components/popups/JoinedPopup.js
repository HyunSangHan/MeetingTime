import React, { Component } from 'react';
import '../../css/Body.css';
import '../../App.css';
import MaterialIcon from 'material-icons-react';

class JoinedPopup extends Component {

    render() {
        return (
            <div className={"App flex-center"}>
                <div  className={"abs hover"} onClick={this.props.offPopup}>
                    <MaterialIcon icon="clear" size="25px" color="lightgrey"/>
                </div>
                <div  className={"copy-pop flex-center font-1"}>
                    번호표 {this.props.user.rank}번 뽑으셨네요!
                </div>
            </div>
        );
    }
}

export default JoinedPopup;