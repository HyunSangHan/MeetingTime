import React, { Component } from 'react';
import '../../css/Body.css';
import '../../App.css';
import MaterialIcon from 'material-icons-react';

class JoinedPopup extends Component {

    /* eslint-disable-next-line */
    constructor(props){
        super(props);
    };

    render() {
        return (
            <div className={"App flex-center"}>
                <div  className={"abs hover"} onClick={this.props.deletePopup}>
                    <MaterialIcon icon="clear" size="25px" color="lightgrey"/>
                </div>
                {this.props.is_joined_already
                ?
                (<div className={"copy-pop flex-center font-1"}>
                    이미 번호표를 뽑으셨어요! 결과발표 전까지 조금만 기다려주세요.
                </div>)
                :
                (<div className={"copy-pop flex-center font-1"}>
                    번호표 {this.props.rank}번 뽑으셨네요!
                </div>)}
            </div>
        );
    }
}

export default JoinedPopup;