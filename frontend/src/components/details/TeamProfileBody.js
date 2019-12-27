import React, { Component } from "react"
import "../../css/Profile.scss" //부모컴포넌트의CSS(SCSS)
import "../../App.css" //공통CSS
import Textarea from "react-textarea-autosize"
import axios from "axios"
import TeamPopup from "./TeamPopup"

class TeamProfileBody extends Component {
  constructor(props) {
    super(props)

    this.state = {
      imageValue: this.props.myProfile.image,
      imageTwoValue: this.props.myProfile.imageTwo,
      imageThreeValue: this.props.myProfile.imageThree,
      preview: null,
      previewTwo: null,
      previewThree: null,
      hasThreeImages: false,
      teamNameValue: this.props.myProfile.teamName,
      teamIntroValue: this.props.myProfile.teamIntroduce
    }
  }

  //수정 관련 함수들
  handleInputChange = event => {
    const {
      target: { value, name }
    } = event
    this.setState({
      [name]: value
    })
    console.log(name, value)
  }

  //첫번째 이미지 관련 함수
  handleImageChangeFirst = event => {
    console.log(event.target.files[0])
    this.setState({
      imageValue: event.target.files[0],
      preview: URL.createObjectURL(event.target.files[0])
    })
  }

  //두번째 이미지 관련 함수
  handleImageChangeSecond = event => {
    console.log(event.target.files[0])
    this.setState({
      imageTwoValue: event.target.files[0],
      previewTwo: URL.createObjectURL(event.target.files[0])
    })
  }

  //세번째 이미지 관련 함수
  handleImageChangeThird = event => {
    console.log(event.target.files[0])
    this.setState({
      imageThreeValue: event.target.files[0],
      previewThree: URL.createObjectURL(event.target.files[0])
    })
  }
  //이미지 제출 함수
  handleImageSubmitFirst = () => {
    const formData = new FormData()
    const { imageValue } = this.state

    formData.append("image", imageValue, imageValue.name)
    axios.patch("http://localhost:3000/profile/", formData).then(response => {
      console.log(response)
    })
  }
  handleImageSubmitSecond = () => {
    const formData = new FormData()
    const { imageTwoValue } = this.state
    formData.append("imageTwo", imageTwoValue, imageTwoValue.name)
    console.log(formData)
    axios.patch("http://localhost:3000/profile/", formData).then(response => {
      console.log(response)
    })
  }

  handleImageSubmitThird = () => {
    const formData = new FormData()
    const { imageThreeValue } = this.state
    console.log(formData)
    formData.append("imageThree", imageThreeValue, imageThreeValue.name)
    axios.patch("http://localhost:3000/profile/", formData).then(response => {
      console.log(response)
    })
  }

  handleTeamPopup = event => {
    const { MyProfileActions } = this.props
    MyProfileActions.createPopup()
    event.preventDefault()
    this.handleSubmit()
  }

  handleSubmit = event => {
    const { MyProfileActions } = this.props
    const {
      teamNameValue,
      teamIntroValue,
      preview,
      previewTwo,
      previewThree
    } = this.state
    // event.preventDefault();
    // console.log(this.state);

    MyProfileActions.teamUpdate({
      teamNameValue: teamNameValue,
      teamIntroValue: teamIntroValue
    })

    if (preview) {
      this.handleImageSubmitFirst()
    }
    if (previewTwo) {
      this.handleImageSubmitSecond()
    }
    if (previewThree) {
      this.handleImageSubmitThird()
    }

    MyProfileActions.getMyProfile()
  }

