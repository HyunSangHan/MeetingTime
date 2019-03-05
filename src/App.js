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
                chat: "대화방개수" //나중에 유저의 모델 내 필드 개수와 맞춰야 할 것임
            },
            info: {
                title: "이번주 🔥금 in 강남",
                msg1: "매칭오픈 - 3월 4일 월요일 오전 10시",
                msg2: "결과발표 - 3월 6일 수요일 오후 10시"
            },
            offPopup: false
        }
    }

  render() {
    return (
        <BrowserRouter>
            <div className="App frame">
                <Route exact path="/"
                       render={(props) => (
                           <Main {...props} user={this.state.user} info={this.state.info}/>
                               )} />
                {/*offPopup={this.props.offPopup}*/}
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

// 리덕스에 연결시키고 내보내기
export default connect(mapToState, mapToDispatch)(App);