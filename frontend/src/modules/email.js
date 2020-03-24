import axios from "axios"
import { createAction } from "./utils"

const SEND_EMAIL = `SEND_EMAIL`
const VALIDATE_SUCCESS = `VALIDATE_SUCCESS`
const VALIDATE_FAILURE = `VALIDATE_FAILURE`

const initialState = {
  sent: false,
  validated: false
}

export const sendEmail = payload => {
  return dispatch => {
    axios({
      method: "post",
      url: "/email/",
      data: payload
    })
      .then(response => {
        console.log(response.data)
        dispatch(createAction(SEND_EMAIL))
      })
      .catch(err => console.log(err))
  }
}

export const validateEmail = payload => {
  return dispatch => {
    axios({
      method: "post",
      url: "/validate/",
      data: payload
    })
      .then(() => {
        dispatch(createAction(VALIDATE_SUCCESS))
      })
      .catch(err => {
        console.log(err)
        dispatch(createAction(VALIDATE_FAILURE))
      })
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_EMAIL:
      return {
        ...state,
        sent: true
      }
    case VALIDATE_SUCCESS:
      return {
        ...state,
        validated: true
      }
    case VALIDATE_FAILURE:
      return {
        ...state,
        validated: false
      }
    default:
      return state
  }
}

export default reducer
