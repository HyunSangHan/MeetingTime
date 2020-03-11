import React, { Component, Fragment } from "react"
import { getMyProfile, updateMyProfile } from "../modules/my_profile"
import * as emailActions from "../modules/email"
import "../css/Profile.scss"
import "../App.css"
import Header from "./details/Header"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ageValue: null,
      companyValue: null,
      emailFront: null,
      code: null
    }
  }

  componentDidMount() {
    getMyProfile()
  }

  handleInputChange = event => {
    let { value, name } = event.target
    if (value === "10대") {
      value = 10
    } else if (value === "20대") {
      value = 20
    } else if (value === "30대") {
      value = 30
    } else if (value === "40대") {
      value = 40
    }
    this.setState({
      [name]: value
    })
  }

  onSend() {
    const { EmailActions } = this.props
    const { emailFront, companyValue } = this.state
    let emailCompany
    switch (
      companyValue //테스트용임
    ) {
      case "네이버":
        emailCompany = "@navercorp.com"
        break
      case "삼성":
        emailCompany = "@samsung.com"
        break
      case "멋쟁이사자처럼":
        emailCompany = "@likelion.org"
        break
      case "구글":
        emailCompany = "@google.com"
        break
      case "테슬라":
        emailCompany = "@tesla.com"
        break
      default:
        emailCompany = "[등록되지 않은 회사입니다!]"
        break
    }
    EmailActions.sendEmail({
      email: emailFront + emailCompany
    })
  }

  onValidate() {
    const { EmailActions } = this.props
    const { code } = this.state
    EmailActions.validateEmail({
      code: code
    })
  }

  handleSubmit = event => {
    const { history } = this.props
    const { ageValue, companyValue } = this.state
    console.log(this.state)
    event.preventDefault()
    updateMyProfile({ ageRange: ageValue, company: companyValue })
    getMyProfile().then(() => {
      //promise반환이 맞는지 추후 확인 필요 TODO: 추후 프로미스 반환하게 해두자 then을 쓰기 위해
      history.push("/")
    })
  }

  componentWillReceiveProps(nextProps) {
    const { myProfile } = nextProps
    this.setState({
      ageValue: myProfile.ageRange,
      companyValue: myProfile.company.name
    })
  }

  render() {
    const { myProfile, isLoginAlready } = this.props
    const { ageValue, companyValue } = this.state

    const isStoreLoaded =
      !isNaN(myProfile.ageRange) &&
      myProfile !== null &&
      isLoginAlready !== null

    return (
      <div className="frame bg-init-color">
        <Header content={"프로필 수정"} />
        {isStoreLoaded && (
          <div className="profile-form">
            <form
              className="form"
              onSubmit={this.handleSubmit}
              method="patch"
              encType="multipart/form-data"
            >
              <div className="title">성별</div>
              <div className="not-change Gender">
                <p>{myProfile.isMale ? "남자" : "여자"}</p>
              </div>
              <div className="title">연령대</div>
              <select
                name="ageValue"
                value={ageValue + "대"}
                onChange={this.handleInputChange}
              >
                <option disabled selected value>
                  &nbsp; - 선택 -&nbsp;
                </option>
                <option>10대</option>
                <option>20대</option>
                <option>30대</option>
                <option>40대</option>
                {/* <option>기타</option> */}
              </select>
              <div className="title">회사명</div>
              <select
                name="companyValue"
                value={companyValue}
                onChange={this.handleInputChange}
              >
                <option disabled selected value>
                  {" "}
                  - 선택 -{" "}
                </option>
                <option>네이버</option>
                <option>삼성</option>
                <option>멋쟁이사자처럼</option>
                <option>구글</option>
                <option>테슬라</option>
              </select>
              <div className="title">이메일</div>
              <div className="EmailSelect">
                <input
                  onChange={e => {
                    this.setState({ emailFront: e.target.value })
                  }}
                  placeholder="입력"
                ></input>
                {/* <span id="EmailAt">@</span> */}
                <select
                  name="companyValue"
                  className="ml-2"
                  value={companyValue}
                  onChange={this.handleInputChange}
                >
                  <option value> - </option>
                  <option value="네이버">@navercorp.com</option>
                  <option value="삼성">@samsung.com</option>
                  <option value="멋쟁이사자처럼">@likelion.org</option>
                  <option value="구글">@google.com</option>
                  <option value="테슬라">@tesla.com</option>
                </select>
              </div>
              {!this.props.sent ? (
                <Fragment>
                  <button
                    className="SendButton Send"
                    type="button"
                    onClick={e => this.onSend(e)}
                  >
                    인증하기
                  </button>
                </Fragment>
              ) : (
                <Fragment>
                  <div className="EmailValidation">
                    <input
                      onChange={e => {
                        this.setState({ code: e.target.value })
                      }}
                      placeholder="인증번호 입력"
                    ></input>
                    <button
                      className="SendButton"
                      type="button"
                      onClick={e => this.onValidate(e)}
                    >
                      인증
                    </button>
                  </div>
                  {this.props.validated ? (
                    <div className="ErrorMessage" style={{ color: "blue" }}>
                      인증되었습니다
                    </div>
                  ) : (
                    <div className="ErrorMessage" style={{ color: "red" }}>
                      인증되지 않았습니다
                    </div>
                  )}
                </Fragment>
              )}
            </form>
            <div className="FixedButton mt-4">
              {this.props.validated ? (
                <button className="SubmitButton WorkingButton">적용하기</button>
              ) : (
                <button
                  type="button"
                  className="SubmitButton NotWorkingButton"
                  onClick={() => alert("입력을 완료해주세요.")}
                >
                  적용하기
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  dispatch,
  EmailActions: bindActionCreators(emailActions, dispatch)
})

const mapStateToProps = state => ({
  isLoginAlready: state.isLoginAlready,
  myProfile: state.myProfile,
  sent: state.email.get("sent"),
  validated: state.email.get("validated")
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
