import { createAction, handleActions } from "redux-actions"
import { Map } from "immutable"
import axios from "axios"
import { pender } from "redux-pender"

const CREATE_JOINED_USER = `CREATE_JOINED_USER`
const GET_JOINED_USER = `GET_JOINED_USER`

const initialState = Map({
  isJoinedAlready: null,
  joinedUser: {
    profile: {
      ageRange: null,
      company: {
        name: null
      },
      createdAt: null,
      id: null,
      image: null,
      imageTwo: null,
      imageThree: null,
      isMale: false,
      lastIntroModifiedAt: null,
      lastLoginAt: null,
      teamIntroduce: null,
      user: {
        username: null
      },
      validated: false
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
      console.log(response.data)
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
      console.log(response.data)
      return response
    })
    .catch(err => {
      console.log("not working - " + err)
    })
)
