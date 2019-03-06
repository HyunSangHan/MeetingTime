import React, { Component } from 'react';
import './App.css';
import Main from "./components/Main"
import Footer from "./components/Footer";
import Profile from "./components/details/Profile";
import Heart from "./components/details/Heart";
import Chat from "./components/details/Chat";
import Initpage from "./components/Initpage";
import Result from "./components/details/Result";
import { BrowserRouter, Route } from 'react-router-dom';
import * as actions from './actions';
import { connect } from 'react-redux';

class App extends Component {

    constructor(props){
        super(props);

        this.state = { //결국엔 스토어에 다 넣어야 할 놈들. 특히, 이걸 해결하고나면 rank가 false냐 true냐에 따라 버튼을 바꿔줘야한다. 단, 그전에 axios를 던져놓은 상태여야함
            user: {
                nickname: "data_닉네임",
                company: "data_회사명",
                recommendation_code: "data_코드",
                current_heart: "data_하트개수",
                chat: "data_대화방개수",
                rank: "data_선착순번호"
                //나중에 유저의 모델 내 필드 개수와 맞춰야 할 것임
            },
            info: {
                title: "이번주 🔥금 in 강남",
                msg1: "매칭오픈 - 3월 4일 월요일 오전 10시",
                msg2: "결과발표 - 3월 6일 수요일 오후 10시"
            },
            // offPopup: false
        }
    }

  render() {
    return (
        <BrowserRouter>
            <div className="App frame">
                <Route exact path="/"
                       render={(props) => (
                           <Main
                               {...props}
                               user={this.state.user}
                               info={this.state.info}
                               is_joined={this.props.is_joined}
                               is_copied={this.props.is_copied}
                               offPopup={this.props.offPopup}
                               onJoinedPopup={this.props.onJoinedPopup}
                               onCopiedPopup={this.props.onCopiedPopup}
                           />
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
    offPopup: () => dispatch(actions.deletePopup()),
    onJoinedPopup: () => dispatch(actions.createJoinedPopup()),
    onCopiedPopup: () => dispatch(actions.createCopiedPopup())
});

const mapToState = (state) => ({
    is_joined: state.is_joined,
    is_copied: state.is_copied
})

// 리덕스에 연결시키고 내보내기
export default connect(mapToState, mapToDispatch)(App);