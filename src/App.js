import React, { Component } from 'react';
import './App.css';
import Main from "./components/Main"
import Footer from "./components/Footer";
import Profile from "./components/details/Profile";
import Heart from "./components/details/Heart";
import Chat from "./components/details/Chat";
import Initpage from "./components/Initpage";
import Result from "./components/Result";
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './actions';

class App extends Component {

    constructor(props){
        super(props);

        this.state = {
            user: {
                nickname: "필요data: 닉네임",
                company: "필요data: 회사명",
                recommendation_code: "추천인코드",
                current_heart: "하트개수",
                chat: "대화방개수"
            },
            this_week: "이번주 🔥금 in 강남",
            offPopup: false
        }
    }

  render() {
    return (
        <BrowserRouter>
            <div className="App frame">
                <Route exact path="/"
                       render={(props) => (
                           <Main {...props} user={this.state.user} />
                               )} />
                {/*offPopup={this.props.offPopup}*/}
                {/* NEED TO CHECK SYNTAX => user={this.state.user} this_week={this.state.this_week}*/}
                <Route path="/profile" component={Profile}/>
                <Route path="/heart" component={Heart}/>
                <Route path="/chat" component={Chat}/>
                <Route path="/init" component={Initpage}/>
                <Route path="/matching_result" component={Result}/>
                <Footer/>
            </div>
        </BrowserRouter>
    );
  }
}

// 액션 생성 함수 준비
const mapToDispatch = (dispatch) => ({
    offPopup: () => dispatch(actions.deletePopup())
});

const mapToState = () => ({
    //넣을게없음
})

// 리덕스에 연결시키고 내보냅니다
export default connect(mapToState, mapToDispatch)(App);