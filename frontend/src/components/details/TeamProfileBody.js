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
      imageFirstValue: null,
      imageSecondValue: null,
      imageThirdValue: null,
      previewFirst: null,
      previewSecond: null,
      previewThird: null,
      hasThreeImages: false,
      teamNameValue: null,
      teamIntroValue: null
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const {
      image,
      imageTwo,
      imageThree,
      teamName,
      teamIntroduce
    } = nextProps.myProfile
    this.setState({
      imageFirstValue: image || null,
      imageSecondValue: imageTwo || null,
      imageThirdValue: imageThree || null,
      teamNameValue: teamName || null,
      teamIntroValue: teamIntroduce || null
    })
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
      FirstimageValue: event.target.files[0],
      preview: URL.createObjectURL(event.target.files[0])
    })
  }

  //두번째 이미지 관련 함수
  handleImageChangeSecond = event => {
    console.log(event.target.files[0])
    this.setState({
      imageSecondValue: event.target.files[0],
      previewSecond: URL.createObjectURL(event.target.files[0])
    })
  }

  //세번째 이미지 관련 함수
  handleImageChangeThird = event => {
    console.log(event.target.files[0])
    this.setState({
      imageThirdValue: event.target.files[0],
      previewThird: URL.createObjectURL(event.target.files[0])
    })
  }
  //이미지 제출 함수
  handleImageSubmitFirst = () => {
    const formData = new FormData()
    const { FirstimageValue } = this.state

    formData.append("image", FirstimageValue, FirstimageValue.name)
    axios
      .patch("http://localhost:3000/profile/", formData)
      .then(response => {
        console.log(response.data)
      })
      .catch(err => console.log(err))
  }
  handleImageSubmitSecond = () => {
    const formData = new FormData()
    const { imageSecondValue } = this.state
    formData.append("imageTwo", imageSecondValue, imageSecondValue.name)
    console.log(formData)
    axios
      .patch("http://localhost:3000/profile/", formData)
      .then(response => {
        console.log(response.data)
      })
      .catch(err => console.log(err))
  }

  handleImageSubmitThird = () => {
    const formData = new FormData()
    const { imageThirdValue } = this.state
    console.log(formData)
    formData.append("imageThree", imageThirdValue, imageThirdValue.name)
    axios
      .patch("http://localhost:3000/profile/", formData)
      .then(response => {
        console.log(response.data)
      })
      .catch(err => console.log(err))
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
      previewSecond,
      previewThird
    } = this.state
    // event.preventDefault();
    // console.log(this.state);

    MyProfileActions.updateTeam({
      teamNameValue,
      teamIntroValue
    })

    if (preview) {
      this.handleImageSubmitFirst()
    }
    if (previewSecond) {
      this.handleImageSubmitSecond()
    }
    if (previewThird) {
      this.handleImageSubmitThird()
    }

    MyProfileActions.getMyProfile()
  }

  render() {
    const { MyProfileActions, isEditedProfile } = this.props
    const {
      teamNameValue,
      teamIntroValue,
      previewFirst,
      previewSecond,
      previewThird,
      FirstimageValue,
      imageSecondValue,
      imageThirdValue,
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
              name="FirstimageValue"
              className="image-uploader"
              accept="image/*"
            />
            <input
              style={{ display: "none" }}
              type="file"
              onChange={this.handleImageChangeSecond}
              ref={fileInputSecond => (this.fileInputSecond = fileInputSecond)}
              name="imageSecondValue"
              className="image-uploader"
              accept="image/*"
            />
            <input
              style={{ display: "none" }}
              type="file"
              onChange={this.handleImageChangeThird}
              ref={fileInputThird => (this.fileInputThird = fileInputThird)}
              name="imageThirdValue"
              className="image-uploader"
              accept="image/*"
            />

            <div className="title font-notosan">팀 이름</div>
            <input
              type="text"
              value={teamNameValue === null ? "" : teamNameValue}
              onChange={this.handleInputChange}
              className="text-input font-notosan"
              name="teamNameValue"
              placeholder="10자 이내로 작성해주세요"
            />

            <div className="title font-notosan">팀 소개</div>
            <div className="team-intro">
              <Textarea
                type="text"
                value={teamIntroValue === null ? "" : teamIntroValue}
                onChange={this.handleInputChange}
                className="text-input font-notosan"
                name="teamIntroValue"
                placeholder="30자 이내로 작성해주세요"
              />
            </div>

            <div className="ButtonWrap">
              {(previewFirst && previewSecond && previewThird) ||
              (FirstimageValue && imageSecondValue && imageThirdValue) ? (
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
            {!previewFirst ? (
              <div
                className="each-img flex-center"
                onClick={() => this.fileInputFirst.click()}
              >
                {FirstimageValue ? (
                  <img
                    className="user-img"
                    src={FirstimageValue}
                    alt="first_user_image"
                  />
                ) : (
                  <div className="App">
                    <img
                      className="smile"
                      src={require("../../images/smile.png")}
                      alt="empty_image"
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
                src={previewFirst}
                alt="first_user_image"
                onClick={() => this.fileInputFirst.click()}
              />
            )}
            {!previewSecond ? (
              <div
                className="each-img flex-center"
                onClick={() => this.fileInputSecond.click()}
              >
                {imageSecondValue ? (
                  <img
                    className="user-img"
                    src={imageSecondValue}
                    alt="second_user_image"
                  />
                ) : (
                  <div className="App">
                    <img
                      className="smile"
                      src={require("../../images/smile.png")}
                      alt="empty_image"
                    />
                    <div className="mt-2 font-16 font-bold">멤버2 사진</div>
                  </div>
                )}
              </div>
            ) : (
              <img
                className="each-img"
                src={previewSecond}
                alt="second_user_image"
                onClick={() => this.fileInputSecond.click()}
              />
            )}
            {!previewThird ? (
              <div
                className="each-img flex-center"
                onClick={() => this.fileInputThird.click()}
              >
                {imageThirdValue ? (
                  <img
                    className="user-img"
                    src={imageThirdValue}
                    alt="third_user_image"
                  />
                ) : (
                  <div className="App">
                    <img
                      className="smile"
                      src={require("../../images/smile.png")}
                      alt="empty_image"
                    />
                    <div className="mt-2 font-16 font-bold">멤버3 사진</div>
                  </div>
                )}
              </div>
            ) : (
              <img
                className="each-img"
                src={previewThird}
                alt="third_user_image"
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
