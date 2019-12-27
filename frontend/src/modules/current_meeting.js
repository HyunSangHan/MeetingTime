import { createAction, handleActions } from "redux-actions"
import { Map, get } from "immutable"
import axios from "axios"
import { pender } from "redux-pender"

const GET_CURRENT_MEETING = `GET_CURRENT_MEETING`

const initialState = Map({
  current_meeting: Map({})
})

export default handleActions(
  {
    ...pender({
      type: GET_CURRENT_MEETING,
      onSuccess: (state, action) =>
        state.set("current_meeting", action.payload.data)
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
