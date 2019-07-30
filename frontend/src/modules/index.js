import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';
import { axios } from 'axios';

const DELETE_POPUP = "DELETE_POPUP";
const DELETE_POPUP_JOIN = "DELETE_POPUP_JOIN";
const CREATE_COPIED_POPUP = "CREATE_COPIED_POPUP";
const CREATE_JOINED_POPUP = "CREATE_JOINED_POPUP";
const GET_MEETING_INFO = "GET_MEETING_INFO";

const initialState = Map({
    is_joined: false,
    is_copied: false,
    is_joined_done: false,
    meeting: Map({
        id: 3,
        starting_date: "2019-04-24T10:00:00.000Z",
        mid_date: "2019-05-25T10:00:00.000Z",
        meeting_date: "2019-12-25T22:00:00.000Z",
        location: "Hongdae",
        cutline: 0,
    }),
});

export default handleActions({
    [DELETE_POPUP_JOIN]: (state) => {
        return state.set('is_joined_done', state.is_joined_done);
    },
}, initialState);

export const validateTfa = createAction(
    DELETE_POPUP_JOIN,
);