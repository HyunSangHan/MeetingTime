import { combineReducers } from "redux"
import join from "./join"
import current_meeting from "./current_meeting"
import my_profile from "./my_profile"
import current_matching from "./current_matching"
import validation from "./validation"

const reducers = combineReducers({
  current_meeting,
  my_profile,
  join,
  current_matching,
  validation
})

export default reducers
