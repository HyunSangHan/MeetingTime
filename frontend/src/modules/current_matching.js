import axios from "axios"
import { createAction } from "./utils"

const GET_CURRENT_MATCHING = `GET_CURRENT_MATCHING`
const GET_CURRENT_MATCHING_SUCCESS = `GET_CURRENT_MATCHING_SUCCESS`
const GET_CURRENT_MATCHING_FAILURE = `GET_CURRENT_MATCHING_FAILURE`

const initialState = {
  isCurrentMatching: false,
  currentMatching: {}
}

export const getCurrentMatching = () => {
  return dispatch => {
    axios({
      method: "get",
      url: "/current_matching"
    })
      .then(response => {
        console.log(response.data)
        dispatch(createAction(GET_CURRENT_MATCHING, response.data))
        dispatch(createAction(GET_CURRENT_MATCHING_SUCCESS))
      })
      .catch(err => {
        console.log(err + "not working (currentMatching)")
        dispatch(createAction(GET_CURRENT_MATCHING_FAILURE))
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
    default:
      return state
  }
}

export default reducer
