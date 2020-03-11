import { Map } from "immutable"
import axios from "axios"

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

const createAction = (actionType, data) => {
  if (!data) {
    return {
      type: actionType
    }
  } else {
    return {
      type: actionType,
      data: data
    }
  }
}

const CREATE_POPUP = `CREATE_POPUP`
const DELETE_POPUP = `DELETE_POPUP`
const NEW_TAB_ON = `NEW_TAB_ON`
const PREV_TAB_ON = `PREV_TAB_ON`
const LOGIN_SUCCESS = `LOGIN_SUCCESS`
const LOGIN_FAILURE = `LOGIN_FAILURE`
const LOGOUT_SUCCESS = `LOGOUT_SUCCESS`
const GET_PROFILE = `GET_PROFILE`

export const createPopup = createAction(CREATE_POPUP)
export const deletePopup = createAction(DELETE_POPUP)
export const newTabOn = createAction(NEW_TAB_ON)
export const prevTabOn = createAction(PREV_TAB_ON)
export const loginSuccess = createAction(LOGIN_SUCCESS)
export const loginFailure = createAction(LOGIN_FAILURE)
export const logoutSuccess = createAction(LOGOUT_SUCCESS)

export const getMyProfile = () => {
  return dispatch => {
    axios({
      method: "get",
      url: "/profile"
    })
      .then(response => {
        console.log(response)
        dispatch(createAction(GET_PROFILE, response))
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
        console.log(response)
        dispatch(createAction(GET_PROFILE, response.data))
      })
      .catch(err => {
        console.log("not working (updateMyProfile) - " + err)
      })
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_POPUP: {
      return {
        ...state,
        isEditedProfile: true
      }
    }
    case DELETE_POPUP: {
      return {
        ...state,
        isEditedProfile: false
      }
    }
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
