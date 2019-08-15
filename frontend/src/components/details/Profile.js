import React, { Component } from 'react';
import FooterScrollable from "./../FooterScrollable";
import * as myProfileActions from "../../modules/my_profile";
import "../../css/profile.scss";
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import Textarea from "react-textarea-autosize";

//import EditPW from "./EditPW";

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ageValue: this.props.my_profile.age_range,
            companyValue: this.props.my_profile.company.name,
            team_introValue : this.props.my_profile.team_introduce,
            imageValue: this.props.my_profile.image,
        }
    }

    componentDidMount() {
        const { MyProfileActions } = this.props;
        MyProfileActions.getMyProfile();
    }


    _handleInputChange = event => {
        const { target: { value, name } } = event;
        this.setState({
            [name]: value
        });
    };

    _handleSubmit = event => {
        const { MyProfileActions } = this.props;
        const { ageValue, companyValue, team_introValue, imageValue } = this.state;
        event.preventDefault();
        MyProfileActions.ProfileUpdate({
                        ageValue: ageValue,
                        team_introValue : team_introValue,
                        imageValue: imageValue
                    });
        MyProfileActions.CompanyUpdate({
                        companyValue: companyValue,
                    });
    };

    render(){    
        const { my_profile } = this.props;

        return (
            <div className="form-component" >
                <h3 className="header">
                    "프로필 수정"
                </h3>
                <br/>

                <div className="profile-image">
                    <img src={my_profile.image || require("../../images/noPhoto.jpg")}
                        alt={my_profile.user.username} />
                </div>

                <form
                    className="form"
                    onSubmit={this._handleSubmit}
                    method="patch"
                    enctype="multipart/form-data"
                >       
                <table>
                    <tbody>
                    <tr>
                        <td className="image-uploader">
                            <input 
                                type="file"
                                //value={this.state.imageValue}
                                onChange={this._handleInputChange}
                                name="imageValue"
                                className="image-uploader"
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>이름  :</td>
                        <td className="not-change">{my_profile.user.username}</td>
                    </tr>
                    <tr>
                        <td>성별  :</td> 
                        <td className="not-change">{my_profile.is_male ? "남" : "여"}</td>
                    </tr>
                    <tr>
                        <td>연령대 :</td>
                        <td>
                        <input
                            type="number"
                            placeholder="나이를 입력해주세요"
                            value={this.state.ageValue}
                            onChange={this._handleInputChange}
                            name="ageValue"
                            className="age-form"
                        />
                        </td>
                    </tr>
                    <tr>
                        <td>회사 :</td>
                        <td>
                            <select name="companyValue" value={this.state.companyValue} onChange={this._handleInputChange}>
                                <option>삼성전자</option>
                                <option>애플</option>   
                                <option>구글</option>
                                <option>테슬라</option>
                                <option>현대자동차</option>
                                <option>서울대학교</option>
                                <option>네이버</option>
                                <option>카카오</option>
                                <option>JYP</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>팀 소개  :</td>
                        <td>
                            <Textarea
                                type="text"
                                placeholder="팀 소개를 입력해주세요"
                                value={this.state.team_introValue}
                                onChange={this._handleInputChange}
                                className="text-input"
                                name="team_introValue"
                            />
                        </td>
                    </tr>
                
                    </tbody>
                </table>
                <input
                    type="submit"
                    value="수정완료"
                    className="button"
                />
            </form>
            <FooterScrollable/>
        </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    MyProfileActions: bindActionCreators(myProfileActions, dispatch),
});

const mapStateToProps = (state) => ({
    is_login_already: state.my_profile.get('is_login_already'),
    my_profile: state.my_profile.get('my_profile'),
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile);