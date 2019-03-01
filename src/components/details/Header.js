import React, { Component } from 'react';
import '../../css/Header.css';
import '../../App.css';
import MaterialIcon from 'material-icons-react';
import {Link} from "react-router-dom";

class Header extends Component {
    render() {
        return (
            <div className="header">
                <div className="header-title font-3 font-white">
                    Profile
                    {/*props로 페이지 이름 넘겨받기*/}
                </div>
                <div className="header-logo">
                    <Link to="/">
                        <MaterialIcon icon="keyboard_backspace" size="35px" color="white"/>
                    </Link>
                </div>
            </div>
        );
    }
}

export default Header;
