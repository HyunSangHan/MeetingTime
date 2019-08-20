import React, { Component } from 'react';
import '../../css/Profile.scss'; //부모컴포넌트의CSS(SCSS)
import '../../App.css'; //공통CSS
import { Link } from 'react-router-dom'; //다른 페이지로 링크 걸 때 필요
import TeamProfileNew from "./TeamProfileNew";
import TeamProfilePrev from "./TeamProfilePrev";
import classNames from 'classnames';

class TwoTab extends Component {

    constructor(props){
        super(props);
        
        this.state={
            action : "prev"
        }
    }

    changeAction_new = () => {
        this.setState({
            action: "new"
        });
    }
    changeAction_prev = () => {
        this.setState({
            action: "prev"
        });
    }
    // componentDidMount(){
    // }

    render() {
        const { } = this.props;
        const { action } = this.state;
        return (
            <div className={"form-conmponent"}>
                <div className="tab-wrap">
                    <div className="tab-content">
                        <div className={classNames(
                            "change-link font-notosan", 
                            action === 'new' ? "active" : ""
                            )}
                            onClick={this.changeAction_new}
                        >
                        새로운 그룹
                        </div>
                        <div className={classNames(
                            "change-link font-notosan", 
                            action === 'prev' ? "active" : ""
                            )}
                            onClick={this.changeAction_prev}                        >
                        지난번 그룹
                        </div>
                    </div>
                </div>
                <div className="profile-form">
                    {action === "new" && <TeamProfileNew/>}
                    {action === "prev" && <TeamProfilePrev/>}
                </div>
            </div>
        );
    }
}

export default TwoTab;