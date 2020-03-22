import { combineReducers } from "redux"
import join from "./join"
import current_meeting from "./current_meeting"
import my_profile from "./my_profile"
import player from "./player"
import current_matching from "./current_matching"
import email from "./email"

const reducers = combineReducers({
  join,
  current_meeting,
  my_profile,
  player,
  current_matching,
  email
})

export default reducers
