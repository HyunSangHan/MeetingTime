import { createAction, handleActions } from "redux-actions"
import { Map } from "immutable"
import axios from "axios"
import { pender } from "redux-pender"

const CREATE_JOINED_USER = `CREATE_JOINED_USER`
const GET_JOINED_USER = `GET_JOINED_USER`

const initialState = Map({
  isJoinedAlready: false,
  joinedUser: {
    profile: {
      id: null,
      image: null,
      isMale: null,
      ageRange: null,
      createdAt: null,
      lastLoginAt: null,
      teamIntroduce: "",
      lastIntroModifiedAt: null,
      user: {
        username: ""
      },
      company: {
        name: ""
      }
    },
    rank: null,
    isMatched: null,
    meeting: null
  }
})

export default handleActions(
  {
    ...pender({
      type: CREATE_JOINED_USER,
      onSuccess: (state, action) => state.set("joinedUser", action.payload.data)
    }),
    ...pender({
      type: GET_JOINED_USER,
      onSuccess: (state, action) =>
        state
          .set("joinedUser", action.payload.data)
          .set("isJoinedAlready", true),
      onFailure: state => state.set("isJoinedAlready", false)
    })
  },
  initialState
)

export const createJoinedUser = createAction(CREATE_JOINED_USER, payload =>
  axios({
    method: "post",
    url: "/join/"
  })
    .then(response => {
      console.log(response)
      return response
    })
    .catch(err => {
      console.log("not working - " + err)
    })
)
export const getJoinedUser = createAction(GET_JOINED_USER, payload =>
  axios({
    method: "get",
    url: "/join"
  })
    .then(response => {
      console.log(response)
      return response
    })
    .catch(err => {
      console.log("not working - " + err)
    })
)
