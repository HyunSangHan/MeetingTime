import React, { Component, Fragment } from "react"
import { getMyProfile, updateMyProfile } from "../modules/my_profile"
import { sendEmail, validateEmail } from "../modules/validation"
import "../css/Profile.scss"
import "../App.css"
import Header from "./details/Header"
import Loading from "./details/Loading"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { isEmpty } from "../modules/utils"

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ageValue: "default",
      companyValue: "default",
      emailValue: null,
      emailFront: null,
      code: null,
      validationButtonClicked: false,
      companyArr: null
    }
  }

  componentDidMount() {
    this.props.getMyProfile()

    fetch('/company_registration/')
    .then(response => {
      return response.json()
    }).then(response => {
      this.setState({
        companyArr: response
      })
    })
    .catch(err => console.log(err))
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
      default:
        emailCompany = "[등록되지 않은 회사입니다!]"
        break
    }
    if (!isEmpty(emailFront)) {
      this.props.sendEmail({
        email: emailFront + emailCompany
      })
      console.log(emailFront + emailCompany + "로 인증메일을 보냅니다.")
      this.setState({
        emailValue: emailFront + emailCompany
      })
    } else {
      window.alert("이메일주소를 입력하세요.")
    }
  }

  onValidate() {
    const { code } = this.state
    this.setState({
      validationButtonClicked: true
    })
    this.props.validateEmail({
      code: code
    })
  }

  handleSubmit = event => {
    const { history, updateMyProfile } = this.props
    const { ageValue, companyValue, emailValue } = this.state
    event.preventDefault()
    updateMyProfile({ ageRange: ageValue, company: companyValue, email: emailValue})
    window.alert("프로필 수정이 완료되었습니다.")
    history.push("/")
  }


  static getDerivedStateFromProps(nextProps, prevState) {
    const { myProfile } = nextProps
    if (prevState.companyValue === "default" && !isEmpty(myProfile.ageRange)) {
      return {
        ageValue: myProfile.ageRange,
        companyValue: myProfile.company.name
      }
    }
    return null
  }

  render() {
    const { myProfile, isLoginAlready, validated } = this.props
    const { ageValue, companyValue, validationButtonClicked, companyArr } = this.state
    const isStoreLoaded =
      !isEmpty(myProfile) &&
      !isNaN(myProfile.ageRange) &&
      !isEmpty(isLoginAlready)

    return (
      <div className="frame bg-init-color">
        <Header content={"프로필 수정"} />
        {isStoreLoaded ? (
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
                value={ageValue}
                onChange={this.handleInputChange}
              >
                <option value="default"> - 선택 - </option>
                <option value={10}>10대</option>
                <option value={20}>20대</option>
                <option value={30}>30대</option>
                <option value={40}>40대</option>
                {/* <option>기타</option> */}
              </select>
              <div className="title">회사명</div>
              <select
                name="companyValue"
                value={companyValue}
                onChange={this.handleInputChange}
              >
                <option value="default"> - 선택 - </option>
                {companyArr && Array.from(companyArr).map(company => {
                  return <option value={company.name} key={company.id}>{company.name}</option>
                })}
              </select>
              <div className="title">이메일</div>
              <div className="email-select">
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
                  <option value="default"> - </option>
                  {companyArr && Array.from(companyArr).map(company => {
                  return (<option value={company.name} key={company.id}>{company.domain}</option>)
                })}
                </select>
              </div>
              {!this.props.sent ? (
                <Fragment>
                  <button
                    className="SendButton Send"
                    type="button"
                    onClick={e => this.onSend(e)}
                  >
                    {this.props.myProfile.validated ? "재인증하기" : "인증하기"}
                  </button>
                  { myProfile.validated && !validated && 
                    <div className="ErrorMessage" style={{ color: "blue" }}>
                      이미 { myProfile.company.name} 사내 메일계정으로 인증이 완료되었습니다.
                    </div>
                  }
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
                  {validated ? (
                    <div className="ErrorMessage" style={{ color: "blue" }}>
                      인증되었습니다
                    </div>
                  ) : (
                    <div className="ErrorMessage" style={{ color: "red" }}>
                      {validationButtonClicked ? "인증에 실패했습니다" : "이메일로 발송된 인증코드를 입력해주세요."}
                    </div>
                  )}
                </Fragment>
              )}
            </form>
            <div className="FixedButton mt-4">
              {validated ? (
                <button
                  className="SubmitButton WorkingButton"
                  onClick={this.handleSubmit}
                >
                  적용하기
                </button>
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
        ) : (
          <Loading />
        )}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    getMyProfile: bindActionCreators(getMyProfile, dispatch),
    updateMyProfile: bindActionCreators(updateMyProfile, dispatch),
    sendEmail: bindActionCreators(sendEmail, dispatch),
    validateEmail: bindActionCreators(validateEmail, dispatch)
  }
}

const mapStateToProps = state => ({
  isLoginAlready: state.my_profile.isLoginAlready,
  myProfile: state.my_profile.myProfile,
  sent: state.validation.sent,
  validated: state.validation.validated
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
