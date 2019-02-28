import React, { Component } from 'react';
import '../css/Header.css';
import '../App.css';
import MaterialIcon from 'material-icons-react';

class Header extends Component {
    render() {
        return (
            <div className="header">
                <div className="header-title font-3 font-white">
                    Meeting Service
                </div>
                <div className="header-logo">
                    <MaterialIcon icon="keyboard_backspace" size="35px" color="white"/>
                </div>
            </div>
        );
    }
}

export default Header;
