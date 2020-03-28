import axios from "axios"
import { createAction } from "./utils"

const GET_CURRENT_MATCHING = `GET_CURRENT_MATCHING`
const GET_CURRENT_MATCHING_SUCCESS = `GET_CURRENT_MATCHING_SUCCESS`
const GET_CURRENT_MATCHING_FAILURE = `GET_CURRENT_MATCHING_FAILURE`
const GET_COUNTER_PROFILE = `GET_COUNTER_PROFILE`
const GET_COUNTER_PROFILE_SUCCESS = `GET_COUNTER_PROFILE_SUCCESS`
const GET_COUNTER_PROFILE_FAILURE = `GET_COUNTER_PROFILE_FAILURE`
const GREEN_LIGHT_ON = `GREEN_LIGHT_ON` // 추후 컴포넌트 state로 해결가능하게 될 수 있겠음
const GREEN_LIGHT_OFF = `GREEN_LIGHT_OFF` // 추후 컴포넌트 state로 해결가능하게 될 수 있겠음
const GIFT_ON = `GIFT_ON` // 추후 컴포넌트 state로 해결가능하게 될 수 있겠음

const initialState = {
  isCurrentMatching: false,
  currentMatching: {
    id: null,
    trialTime: null,
    isGreenlightMale: false,
    isGreenlightFemale: false,
    isGiftMale: false,
    isGiftFemale: false,
    joinedMale: {
      profile: {
        image: null,
        imageTwo: null,
        imageThree: null,
        isMale: null,
        ageRange: null,
        createdAt: null,
        lastLoginAt: null,
        teamName: null,
        teamIntroduce: "",
        lastIntroModifiedAt: null,
        validated: null,
        user: {
          username: null
        },
        company: {
          name: null
        }
      },
      rank: null,
      isMatched: false,
      meeting: null
    },
    joinedFemale: {
      profile: {
        image: null,
        imageTwo: null,
        imageThree: null,
        isMale: null,
        ageRange: null,
        createdAt: null,
        lastLoginAt: null,
        teamName: null,
        teamIntroduce: "",
        lastIntroModifiedAt: null,
        validated: null,
        user: {
          username: null
        },
        company: {
          name: null
        }
      },
      rank: null,
      isMatched: false,
      meeting: null
    },
    kakaoChattingroom: null
  },
  hasCounterProfile: false,
  isGreenlightOn: false,
  isGiftOn: false,
  counterProfile: {
    ageRange: null,
    company: {
      name: null
    },
    createdAt: null,
    id: null,
    image: null,
    imageTwo: null,
    imageThree: null,
    isMale: null,
    lastIntroModifiedAt: null,
    lastLoginAt: null,
    teamIntroduce: null,
    user: {
      username: null
    }
  }
}

export const getCurrentMatching = () => {
  return (dispatch, getState) => {
    axios({
      method: "get",
      url: "/current_matching"
    })
      .then(response => {
        const isMale = getState().my_profile.myProfile.isMale
        const giftOn =
          (isMale && response.data.isGiftMale) ||
          (!isMale && response.data.isGiftFemale)
        dispatch(createAction(GET_CURRENT_MATCHING, response.data))
        dispatch(createAction(GET_CURRENT_MATCHING_SUCCESS))
        if (giftOn) dispatch(createAction(GIFT_ON))
      })
      .catch(err => {
        console.log(err + "not working (currentMatching)")
        dispatch(createAction(GET_CURRENT_MATCHING_FAILURE))
      })
  }
}

export const getCounterProfile = () => {
  return dispatch => {
    axios({
      method: "get",
      url: "/counter_profile"
    })
      .then(response => {
        dispatch(createAction(GET_COUNTER_PROFILE, response.data))
        dispatch(createAction(GET_COUNTER_PROFILE_SUCCESS))
      })
      .catch(err => {
        console.log("not working (counterProfile) - " + err)
        dispatch(createAction(GET_COUNTER_PROFILE_FAILURE))
      })
  }
}

//TODO: 추후 컴포넌트 state로 해결가능하게 될 수 있겠음
export const handleGreenLight = payload => {
  return (dispatch, getState) => {
    axios({
      method: "patch",
      url: "/current_matching/",
      data: payload
    })
      .then(response => {
        const isMale = getState().my_profile.myProfile.isMale
        if (isMale && response.data.isGreenlightMale) {
          dispatch(createAction(GREEN_LIGHT_ON))
        } else if (!isMale && response.data.isGreenlightFemale) {
          dispatch(createAction(GREEN_LIGHT_ON))
        } else {
          dispatch(createAction(GREEN_LIGHT_OFF))
        }

        /// TODO: 프로미스 리턴 넣어줘야함
      })
      .catch(err => {
        console.log("not working (greenlight api) - " + err)
      })
  }
}

//TODO: 추후 컴포넌트 state로 해결가능하게 될 수 있겠음
export const handleGift = payload => {
  return (dispatch, getState) => {
    axios({
      method: "patch",
      url: "/current_matching/",
      data: payload
    })
      .then(response => {
        const isMale = getState().my_profile.myProfile.isMale
        if (isMale && response.data.isGiftMale) {
          dispatch(createAction(GIFT_ON))
        } else if (!isMale && response.data.isGiftFemale) {
          dispatch(createAction(GIFT_ON))
        }
      })
      .catch(err => {
        console.log("not working (gift api) - " + err)
      })
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CURRENT_MATCHING: {
      return {
        ...state,
        currentMatching: action.data
      }
    }
    case GET_CURRENT_MATCHING_SUCCESS: {
      return {
        ...state,
        isCurrentMatching: true
      }
    }
    case GET_CURRENT_MATCHING_FAILURE: {
      return {
        ...state,
        isCurrentMatching: false
      }
    }
    case GET_COUNTER_PROFILE:
      return {
        ...state,
        counterProfile: action.data
      }
    case GET_COUNTER_PROFILE_SUCCESS:
      return {
        ...state,
        hasCounterProfile: true
      }
    case GET_COUNTER_PROFILE_FAILURE:
      return {
        ...state,
        hasCounterProfile: false
      }
    case GREEN_LIGHT_ON:
      return {
        ...state,
        isGreenlightOn: true
      }
    case GREEN_LIGHT_OFF:
      return {
        ...state,
        isGreenlightOn: false
      }
    case GIFT_ON:
      return {
        ...state,
        isGiftOn: true
      }
    default:
      return state
  }
}

export default reducer
