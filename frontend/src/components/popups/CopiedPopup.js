import React, { Component } from 'react';
import '../../css/Body.css';
import '../../App.css';
import MaterialIcon from 'material-icons-react';

class CopiedPopup extends Component {

    render() {
        return (
            <div className={"App flex-center"}>
                <div  className={"abs hover"} onClick={this.props.deletePopup}>
                    <MaterialIcon icon="clear" size="25px" color="lightgrey"/>
                </div>
                <div  className={"copy-pop flex-center font-1"}>
                    추천인코드({this.props.user.recommendation_code})가 복사되었습니다.
                </div>
            </div>
        );
    }
}

export default CopiedPopup;