  render() {
    const { MyProfileActions, isEditedProfile } = this.props
    const {
      teamNameValue,
      teamIntroValue,
      preview,
      previewTwo,
      previewThree,
      imageValue,
      imageTwoValue,
      imageThreeValue,
      hasThreeImages
    } = this.state

    return (
      <div className="team-container">
        <div className="profile-form">
          <div className="team-container title-imgs">
            <div className="title font-notosan">
              팀 사진
              {!this.props.myProfile.createdAt && (
                <span className="title-noti font-notosan ml-2">
                  * 멤버수는 본인을 포함, 3명을 기본으로 합니다.
                </span>
              )}
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
              style={{ display: "none" }}
              type="file"
              onChange={this.handleImageChangeFirst}
              ref={fileInputFirst => (this.fileInputFirst = fileInputFirst)}
              name="imageValue"
              className="image-uploader"
              accept="image/*"
            />
            <input
              style={{ display: "none" }}
              type="file"
              onChange={this.handleImageChangeSecond}
              ref={fileInputSecond => (this.fileInputSecond = fileInputSecond)}
              name="imageTwoValue"
              className="image-uploader"
              accept="image/*"
            />
            <input
              style={{ display: "none" }}
              type="file"
              onChange={this.handleImageChangeThird}
              ref={fileInputThird => (this.fileInputThird = fileInputThird)}
              name="imageThreeValue"
              className="image-uploader"
              accept="image/*"
            />

            <div className="title font-notosan">팀 이름</div>
            <input
              type="text"
              value={teamNameValue}
              onChange={this.handleInputChange}
              className="text-input font-notosan"
              name="teamNameValue"
              placeholder="10자 이내로 작성해주세요"
            />

            <div className="title font-notosan">팀 소개</div>
            <div className="team-intro">
              <Textarea
                type="text"
                value={teamIntroValue}
                onChange={this.handleInputChange}
                className="text-input font-notosan"
                name="teamIntroValue"
                placeholder="30자 이내로 작성해주세요"
              />
            </div>

            <div className="ButtonWrap">
              {(preview && previewTwo && previewThree) ||
              (imageValue && imageTwoValue && imageThreeValue) ? (
                <button
                  className="SubmitButton WorkingButton mt-1"
                  onClick={this.handleTeamPopup}
                >
                  그룹만들기
                </button>
              ) : (
                <button
                  type="button"
                  className="SubmitButton NotWorkingButton mt-1"
                  onClick={() => alert("입력을 완료해주세요.")}
                >
                  그룹만들기
                </button>
              )}
            </div>
          </form>
        </div>

        {isEditedProfile && (
          <div className="team-pop">
            <TeamPopup MyProfileActions={MyProfileActions} />
          </div>
        )}

        <div className="imgs-wrap">
          <div className="imgs">
            {!preview ? (
              <div
                className="each-img flex-center"
                onClick={() => this.fileInputFirst.click()}
              >
                {imageValue ? (
                  <img className="user-img" src={imageValue} />
                ) : (
                  <div className="App">
                    <img
                      className="smile"
                      src={require("../../images/smile.png")}
                    />
                    <div className="mt-2 font-16 font-bold">
                      멤버1(본인) 사진
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <img
                className="each-img"
                src={preview}
                onClick={() => this.fileInputFirst.click()}
              />
            )}
            {!previewTwo ? (
              <div
                className="each-img flex-center"
                onClick={() => this.fileInputSecond.click()}
              >
                {imageTwoValue ? (
                  <img className="user-img" src={imageTwoValue} />
                ) : (
                  <div className="App">
                    <img
                      className="smile"
                      src={require("../../images/smile.png")}
                    />
                    <div className="mt-2 font-16 font-bold">멤버2 사진</div>
                  </div>
                )}
              </div>
            ) : (
              <img
                className="each-img"
                src={previewTwo}
                onClick={() => this.fileInputSecond.click()}
              />
            )}
            {!previewThree ? (
              <div
                className="each-img flex-center"
                onClick={() => this.fileInputThird.click()}
              >
                {imageThreeValue ? (
                  <img className="user-img" src={imageThreeValue} />
                ) : (
                  <div className="App">
                    <img
                      className="smile"
                      src={require("../../images/smile.png")}
                    />
                    <div className="mt-2 font-16 font-bold">멤버3 사진</div>
                  </div>
                )}
              </div>
            ) : (
              <img
                className="each-img"
                src={previewThree}
                onClick={() => this.fileInputThird.click()}
              />
            )}
            <div className="last-child-gap" />
          </div>
        </div>
      </div>
    )
  }
}

export default TeamProfileBody
