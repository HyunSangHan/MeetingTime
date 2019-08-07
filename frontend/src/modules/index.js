import { combineReducers } from "redux";
import { penderReducer } from "redux-pender";
// import { reducer as formReducer } from "redux-form/immutable";
// 이건 redux-form을 이용하기 위한 친구인데 일단 보류
import join from './join';
import current_meeting from './current_meeting';

export default combineReducers({
    pender: penderReducer,
    // form: formReducer,
    // 이건 redux-form을 이용하기 위한 친구인데 일단 보류
    join,
    current_meeting,
});