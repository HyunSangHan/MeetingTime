import React, { Component } from "react"
import ExifOrientationImg from "react-exif-orientation-img"
import "../../css/Profile.scss" //부모컴포넌트의CSS(SCSS)
import "../../App.css" //공통CSS
import Textarea from "react-textarea-autosize"
import { isObject, isEmpty } from "../../modules/utils"

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

  //텍스트 수정 관련 메서드
  handleTextInputChange = event => {
    const {
      target: { value, name }
    } = event
    this.setState({
      [name]: value
    })
  }

  //이미지 수정 관련 메서드
  handleImageInputChange = event => {
    const previewSets = {
      imageFirstValue: "previewFirst",
      imageSecondValue: "previewSecond",
      imageThirdValue: "previewThird"
    }

    this.setState({
      [event.target.name]: event.target.files[0],
      [previewSets[event.target.name]]: URL.createObjectURL(
        event.target.files[0]
      )
    })
  }

  handleSubmit = event => {
    const {
      teamNameValue,
      teamIntroValue,
      previewFirst,
      previewSecond,
      previewThird,
      imageFirstValue,
      imageSecondValue,
      imageThirdValue
    } = this.state

    event.preventDefault()
    if (
      !isEmpty(teamNameValue) ||
      !isEmpty(teamIntroValue) ||
      previewFirst ||
      previewSecond ||
      previewThird
    ) {
      const formData = new FormData()
      const { updateMyProfile } = this.props
      isObject(imageFirstValue) &&
        formData.append("image", imageFirstValue, imageFirstValue.name)
      isObject(imageSecondValue) &&
        formData.append("imageTwo", imageSecondValue, imageSecondValue.name)
      isObject(imageThirdValue) &&
        formData.append("imageThree", imageThirdValue, imageThirdValue.name)
      !isEmpty(teamNameValue) && formData.append("teamName", teamNameValue)
      !isEmpty(teamIntroValue) &&
        formData.append("teamIntroduce", teamIntroValue)

      updateMyProfile(formData)
      if (this.props.clickedTab === "new") alert("그룹이 생성되었습니다.")
      else if (this.props.clickedTab === "prev")
        alert("그룹정보가 업데이트 되었습니다.")
    } else {
      alert("입력을 완료해주세요.")
    }
  }

  render() {
    const {
      teamNameValue,
      teamIntroValue,
      previewFirst,
      previewSecond,
      previewThird,
      imageFirstValue,
      imageSecondValue,
      imageThirdValue
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
              onChange={this.handleImageInputChange}
              ref={fileInputFirst => (this.fileInputFirst = fileInputFirst)}
              name="imageFirstValue"
              className="image-uploader"
              accept="image/*"
            />
            <input
              style={{ display: "none" }}
              type="file"
              onChange={this.handleImageInputChange}
              ref={fileInputSecond => (this.fileInputSecond = fileInputSecond)}
              name="imageSecondValue"
              className="image-uploader"
              accept="image/*"
            />
            <input
              style={{ display: "none" }}
              type="file"
              onChange={this.handleImageInputChange}
              ref={fileInputThird => (this.fileInputThird = fileInputThird)}
              name="imageThirdValue"
              className="image-uploader"
              accept="image/*"
            />

            <div className="title font-notosan">팀 이름</div>
            <input
              type="text"
              value={isEmpty(teamNameValue) ? "" : teamNameValue}
              onChange={this.handleTextInputChange}
              className="text-input font-notosan"
              name="teamNameValue"
              placeholder="10자 이내로 작성해주세요"
            />

            <div className="title font-notosan">팀 소개</div>
            <div className="team-intro">
              <Textarea
                type="text"
                value={isEmpty(teamIntroValue) ? "" : teamIntroValue}
                onChange={this.handleTextInputChange}
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
                  onClick={this.handleSubmit}
                >
                  {this.props.clickedTab === "new"
                    ? "그룹만들기"
                    : "그룹정보 업데이트"}
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
                  <ExifOrientationImg
                    className="user-img"
                    src={imageFirstValue}
                    alt="first_user_image"
                  />
                ) : (
                  <div className="App">
                    <ExifOrientationImg
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
              <ExifOrientationImg
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
                  <ExifOrientationImg
                    className="user-img"
                    src={imageSecondValue}
                    alt="second_user_image"
                  />
                ) : (
                  <div className="App">
                    <ExifOrientationImg
                      className="smile"
                      src={require("../../images/smile.png")}
                      alt="empty_image"
                    />
                    <div className="mt-2 font-16 font-bold">멤버2 사진</div>
                  </div>
                )}
              </div>
            ) : (
              <ExifOrientationImg
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
                  <ExifOrientationImg
                    className="user-img"
                    src={imageThirdValue}
                    alt="third_user_image"
                  />
                ) : (
                  <div className="App">
                    <ExifOrientationImg
                      className="smile"
                      src={require("../../images/smile.png")}
                      alt="empty_image"
                    />
                    <div className="mt-2 font-16 font-bold">멤버3 사진</div>
                  </div>
                )}
              </div>
            ) : (
              <ExifOrientationImg
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
