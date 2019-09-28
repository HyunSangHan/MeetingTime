import React, { Component } from 'react';
import '../../css/Main.scss'; //부모컴포넌트의CSS(SCSS)
import '../../App.css'; //공통CSS
import { Link } from 'react-router-dom'; //다른 페이지로 링크 걸 때 필요
import CountDown from "./CountDown";

class ControlTool extends Component {

    render() {
        const { my_profile } = this.props;  

        return (
            <div className="control-container fix-bottom-controltool">
                <div className="control-tool">
                    <div className="timer font-notosan font-13">
                        <CountDown />
                    </div>

                    <div className="action-container">
                        <div className="column">
                            <Link to="/team_profile">
                                <img className="my-team" src={my_profile.image || require("../../images/noPhoto.jpg")} alt=""/>
                            </Link> 
                        </div>

                        <div className="column">      
                            <div className="greenlight-back">
                                <div className="greenlight move-1">
                                    <div className="call-button font-jua" onClick={() => alert('이 페이지는 테스트페이지라, 현재 서버와의 연결이 되어있지 않습니다.')}>
                                        콜?
                                    </div> 
                                </div> 
                            </div> 
                        </div>
                        <div className="column">
                            <div className="gift">
                                <div className="gift-off font-jua" onClick={() => alert('이 페이지는 테스트페이지라, 현재 서버와의 연결이 되어있지 않습니다.')}>
                                    안주쏘기
                                </div> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ControlTool;