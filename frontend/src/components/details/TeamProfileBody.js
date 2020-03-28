import React, { Component } from "react"
import "../../css/Profile.scss" //부모컴포넌트의CSS(SCSS)
import "../../App.css" //공통CSS
import Textarea from "react-textarea-autosize"
import axios from "axios"

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
  }

  //첫번째 이미지 관련 함수
  handleImageChangeFirst = event => {
    this.setState({
      imageFirstValue: event.target.files[0],
      previewFirst: URL.createObjectURL(event.target.files[0])
    })
  }

  //두번째 이미지 관련 함수
  handleImageChangeSecond = event => {
    this.setState({
      imageSecondValue: event.target.files[0],
      previewSecond: URL.createObjectURL(event.target.files[0])
    })
  }

  //세번째 이미지 관련 함수
  handleImageChangeThird = event => {
    this.setState({
      imageThirdValue: event.target.files[0],
      previewThird: URL.createObjectURL(event.target.files[0])
    })
  }
  //이미지 제출 함수
  handleImageSubmitFirst = () => {
    const formData = new FormData()
    const { imageFirstValue } = this.state
    const { updateMyProfile } = this.props
    formData.append("image", imageFirstValue, imageFirstValue.name)
    updateMyProfile(formData)
  }
  handleImageSubmitSecond = () => {
    const formData = new FormData()
    const { imageSecondValue } = this.state
    const { updateMyProfile } = this.props
    formData.append("imageTwo", imageSecondValue, imageSecondValue.name)
    updateMyProfile(formData)
  }

  handleImageSubmitThird = () => {
    const formData = new FormData()
    const { imageThirdValue } = this.state
    const { updateMyProfile } = this.props
    formData.append("imageThree", imageThirdValue, imageThirdValue.name)
    updateMyProfile(formData)
  }

  handleTeamPopup = event => {
    event.preventDefault()
    this.handleSubmit()
    alert("그룹이 생성되었습니다.")
  }

  handleSubmit = event => {
    const { getMyProfile, updateMyProfile } = this.props
    const {
      teamNameValue,
      teamIntroValue,
      previewFirst,
      previewSecond,
      previewThird
    } = this.state
    // event.preventDefault();
    // console.log(this.state);

    updateMyProfile({
      teamName: teamNameValue,
      teamIntroduce: teamIntroValue
    })

    if (previewFirst) {
      this.handleImageSubmitFirst()
    }
    if (previewSecond) {
      this.handleImageSubmitSecond()
    }
    if (previewThird) {
      this.handleImageSubmitThird()
    }

    getMyProfile()
  }

  render() {
    const { isEditedProfile } = this.props
    const {
      teamNameValue,
      teamIntroValue,
      previewFirst,
      previewSecond,
      previewThird,
      imageFirstValue,
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
              name="imageFirstValue"
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
              (imageFirstValue && imageSecondValue && imageThirdValue) ? (
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
        <div className="imgs-wrap">
          <div className="imgs">
            {!previewFirst ? (
              <div
                className="each-img flex-center"
                onClick={() => this.fileInputFirst.click()}
              >
                {imageFirstValue ? (
                  <img
                    className="user-img"
                    src={imageFirstValue}
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
