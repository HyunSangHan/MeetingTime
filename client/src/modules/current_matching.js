import axios from "axios"
import { createAction } from "./utils"

const GET_CURRENT_MATCHING = `GET_CURRENT_MATCHING`
const GET_CURRENT_MATCHING_SUCCESS = `GET_CURRENT_MATCHING_SUCCESS`
const GET_CURRENT_MATCHING_FAILURE = `GET_CURRENT_MATCHING_FAILURE`
const GET_COUNTER_PROFILE = `GET_COUNTER_PROFILE`
const GET_COUNTER_PROFILE_SUCCESS = `GET_COUNTER_PROFILE_SUCCESS`
const GET_COUNTER_PROFILE_FAILURE = `GET_COUNTER_PROFILE_FAILURE`
const GREEN_LIGHT_ON = `GREEN_LIGHT_ON`
const GREEN_LIGHT_OFF = `GREEN_LIGHT_OFF`
const GIFT_ON = `GIFT_ON`
const COUNTER_GIFT_ON = `COUNTER_GIFT_ON`

const initialState = {
  hasCurrentMatching: false,
  currentMatching: {
    id: null,
    trialTime: null,
    isGreenlightMale: false,
    isGreenlightFemale: false,
    isGiftMale: false,
    isGiftFemale: false,
    joinedMale: {
      profile: {
        imageFirst: null,
        imageSecond: null,
        imageThird: null,
        isMale: null,
        ageRange: null,
        createdAt: null,
        lastLoginAt: null,
        teamName: null,
        teamIntroduce: "",
        lastIntroModifiedAt: null,
        isValidated: null,
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
        imageFirst: null,
        imageSecond: null,
        imageThird: null,
        isMale: null,
        ageRange: null,
        createdAt: null,
        lastLoginAt: null,
        teamName: null,
        teamIntroduce: "",
        lastIntroModifiedAt: null,
        isValidated: null,
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
  isCounterGiftOn: false,
  counterProfile: {
    imageFirst: null,
    imageSecond: null,
    imageThird: null,
    isMale: null,
    ageRange: null,
    createdAt: null,
    lastLoginAt: null,
    teamName: null,
    teamIntroduce: "",
    lastIntroModifiedAt: null,
    isValidated: null,
    user: {
      username: null
    },
    company: {
      name: null
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
        const counterGiftOn =
          (isMale && response.data.isGiftFemale) ||
          (!isMale && response.data.isGiftMale)
        if (giftOn) dispatch(createAction(GIFT_ON))
        if (counterGiftOn) dispatch(createAction(COUNTER_GIFT_ON))
        dispatch(createAction(GET_CURRENT_MATCHING, response.data))
        dispatch(createAction(GET_CURRENT_MATCHING_SUCCESS))
        dispatch(createAction(GET_COUNTER_PROFILE_SUCCESS))

        isMale
          ? dispatch(
              createAction(
                GET_COUNTER_PROFILE,
                response.data.joinedFemale.profile
              )
            )
          : dispatch(
              createAction(
                GET_COUNTER_PROFILE,
                response.data.joinedMale.profile
              )
            )
      })
      .catch(err => {
        console.log(err + "not working (currentMatching)")
        dispatch(createAction(GET_CURRENT_MATCHING_FAILURE))
        dispatch(createAction(GET_COUNTER_PROFILE_FAILURE))
      })
  }
}

// deprecated TODO: 추후 최종 결과 확인에서 로직상 필요없게 되면 삭제
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
      })
      .catch(err => {
        console.log("not working (greenlight api) - " + err)
      })
  }
}

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
        hasCurrentMatching: true
      }
    }
    case GET_CURRENT_MATCHING_FAILURE: {
      return {
        ...state,
        hasCurrentMatching: false
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
    case COUNTER_GIFT_ON:
      return {
        ...state,
        isCounterGiftOn: true
      }
    default:
      return state
  }
}

export default reducer
