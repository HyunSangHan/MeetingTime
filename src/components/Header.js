import React, { Component } from 'react';
import '../css/Header.css';
import '../App.css';
import MaterialIcon from 'material-icons-react';
import {Link} from "react-router-dom";

class Header extends Component {
    render() {
        return (
            <div className="pc-none header z-2">
                <div className="header-title font-3 font-white z-2">
                    {this.props.title}
                </div>
                <div className="header-logo z-2">
                    <Link to="/">
                        <MaterialIcon icon="arrow_back_ios" size="23x" color="white"/>
                    </Link>
                </div>
            </div>
        );
    }
}

export default Header;
