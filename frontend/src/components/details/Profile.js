import React, { Component } from 'react';
import FooterScrollable from "./../FooterScrollable";
import * as myProfileActions from "../../modules/my_profile";
import "../../css/profile.scss";
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import Textarea from "react-textarea-autosize";
import axios from "axios";
import { Link } from 'react-router-dom';

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            age_value: this.props.my_profile.age_range,
            company_value: this.props.my_profile.company.name,
            team_intro_value : this.props.my_profile.team_introduce,
            image_value: this.props.my_profile.image,
        }
    }

    componentDidMount() {
        const { MyProfileActions } = this.props;
        MyProfileActions.getMyProfile();
    }


    handleInputChange = event => {
        const { target: { value, name } } = event;
        this.setState({
            [name]: value
        });
    };

    handleImageChange = event => {
        console.log(event.target.files[0]);
        this.setState ({
            image_value: event.target.files[0]
        })
    }

    handleImageSubmit = () => {
        const fd = new FormData();
        fd.append('image', this.state.image_value, this.state.image_value.name);
        axios.patch('http://localhost:3000/profile/', fd)
            .then(response => {
                console.log(response);
            });
    }

    handleSubmit = event => {
        const { MyProfileActions } = this.props;
        const { age_value, company_value, team_intro_value } = this.state;
        event.preventDefault();
        MyProfileActions.ProfileUpdate({
                        age_value: age_value,
                        team_intro_value : team_intro_value,
                    });
        MyProfileActions.CompanyUpdate({
                        company_value: company_value,
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

                <input
                    style={{display: 'none'}}
                    type="file"
                    onChange={this.handleImageChange}
                    ref={fileInput => this.fileInput = fileInput}
                    name="image_value"
                    className="image-uploader"
                />
                <button onClick={() => this.fileInput.click()}>사진 선택</button>
                <button onClick={this.handleImageSubmit}>사진 업로드</button>

                <form
                    className="form"
                    onSubmit={this.handleSubmit}
                    method="patch"
                    encType="multipart/form-data"
                >       
                <table>
                    <tbody>
                    
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
                            value={this.state.age_value}
                            onChange={this.handleInputChange}
                            name="age_value"
                            className="age-form"
                        />
                        </td>
                    </tr>
                    <tr>
                        <td>회사 :</td>
                        <td>
                            <select name="company_value" value={this.state.company_value} onChange={this.handleInputChange}>
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
                                value={this.state.team_intro_value}
                                onChange={this.handleInputChange}
                                className="text-input"
                                name="team_intro_value"
                            />
                        </td>
                    </tr>
                
                    </tbody>
                </table>
                <span className="buttons">
                    <Link to="/matching" >
                        <button
                            type="button"
                            className="go-back"
                        >
                        돌아가기
                        </button>
                    </Link>
                    <input
                        type="submit"
                        value="수정완료"
                        className="button"
                    />
                </span>
            </form>
            <br/>
            <h3 className="update-time">{!my_profile.natural_time === null ? " 최종 수정 : " + my_profile.natural_time : "null"}</h3>
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