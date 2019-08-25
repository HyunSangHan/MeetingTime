import React, { Component } from 'react';
import '../../css/Profile.scss'; //부모컴포넌트의CSS(SCSS)
import '../../App.css'; //공통CSS
import classNames from 'classnames';

class TwoTab extends Component {
    render() {
        const { MyProfileActions, clicked_tab } = this.props;
        return (
            <div className="tab-wrap">
                <div className="tab-content">
                    <div className={classNames(
                        "change-link font-notosan", 
                        clicked_tab === 'new' ? "active" : ""
                        )}
                        onClick={MyProfileActions.newTabOn}
                    >
                    새로운 그룹
                    </div>
                    <div className={classNames(
                        "change-link font-notosan", 
                        clicked_tab === 'prev' ? "active" : ""
                        )}
                        onClick={MyProfileActions.prevTabOn}                        >
                    지난번 그룹
                    </div>
                </div>
            </div>
        );
    }
}

export default TwoTab;