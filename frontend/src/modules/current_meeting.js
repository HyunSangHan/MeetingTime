import { Map } from "immutable"
import axios from "axios"

const GET_CURRENT_MEETING = `GET_CURRENT_MEETING`

const initialState = Map({
  currentMeeting: Map({})
})

export const getCurrentMeeting = () => {
  return dispatch => {
    axios({
      method: "get",
      url: "/current_meeting"
    })
      .then(response => {
        console.log("this is working OOOOO")
        console.log(response.data)
        dispatch({ type: GET_CURRENT_MEETING, data: response.data })
      })
      .catch(err => {
        console.log("not working - " + err)
      })
  }
}

const reducer = (state = initialState, action) => {
  if ((action.type = GET_CURRENT_MEETING)) {
    return {
      ...state,
      currentMeeting: action.data
    }
  } else return state
}

export default reducer
