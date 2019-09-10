import React, { Component } from 'react';
import '../../css/Profile.scss'; //부모컴포넌트의CSS(SCSS)
import '../../App.css'; //공통CSS
import { Link } from 'react-router-dom'; //다른 페이지로 링크 걸 때 필요
import Textarea from "react-textarea-autosize";
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import * as myProfileActions from "../../modules/my_profile";
import axios from "axios";
import TeamPopup from './TeamPopup';

class TeamProfileBody extends Component {

    constructor(props){
        super(props);

        this.state={
            image_value: this.props.my_profile.image,
            image_two_value: this.props.my_profile.image_two,
            image_three_value: this.props.my_profile.image_three,
            preview: null,
            preview_two: null,
            preview_three: null,
            has_three_images: false,
            team_name_value: this.props.my_profile.team_name,
            team_intro_value: this.props.my_profile.team_introduce,
        }
    }

    componentDidMount(){
    }

    //수정 관련 함수들
    handleInputChange = event => {
        const { target: { value, name } } = event;
        this.setState({
            [name]: value
        });
        console.log(name, value);
    };

    //첫번째 이미지 관련 함수
    handleImageChange = event => {
        console.log(event.target.files[0]);
        this.setState ({
            image_value: event.target.files[0],
            preview: URL.createObjectURL(event.target.files[0])
        })
    };

    //두번째 이미지 관련 함수
    handleImageChange_two = event => {
        console.log(event.target.files[0]);
        this.setState ({
            image_two_value: event.target.files[0],
            preview_two: URL.createObjectURL(event.target.files[0])
        })
    };

    //세번째 이미지 관련 함수
    handleImageChange_three = event => {
        console.log(event.target.files[0]);
        this.setState ({
            image_three_value: event.target.files[0],
            preview_three: URL.createObjectURL(event.target.files[0])
        })
    };
    //이미지 제출 함수
    handleImageSubmit = () => {
        const formData = new FormData();
        const { image_value } = this.state;
        
        formData.append('image', image_value, image_value.name);
        axios.patch('http://localhost:3000/profile/', formData)
            .then(response => {
                console.log(response);
        });
    }
    handleImageSubmit_two = () => {
        const formData = new FormData();
        const { image_two_value } = this.state;
        formData.append('image_two', image_two_value, image_two_value.name);
        console.log(formData);
        axios.patch('http://localhost:3000/profile/', formData)
            .then(response => {
                console.log(response);
            });
        };

    handleImageSubmit_three = () => {
        const formData = new FormData();
        const { image_three_value } = this.state;
        console.log(formData);
        formData.append('image_three', image_three_value, image_three_value.name);
        axios.patch('http://localhost:3000/profile/', formData)
            .then(response => {
                console.log(response);
            });
        };
        
    handleTeamPopup = event => {
        const { MyProfileActions } = this.props;
        MyProfileActions.createPopup();
        event.preventDefault();
        this.handleSubmit();
    };

    handleSubmit = event => {
        const { MyProfileActions } = this.props;
        const { team_name_value, team_intro_value, preview, preview_two, preview_three } = this.state;
        // event.preventDefault();
        // console.log(this.state);

        MyProfileActions.teamUpdate({
            team_name_value : team_name_value,
            team_intro_value : team_intro_value
        });

        
        if(preview){
            this.handleImageSubmit();
        }
        if(preview_two){
            this.handleImageSubmit_two();
        }
        if(preview_three){
            this.handleImageSubmit_three();
        }

        MyProfileActions.getMyProfile();
    };


