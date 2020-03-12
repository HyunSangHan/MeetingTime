import { Map } from "immutable"
import axios from "axios"
import { createAction } from "./utils"

const GET_COUNTER_PROFILE = `GET_COUNTER_PROFILE`
const GET_COUNTER_PROFILE_SUCCESS = `GET_COUNTER_PROFILE_SUCCESS`
const GET_COUNTER_PROFILE_FAILURE = `GET_COUNTER_PROFILE_FAILURE`
const GREEN_LIGHT_ON = `GREEN_LIGHT_ON` // 추후 컴포넌트 state로 해결가능하게 될 수 있겠음
const GREEN_LIGHT_OFF = `GREEN_LIGHT_OFF` // 추후 컴포넌트 state로 해결가능하게 될 수 있겠음
const GIFT_ON = `GIFT_ON` // 추후 컴포넌트 state로 해결가능하게 될 수 있겠음

//counter_profile 받아오기 + 그린라이트 액션

const initialState = Map({
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
})

export const getCounterProfile = () => {
  return dispatch => {
    axios({
      method: "get",
      url: "/counter_profile"
    })
      .then(response => {
        console.log(response.data)
        dispatch(GET_COUNTER_PROFILE, response.data)
        dispatch(GET_COUNTER_PROFILE_SUCCESS)
      })
      .catch(err => {
        console.log("not working (counterProfile) - " + err)
        dispatch(GET_COUNTER_PROFILE_FAILURE)
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
        console.log(response.data)
        const isMale = getState().myProfile.isMale
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

//TODO: 추후 컴포넌트 state로 해결가능하게 될 수 있겠음
export const handleGift = payload => {
  return (dispatch, getState) => {
    axios({
      method: "patch",
      url: "/current_matching/",
      data: payload
    })
      .then(response => {
        console.log(response.data)
        const isMale = getState().myProfile.isMale
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
  }
}

export default reducer
