import React, { Component } from 'react';
import '../../css/Initpage.scss'; //부모컴포넌트의CSS(SCSS)
import '../../App.css'; //공통CSS
import { Link } from 'react-router-dom'; //다른 페이지로 링크 걸 때 필요

class MakeTeamButton extends Component {

    render() {
        const { isMadeTeam, my_profile } = this.props;
        let makeTeamButton = null;

        if (isMadeTeam) {
            makeTeamButton =
            <div className="mt-4 mh-auto team-profile-img-warp">
                <img className="team-profile-img-small first-img" src={my_profile.image || require("./../../images/noPhoto.jpg")} />
                <img className="team-profile-img-small second-img" src={my_profile.image_two || require("./../../images/noPhoto.jpg")} />
                <img className="team-profile-img-small third-img" src={my_profile.image_three || require("./../../images/noPhoto.jpg")} />
            </div>;
        } else {
            makeTeamButton =
                <div className="make-team-button mt-4 mh-auto flex-center">
                    <div className="font-notosan font-white font-16">
                        함께 미팅할 그룹만들기
                    </div>
                </div>;
        }


        return (
            <div className="pb-36">
                <Link to="/team_profile" style={{ textDecoration: 'none' }}>
                    { makeTeamButton }
                </Link>
            </div>
        );
    }
}

export default MakeTeamButton;