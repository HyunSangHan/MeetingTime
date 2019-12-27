import { createAction, handleActions } from "redux-actions"
import { Map } from "immutable"
import axios from "axios"
import { pender } from "redux-pender"

const GET_CURRENT_MEETING = `GET_CURRENT_MEETING`

const initialState = Map({
  currentMeeting: Map({})
})

export default handleActions(
  {
    ...pender({
      type: GET_CURRENT_MEETING,
      onSuccess: (state, action) =>
        state.set("currentMeeting", action.payload.data)
    })
  },
  initialState
)

export const getCurrentMeeting = createAction(GET_CURRENT_MEETING, payload =>
  axios({
    method: "get",
    url: "/current_meeting"
  })
    .then(response => {
      console.log("this is working OOOOO")
      console.log(response)
      return response
    })
    .catch(err => {
      console.log("not working - " + err)
    })
)
