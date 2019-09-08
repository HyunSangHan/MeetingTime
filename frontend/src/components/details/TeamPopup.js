import React, { Component } from 'react';
import '../../App.css';


class TeamPopup extends Component {

    /* eslint-disable-next-line */
    constructor(props) {
        super(props);
    };

    render() {
        const {  MyProfileActions } = this.props;
        console.log(this.props);

        return (
           <div className="team-popup">
                <div className="message-box font_jua">
                    <p>그룹이 생성되었습니다.</p>
                    <button className="pop-button font_jua" onClick={MyProfileActions.deletePopup}>확인</button>
                </div>
            </div>
        );
    }
}

export default TeamPopup;