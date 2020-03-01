import { createAction, handleActions } from "redux-actions"
import { Map } from "immutable"
import axios from "axios"
import { pender } from "redux-pender"

const CURRENT_MATCHING = "CURRENT_MATCHING"

const initialState = Map({
  isCurrentMatching: false,
  currentMatching: {}
})

export default handleActions(
  {
    ...pender({
      type: CURRENT_MATCHING,
      onSuccess: (state, action) =>
        state
          .set("currentMatching", action.payload.data)
          .set("isCurrentMatching", true),
      onFailure: (state, action) => state.set("isCurrentMatching", false)
    })
  },
  initialState
)

export const getCurrentMatching = createAction(CURRENT_MATCHING, payload =>
  axios({
    method: "get",
    url: "/current_matching"
  })
    .then(response => {
      console.log(response.data)
      return response
    })
    .catch(err => {
      console.log(err + "not working (currentMatching)")
    })
)
