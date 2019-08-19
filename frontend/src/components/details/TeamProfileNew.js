import React, { Component } from 'react';
import '../../css/Profile.scss'; //부모컴포넌트의CSS(SCSS)
import '../../App.css'; //공통CSS
import { Link } from 'react-router-dom'; //다른 페이지로 링크 걸 때 필요
import Textarea from "react-textarea-autosize";
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import * as myProfileActions from "../../modules/my_profile";
import axios from "axios";
import TeamPopup from "./TeamPopup";

class TeamProfileNew extends Component {

    constructor(props){
        super(props);

        this.state={
            image_value: null,
            image_two_value: null,
            image_three_value: null,
            preview: null,
            preview_two: null,
            preview_three: null,

            team_name_value: null,
            team_intro_value: null,

            is_three_images: false,
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
    }

    //두번째 이미지 관련 함수
    handleImageChange_two = event => {
        console.log(event.target.files[0]);
        this.setState ({
            image_two_value: event.target.files[0],
            preview_two: URL.createObjectURL(event.target.files[0])
        })
    }

    //세번째 이미지 관련 함수
    handleImageChange_three = event => {
        console.log(event.target.files[0]);
        this.setState ({
            image_three_value: event.target.files[0],
            preview_three: URL.createObjectURL(event.target.files[0])
        })
    }
    //이미지 제출 함수
    handleImageSubmit = () => {
        const formData = new FormData();
        const { image_value, image_two_value, image_three_value, preview, preview_two, preview_three } = this.state;
        
        formData.append('image', image_value, image_value.name);
        axios.patch('http://localhost:3000/profile/', formData)
            .then(response => {
                console.log(response);
        });
    }
    handleImageSubmit_two = () => {
        const formData = new FormData();
        const { image_value, image_two_value, image_three_value, preview, preview_two, preview_three } = this.state;
        formData.append('image_two', image_two_value, image_two_value.name);
        console.log(formData);
        axios.patch('http://localhost:3000/profile/', formData)
            .then(response => {
                console.log(response);
            });
        }

    handleImageSubmit_three = () => {
        const formData = new FormData();
        const { image_value, image_two_value, image_three_value, preview, preview_two, preview_three } = this.state;
        console.log(formData);
        formData.append('image_three', image_three_value, image_three_value.name);
        axios.patch('http://localhost:3000/profile/', formData)
            .then(response => {
                console.log(response);
            });
        }
        
    handleSubmit = event => {
        const { MyProfileActions } = this.props;
        const { team_name_value, team_intro_value, preview, preview_two, preview_three, is_edited_profile } = this.state;
        event.preventDefault();

        if(preview && preview_two && preview_three){
            this.setState({
                is_three_images: true,
            });
        MyProfileActions.createPopup();
        MyProfileActions.TeamUpdate({
            team_name_value : team_name_value,
            team_intro_value : team_intro_value,
        })

        if(preview){
            this.handleImageSubmit();
        }
        if(preview_two){
            this.handleImageSubmit_two();
        }
        if(preview_three){
            this.handleImageSubmit_three();
        }

        alert("새 그룹이 생성되었습니다.");

        }else{
            alert("세 이미지를 모두 채워주세요");
        }
    };

    render() {
        const { my_profile, is_edited_profile } = this.props;        // 문서객체에 대한 필요한 분기는 여기서 미리 처리하기
        const { MyProfileActions, team_name_value, team_intro_value, preview, preview_two, preview_three } = this.state;
        return (
            <div className="team-container">

                <div className="title font-notosan">팀 멤버</div>

                <div className="images">

                    {!preview ?
                        <img src={require("../../images/noPhoto.jpg")} 
                            onClick={() => this.fileInput.click()}
                        />
                        :
                        <img src={preview} onClick={() => this.fileInput.click()}/>
                    }
                    {!preview_two ? 
                        <img src={require("../../images/noPhoto.jpg")}
                            onClick={() => this.fileInput_two.click()}
                        />
                    :
                        <img src={preview_two} onClick={() => this.fileInput_two.click()}/>
                    }
                    {!preview_three ?
                        <img src={require("../../images/noPhoto.jpg")}
                            onClick={() => this.fileInput_three.click()}
                        />
                    :
                        <img src={preview_three} onClick={() => this.fileInput_three.click()}/>
                    }
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
                        />
                        <input
                            style={{display: 'none'}}
                            type="file"
                            onChange={this.handleImageChange_two}
                            ref={fileInput_two => this.fileInput_two = fileInput_two}
                            name="image_two_value"
                            className="image-uploader"
                        />
                        <input
                            style={{display: 'none'}}
                            type="file"
                            onChange={this.handleImageChange_three}
                            ref={fileInput_three => this.fileInput_three = fileInput_three}
                            name="image_three_value"
                            className="image-uploader"
                        />

                    
                        <div className="title font-notosan">팀 이름</div>
                        <input
                            type="text"
                            value={team_name_value}
                            onChange={this.handleInputChange}
                            className="text-input font-notosan"
                            name="team_name_value"
                            placeholder="10자이내로 작성해주세요"
                        />
                        

                        <div className="title font-notosan">팀 소개</div>
                        <div className="team_intro">
                            <Textarea
                                type="text"
                                value={team_intro_value}
                                onChange={this.handleInputChange}
                                className="text-input font-notosan"
                                name="team_intro_value"
                                placeholder="30자이내로 작성해주세요"
                            />
                        </div>
                        <input
                            type="submit"
                            value="그룹 만들기"
                            className="button font-notosan"
                        />
                    </form>

                    {/* {is_edited_profile && 
                    <div className="team-popup">
                        <TeamPopup MyProfileActions={MyProfileActions}/>
                    </div>
                    } */}
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
    is_edited_profile: state.my_profile.get('is_edited_profile'),
    my_profile: state.my_profile.get('my_profile'),
})

export default connect(mapStateToProps, mapDispatchToProps)(TeamProfileNew);
