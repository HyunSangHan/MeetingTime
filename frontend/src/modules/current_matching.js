import axios from "axios"
import { createAction } from "./utils"

const GET_CURRENT_MATCHING = `GET_CURRENT_MATCHING`
const GET_CURRENT_MATCHING_SUCCESS = `GET_CURRENT_MATCHING_SUCCESS`
const GET_CURRENT_MATCHING_FAILURE = `GET_CURRENT_MATCHING_FAILURE`

const initialState = {
  isCurrentMatching: false,
  currentMatching: {
    id: null,
    trialTime: null,
    isGreenlightMale: false,
    isGreenlightFemale: false,
    isGiftMale: false,
    isGiftFemale: false,
    joinedMale: {
      profile: {
        image: null,
        imageTwo: null,
        imageThree: null,
        isMale: null,
        ageRange: null,
        createdAt: null,
        lastLoginAt: null,
        teamName: null,
        teamIntroduce: "",
        lastIntroModifiedAt: null,
        validated: null,
        user: {
          username: null
        },
        company: {
          name: null
        }
      },
      rank: null,
      isMatched: false,
      meeting: null
    },
    joinedFemale: {
      profile: {
        image: null,
        imageTwo: null,
        imageThree: null,
        isMale: null,
        ageRange: null,
        createdAt: null,
        lastLoginAt: null,
        teamName: null,
        teamIntroduce: "",
        lastIntroModifiedAt: null,
        validated: null,
        user: {
          username: null
        },
        company: {
          name: null
        }
      },
      rank: null,
      isMatched: false,
      meeting: null
    },
    kakaoChattingroom: null
  }
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