    render() {
        const { MyProfileActions, is_edited_profile } = this.props;
        const { team_name_value, team_intro_value, preview, preview_two, preview_three, image_value, image_two_value, image_three_value, has_three_images } = this.state;
        
        return (
            <div className="team-container">
                <div className="profile-form">
                    <div className="team-container title-imgs">
                        <div className="title font-notosan">
                            팀 사진
                            {!this.props.my_profile.created_at &&
                            <span className="title-noti font-notosan ml-2">* 멤버수는 본인을 포함, 3명을 기본으로 합니다.</span>
                            }
                        </div>
                    </div>
                    <form
                        className="form"
                        onSubmit={this.handleSubmit}
                        method="patch"
                        encType="multipart/form-data"
                    >      
                    {/* 이미지 업로더 숨기기 */}
                        <input
                            style={{display: 'none'}}
                            type="file"
                            onChange={this.handleImageChange}
                            ref={fileInput => this.fileInput = fileInput}
                            name="image_value"
                            className="image-uploader"
                            accept="image/*"
                        />
                        <input
                            style={{display: 'none'}}
                            type="file"
                            onChange={this.handleImageChange_two}
                            ref={fileInput_two => this.fileInput_two = fileInput_two}
                            name="image_two_value"
                            className="image-uploader"
                            accept="image/*"
                        />
                        <input
                            style={{display: 'none'}}
                            type="file"
                            onChange={this.handleImageChange_three}
                            ref={fileInput_three => this.fileInput_three = fileInput_three}
                            name="image_three_value"
                            className="image-uploader"
                            accept="image/*"
                        />

                    
                        <div className="title font-notosan">팀 이름</div>
                        <input
                            type="text"
                            value={team_name_value}
                            onChange={this.handleInputChange}
                            className="text-input font-notosan"
                            name="team_name_value"
                            placeholder="10자 이내로 작성해주세요"
                        />
                        

                        <div className="title font-notosan">팀 소개</div>
                        <div className="team-intro">
                            <Textarea
                                type="text"
                                value={team_intro_value}
                                onChange={this.handleInputChange}
                                className="text-input font-notosan"
                                name="team_intro_value"
                                placeholder="30자 이내로 작성해주세요"
                            />
                        </div>

                        <div className="ButtonWrap">
                            {((preview && preview_two && preview_three) || (image_value && image_two_value && image_three_value)) ? 
                            (
                                <button className="SubmitButton WorkingButton" onClick={this.handleTeamPopup}>그룹만들기</button>
                            ) : (
                                <button type="button" className="SubmitButton NotWorkingButton" onClick={() => alert("입력을 완료해주세요.")}>그룹만들기</button>
                            )
                            }
                        </div>
                    </form>
                </div>

                {is_edited_profile && 
                    <div className="team-pop">
                        <TeamPopup MyProfileActions={MyProfileActions}/>
                    </div>
                }

                <div className="imgs-wrap">
                    <div className="imgs">
                        {!preview ?
                        <div className="each-img flex-center" onClick={() => this.fileInput.click()}>
                            {image_value ?
                            <img className="user-img" src={image_value} />
                            :
                            <div className="App">
                                <img className="smile" src={require("../../images/smile.png")} />
                                <div className="mt-2 font-16 font-bold">
                                    멤버1(본인) 사진
                                </div>
                            </div>
                            }
                        </div>
                        :
                        <img className="each-img" src={preview} onClick={() => this.fileInput.click()}/>
                        }
                        {!preview_two ? 
                        <div className="each-img flex-center" onClick={() => this.fileInput_two.click()}>
                            {image_two_value ?
                            <img className="user-img" src={image_two_value} />
                            :
                            <div className="App">
                                <img className="smile" src={require("../../images/smile.png")} />
                                <div className="mt-2 font-16 font-bold">
                                    멤버2 사진
                                </div>
                            </div>
                            }
                        </div>
                        :
                        <img className="each-img" src={preview_two} onClick={() => this.fileInput_two.click()}/>
                        }
                        {!preview_three ?
                        <div className="each-img flex-center" onClick={() => this.fileInput_three.click()}>
                            {image_three_value ?
                            <img className="user-img" src={image_three_value} />
                            :
                            <div className="App">
                                <img className="smile" src={require("../../images/smile.png")} />
                                <div className="mt-2 font-16 font-bold">
                                    멤버3 사진
                                </div>
                            </div>
                            }
                        </div>
                        :
                        <img className="each-img" src={preview_three} onClick={() => this.fileInput_three.click()}/>
                        }
                        <div className="last-child-gap"/>
                    </div>
                </div>
            </div>
        );
    }
}

export default TeamProfileBody;
