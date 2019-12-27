import { createAction, handleActions } from "redux-actions"
import { Map } from "immutable"
import axios from "axios"
import { pender } from "redux-pender"

const COUNTER_PROFILE = "COUNTER_PROFILE"
const GREEN_LIGHT_ON = "GREEN_LIGHT_ON"
const GREEN_LIGHT_OFF = "GREEN_LIGHT_OFF"
const GIFT_ON = "GIFT_ON"
// const GIFT_OFF = "GIFT_OFF"
const CREATE_POPUP = "CREATE_POPUP"
const DELETE_POPUP = "DELETE_POPUP"

//counter_profile 받아오기 + 그린라이트 액션

const initialState = Map({
  isCounterProfile: false,
  isGiftPopup: false,
  isGiftAlready: false,

  counterProfile: {
    ageRange: null,
    company: {
      name: null
    },
    createdAt: null,
    id: 21,
    image: null,
    imageTwo: null,
    imageThree: null,
    isMale: false,
    lastIntroModifiedAt: null,
    lastLoginAt: null,
    teamIntroduce: null,
    user: {
      username: null
    }
  }
})

export default handleActions(
  {
    [CREATE_POPUP]: state => {
      return state.set("isGiftPopup", true)
    },

    [DELETE_POPUP]: state => {
      console.log("팝업삭제눌림")
      return state.set("isGiftPopup", false)
    },

    ...pender({
      type: GREEN_LIGHT_ON
    }),

    ...pender({
      type: GREEN_LIGHT_OFF
    }),

    ...pender({
      type: GIFT_ON,
      onSuccess: (state, action) => state.set("isGiftAlready", true),
      onFailure: (state, action) => state.set("isGiftAlready", false)
    }),

    ...pender({
      type: COUNTER_PROFILE,
      onSuccess: (state, action) =>
        state
          .set("counterProfile", action.payload.data)
          .set("isCounterProfile", true),
      onFailure: (state, action) => state.set("isCounterProfile", false)
    })
  },
  initialState
)

//GIFT CONFIRM POPUP
export const createPopup = createAction(CREATE_POPUP)
export const deletePopup = createAction(DELETE_POPUP)

//'''Get Counter_profile'''
export const getCounterProfile = createAction(COUNTER_PROFILE, payload =>
  axios({
    method: "get",
    url: "/counter_profile"
  })
    .then(response => {
      console.log(response)
      return response
    })
    .catch(err => {
      console.log("not working (counterProfile) - " + err)
    })
)

//'''GreenLight Actions [ON/OFF]'''
export const handleGreenLightOn = createAction(GREEN_LIGHT_ON, payload =>
  axios({
    method: "patch",
    url: "/current_matching/",
    data: {
      isGreenlightMale: payload.male,
      isGreenlightFemale: payload.female
    }
  })
    .then(response => {
      console.log(response)
      return response
    })
    .catch(err => {
      console.log("not working (greenlight api) - " + err)
    })
)

export const handleGreenLightOff = createAction(GREEN_LIGHT_OFF, payload =>
  axios({
    method: "patch",
    url: "/current_matching/",
    data: {
      isGreenlightMale: payload.male,
      isGreenlightFemale: payload.female
    }
  })
    .then(response => {
      console.log(response)
      return response
    })
    .catch(err => {
      console.log("not working (greenlight api) - " + err)
    })
)

//'''Gift Actions only On'''
export const handleGiftOn = createAction(GIFT_ON, payload =>
  axios({
    method: "patch",
    url: "/current_matching/",
    data: {
      isGiftMale: payload.male,
      isGiftFemale: payload.female
    }
  })
    .then(response => {
      console.log(response)
      return response
    })
    .catch(err => {
      console.log("not working (gift api) - " + err)
    })
)
