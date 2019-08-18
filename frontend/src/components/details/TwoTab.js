import React, { Component } from 'react';
import '../../css/Profile.scss'; //부모컴포넌트의CSS(SCSS)
import '../../App.css'; //공통CSS
import { Link } from 'react-router-dom'; //다른 페이지로 링크 걸 때 필요
import TeamProfileNew from "./TeamProfileNew";
import TeamProfilePrev from "./TeamProfilePrev";

class TwoTab extends Component {

    constructor(props){
        super(props);
        
        this.state={
            action : "new"
        }
    }
   
    changeAction_new = () => {
        this.setState({
            action: "new"
        });
    }
    changeAction_old = () => {
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
                {/* UI 코드 들어갈 곳 */}
                <div className="tab-bar">
                    <div
                        className="change-link font-notosan"
                        onClick={this.changeAction_new}
                    >
                    새로운 그룹
                    </div>
                    <div
                        className="change-link font-notosan"
                        onClick={this.changeAction_old}
                    >
                    지난 그룹
                    </div>
                </div>
                {/* <span className="bottom-line-one"/>
                <span className="bottom-line-two"/> */}

                <div className="team-container">
                    {action === "new" && <TeamProfileNew/>}
                    {action === "prev" && <TeamProfilePrev/>}
                </div>
            </div>
        );
    }
}

export default TwoTab;