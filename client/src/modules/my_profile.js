import axios from "axios"
import { createAction } from "./utils"

const initialState = {
  isLoginAlready: null,
  myProfile: {
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
    validated: false,
    user: { username: null },
    company: { name: null }
  },
  clickedTab: "new"
}

const NEW_TAB_ON = `NEW_TAB_ON`
const PREV_TAB_ON = `PREV_TAB_ON`
const LOGIN_SUCCESS = `LOGIN_SUCCESS`
const LOGIN_FAILURE = `LOGIN_FAILURE`
const LOGOUT_SUCCESS = `LOGOUT_SUCCESS`
const GET_PROFILE = `GET_PROFILE`

export const newTabOn = () => createAction(NEW_TAB_ON)
export const prevTabOn = () => createAction(PREV_TAB_ON)

export const getMyProfile = () => {
  return dispatch => {
    axios({
      method: "get",
      url: "/profile"
    })
      .then(response => {
        dispatch(createAction(GET_PROFILE, response.data))
        dispatch(createAction(LOGIN_SUCCESS))
      })
      .catch(err => {
        dispatch(createAction(LOGIN_FAILURE))
        console.log("not working (getMyProfile) - " + err)
      })
  }
}

export const updateMyProfile = payload => {
  return dispatch => {
    axios({
      method: "patch",
      url: "/profile/",
      data: payload
    })
      .then(response => {
        dispatch(createAction(GET_PROFILE, response.data))
      })
      .catch(err => {
        console.log("not working (updateMyProfile) - " + err)
      })
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // TODO: NEW_TAB_ON과 PREV_TAB_ON은 나중에 하나로 합쳐도 되겠음 파라미터만 다르게 하고
    case NEW_TAB_ON: {
      return {
        ...state,
        clickedTab: "new"
      }
    }
    case PREV_TAB_ON: {
      return {
        ...state,
        clickedTab: "prev"
      }
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        isLoginAlready: true
      }
    }
    case LOGIN_FAILURE:
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        isLoginAlready: false
      }
    }
    case GET_PROFILE: {
      return {
        ...state,
        myProfile: action.data
      }
    }
    default:
      return state
  }
}

export default reducer
