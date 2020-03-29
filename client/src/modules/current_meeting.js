import axios from "axios"
import { createAction } from "./utils"

const initialState = {
  currentMeeting: {
    id: null,
    openTime: null,
    prevMeetingLastResultTime: null,
    closeTime: null,
    firstShuffleTime: null,
    secondShuffleTime: null,
    thirdShuffleTime: null,
    meetingTime: null,
    location: null,
    cutline: null,
    description: null
  }
}

const GET_CURRENT_MEETING = `GET_CURRENT_MEETING`

export const getCurrentMeeting = () => {
  return dispatch => {
    axios({
      method: "get",
      url: "/current_meeting"
    })
      .then(response => {
        dispatch(createAction(GET_CURRENT_MEETING, response.data))
      })
      .catch(err => {
        console.log("not working - " + err)
      })
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CURRENT_MEETING: {
      return {
        ...state,
        currentMeeting: action.data
      }
    }
    default:
      return state
  }
}

export default reducer
