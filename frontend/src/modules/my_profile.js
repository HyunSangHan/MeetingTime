import { createAction, handleActions } from "redux-actions"
import { Map } from "immutable"
import axios from "axios"
import { pender } from "redux-pender"

const GET_PROFILE = `GET_PROFILE`
const UPDATE_PROFILE = `UPDATE_PROFILE`
const CREATE_POPUP = `CREATE_POPUP`
const DELETE_POPUP = `DELETE_POPUP`
const NEW_TAB_ON = `NEW_TAB_ON`
const PREV_TAB_ON = `PREV_TAB_ON`
const LOGIN_SUCCESS = `LOGIN_SUCCESS`
const LOGOUT_SUCCESS = `LOGOUT_SUCCESS`

const initialState = Map({
  isLoginAlready: null,
  myProfile: {
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
    },
    validated: null
  },
  isEditedProfile: null,
  clickedTab: "new"
})

export default handleActions(
  {
    ...pender({
      type: GET_PROFILE,
      onSuccess: (state, action) =>
        state.set("myProfile", action.payload.data).set("isLoginAlready", true),
      onFailure: (state, action) => state.set("isLoginAlready", false)
    }),

    [CREATE_POPUP]: state => {
      return state.set("isEditedProfile", true)
    },

    [DELETE_POPUP]: state => {
      return state.set("isEditedProfile", false)
    },

    ...pender({
      type: UPDATE_PROFILE,
      onSuccess: (state, action) =>
        state
          .set("myProfile.user.username", action.payload.data)
          .set("isLoginAlready", true),
      onFailure: (state, action) => state.set("isLoginAlready", false)
    }),

    [NEW_TAB_ON]: state => {
      return state.set("clickedTab", "new")
    },

    [PREV_TAB_ON]: state => {
      return state.set("clickedTab", "prev")
    },

    [LOGIN_SUCCESS]: state => {
      return state.set("isLoginAlready", true)
    },

    [LOGOUT_SUCCESS]: state => {
      return state.set("isLoginAlready", false)
    }
  },
  initialState
)

//팝업용 액션
export const createPopup = createAction(CREATE_POPUP)
export const deletePopup = createAction(DELETE_POPUP)

export const getMyProfile = createAction(GET_PROFILE, () =>
  axios({
    method: "get",
    url: "/profile"
  })
    .then(response => {
      return response
    })
    .catch(err => {
      console.log("not working (getProfile) - " + err)
    })
)

export const updateProfile = createAction(UPDATE_PROFILE, payload =>
  axios({
    method: "patch",
    url: "/profile/",
    data: {
      ageRange: payload.ageValue
    }
  })
    .then(response => {
      console.log(response.data)
      return response
    })
    .catch(err => {
      console.log("not working (updateProfile) - " + err)
    })
)

export const updateCompany = createAction(UPDATE_PROFILE, payload =>
  axios({
    method: "patch",
    url: "/company/",
    data: {
      name: payload.companyValue
    }
  })
    .then(response => {
      console.log(response.data)
      return response
    })
    .catch(err => {
      console.log("not working (updateProfile) - " + err)
    })
)

export const updateTeam = createAction(UPDATE_PROFILE, payload =>
  axios({
    method: "patch",
    url: "/profile/",
    data: {
      image: payload.imageValue,
      imageTwo: payload.imageTwoBalue,
      imageThree: payload.imageThreeValue,
      teamName: payload.teamNameValue,
      teamIntroduce: payload.teamIntroValue
    }
  })
    .then(response => {
      console.log(response.data)
      return response
    })
    .catch(err => {
      console.log("not working (updateProfile) - " + err)
    })
)

//TwoTab.js용
export const newTabOn = createAction(NEW_TAB_ON)
export const prevTabOn = createAction(PREV_TAB_ON)
export const loginSuccess = createAction(LOGIN_SUCCESS)
export const logoutSuccess = createAction(LOGOUT_SUCCESS)
