import React, { Component } from 'react';
import './App.css';
import Main from "./components/Main"
import Profile from "./components/details/Profile";
import Heart from "./components/details/Heart";
import Chat from "./components/details/Chat";
import Initpage from "./components/Initpage";
import SignUp from "./components/SignUp";
import Result from "./components/details/Result";
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import * as actions from './actions';
import { connect } from 'react-redux';
import axios from 'axios';

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

class App extends Component {

    constructor(props){
        super(props);

        this.state = { //결국엔 스토어에 다 넣어야 할 놈들. 특히, 이걸 해결하고나면 rank가 false냐 true냐에 따라 버튼을 바꿔줘야한다. 단, 그전에 axios를 던져놓은 상태여야함
            meeting_info: {},
            info: { //test용도 더미 (지워야함)
                title: "이번주 🔥금 in 강남",
                msg1: "매칭오픈 - 3월 4일 월요일 오전 10시",
                msg2: "결과발표 - 3월 6일 수요일 오후 10시",
                // cutline: 0,
            },
            user: {
                nickname: "data_닉네임",
                company: "data_회사명",
                img_url: "/images/exampleProfile.jpeg",
                recommendation_code: "data_코드",
                current_heart: "data_하트개수",
                chat: "data_대화방개수",
                rank: "data_순번",
                location: "data_선호지역",
                phone_number: "data_대표연락처",
                team_detail: "data_팀소개문구_blah blah~ 이건 테스트입니다. 우리 팀은 평범하지 않습니다. 테스트입니다. 테스트입니다. blah blah blah blah 테스트다 블라 blah"
                //나중에 유저의 모델 내 필드 개수와 맞춰야 할 것임
            },
            ex_user: {
                nickname: "data_상대닉네임",
                company: "data_상대회사명",
                img_url: "/images/counterProfile.jpeg",
                team_detail: "data_상대팀소개문구_동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한사람 대한으로 길이 보전하세",
            },
            meeting: {
                title: "이번주 🔥금 in 강남",
                msg1: "매칭오픈 - 3월 4일 월요일 오전 10시",
                msg2: "결과발표 - 3월 6일 수요일 오후 10시"
            },
            cutline: 0,
        }
    }

    componentDidMount () {
        // let self = this;
        // axios.get("http://localhost:9292/get_meeting_info_first",
        //     ).then(response => {
        //     console.log(response.data.location);
        //     self.setState({
        //         meeting: response.data,
        //     })
        // })
        let self = this;
        axios.get("/api/meeting_info/")
        .then(response => {
            console.log(response.data[0])
            self.setState({ meeting_info: response.data[0] })
        })
        .catch(err => console.log(err));
    }

    render() {
    return (
        <BrowserRouter>
            <div className="frame">
                <Route exact path="/"
                       render={(props) => (
                           <Main
                               {...props}
                               meeting_info={this.state.meeting_info}
                               info={this.state.info}
                               user={this.state.user}
                               ex_user={this.state.ex_user}
                               is_joined={this.props.is_joined}
                               is_joined_done={this.props.is_joined_done}
                               is_copied={this.props.is_copied}
                               offPopup={this.props.offPopup}
                               offPopupJoin={this.props.offPopupJoin}
                               onJoinedPopup={this.props.onJoinedPopup}
                               onCopiedPopup={this.props.onCopiedPopup}
                               meeting={this.props.meeting}
                               cutline={this.state.cutline}
                           />
                               )} />
                {/*offPopup={this.props.offPopup}*/}
                <Route path="/profile"
                       render={(props) => (
                           <Profile
                               {...props}
                               user={this.state.user}
                           />
                       )} />
                <Route path="/heart"
                       render={(props) => (
                           <Heart
                               {...props}
                               user={this.state.user}
                           />
                       )} />
                <Route path="/chat"
                       render={(props) => (
                           <Chat
                               {...props}
                               user={this.state.user}
                               ex_user={this.state.ex_user}//maybe not necessary
                           />
                       )} />
                <Route path="/init" component={Initpage}/>
                <Route path="/sign_up" component={SignUp}/>
                <Route path="/matching_result"
                       render={(props) => (
                           <Result
                               {...props}
                               ex_user={this.state.ex_user}
                           />
                       )} />
                {/*<Redirect from="/" to="/init" />*/}

            </div>
        </BrowserRouter>
    );
  }
}

// 액션 생성 함수 준비
const mapToDispatch = (dispatch) => ({
    offPopup: () => dispatch(actions.deletePopup()),
    offPopupJoin: () => dispatch(actions.deletePopupJoin()),
    onJoinedPopup: () => dispatch(actions.createJoinedPopup()),
    onCopiedPopup: () => dispatch(actions.createCopiedPopup()),
    // onClickedMainButton: () => dispatch(actions.createClickedMainButton())
});

const mapToState = (state) => ({
    is_joined: state.is_joined,
    is_copied: state.is_copied,
    is_joined_done: state.is_joined_done,
    meeting: state.meeting,
})

// 리덕스에 연결시키고 내보내기
export default connect(mapToState, mapToDispatch)(App);