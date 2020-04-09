import axios from "axios"
import { createAction } from "./utils"

const GET_JOINED_USER_SUCCESS = `GET_JOINED_USER_SUCCESS`
const GET_JOINED_USER_FAILURE = `GET_JOINED_USER_FAILURE`
const GET_JOINED_USER = `GET_JOINED_USER`

const initialState = {
  isJoinedAlready: null,
  joinedUser: {
    profile: {
      ageRange: null,
      company: {
        name: null
      },
      createdAt: null,
      id: null,
      imageFirst: null,
      imageSecond: null,
      imageThird: null,
      isMale: false,
      lastIntroModifiedAt: null,
      lastLoginAt: null,
      teamIntroduce: null,
      user: {
        username: null
      },
      isValidated: false
    },
    rank: null,
    isMatched: null,
    meeting: null
  }
}

export const getJoinedUser = () => {
  return dispatch => {
    axios({
      method: "get",
      url: "/join"
    })
      .then(response => {
        dispatch(createAction(GET_JOINED_USER_SUCCESS))
        dispatch(createAction(GET_JOINED_USER, response.data))
      })
      .catch(err => {
        console.log("not working - " + err)
        dispatch(createAction(GET_JOINED_USER_FAILURE))
      })
  }
}

export const createJoinedUser = () => {
  return dispatch => {
    axios({
      method: "post",
      url: "/join/"
    })
      .then(response => {
        dispatch(createAction(GET_JOINED_USER_SUCCESS))
        dispatch(createAction(GET_JOINED_USER, response.data))
      })
      .catch(err => {
        console.log("not working - " + err)
      })
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_JOINED_USER_SUCCESS:
      return {
        ...state,
        isJoinedAlready: true
      }
    case GET_JOINED_USER_FAILURE:
      return {
        ...state,
        isJoinedAlready: false
      }
    case GET_JOINED_USER:
      return {
        ...state,
        joinedUser: action.data
      }
    default:
      return state
  }
}

export default reducer
