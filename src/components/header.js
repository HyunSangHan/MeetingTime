import React, { Component } from 'react';
import '../css/header.css';
import '../App.css';
import logo from '../logo.svg';
//import { Container, Row, Col } from 'react-bootstrap';

class header extends Component {
    render() {
        return (
            <div className="header">
                <div className="header-title">
                    Meeting Service
                </div>
                <div className="header-logo">
                    <div>
                        <img src={logo} alt={"logo"} />
                    </div>
                </div>
            </div>
        );
    }
}

export default header;
