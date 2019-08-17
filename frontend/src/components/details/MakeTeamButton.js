import React, { Component } from 'react';
import '../../css/Initpage.scss'; //부모컴포넌트의CSS(SCSS)
import '../../App.css'; //공통CSS
import { Link } from 'react-router-dom'; //다른 페이지로 링크 걸 때 필요

class MakeTeamButton extends Component {

    // constructor(props){
    //     super(props);
    // }

    // componentDidMount(){
    // }

    render() {
        const { } = this.props;
        // 문서객체에 대한 필요한 분기는 여기서 미리 처리하기

        return (
            <div className={"App"}>
                {/* UI 코드 들어갈 곳 */}
            </div>
        );
    }
}

export default MakeTeamButton;