import React, { Component, Fragment } from 'react';
import '../App.css'; //공통CSS
import { Link, Redirect } from 'react-router-dom';


class Home extends Component {

    render() {
        return (
            <div style={{width: "90%", margin: "auto"}}>
                <h1><strong>테스트페이지</strong></h1>
                <p>프론트 테스트용페이지로, 서버와의 연결을 잠시 끊어둔 페이지입니다. 라우팅은 가능합니다. 아래 케이스별 링크를 클릭해서 페이지 확인이 가능합니다.</p>
                <hr/>
                <h2>Initpage</h2>
                <p>
                    <Link to="/initpage0">
                        로그인전
                    </Link>
                </p>
                <p>
                    <Link to="/initpage1">
                        로그인후 > 오픈전 > 그룹만들기전
                    </Link>
                </p>
                <p>
                    <Link to="/initpage2">
                        로그인후 > 오픈전 > 그룹만든후
                    </Link>
                </p>
                <p>
                    <Link to="/initpage3">
                        로그인후 > 오픈후 > 번호표뽑기전
                    </Link>
                </p>
                <h2>Waiting</h2>
                <p>
                    <Link to="/Waiting0">
                        번호표뽑은후 > 선착순마감전
                    </Link>
                </p>
                <p>
                    <Link to="/waiting1">
                        번호표뽑은후 > 선착순마감후 > 진입실패 
                    </Link>
                </p>
                <p>
                    <Link to="/waiting2">
                        번호표뽑은후 > 선착순마감후 > 진입성공
                    </Link>
                </p>
                <h2>Matching</h2>
                <p>
                    <Link to="/matching">
                        매칭된 상대 확인 
                    </Link>
                </p>
                <h2>Profile</h2>
                <p>
                    <Link to="/profile">
                        개인정보수정 
                    </Link>
                </p>
                <p>
                    <Link to="/team_profile">
                        그룹정보생성/수정
                    </Link>
                </p>
            </div>
        );
    }
}

export default Home;