import React, { Component } from "react";
import "../css/info_styles.scss";
import { Link } from 'react-router-dom';
//import * as PlayerActions from '../modules/player';
//import { bindActionCreators } from 'redux';
//import { connect } from "react-redux";


class MyPlayer extends Component {

    constructor(props) {
        super(props);

    }

        
    render(){
        console.log(this.props);
        return (

            <div >
                <Link to="/profile">
                    프로필 수정하기
                </Link>
                <h2>나의 프로필 정보 임돠.</h2>
            </div>
        )
    }

};

export default MyPlayer;