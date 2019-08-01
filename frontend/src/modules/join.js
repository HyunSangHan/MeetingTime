import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

const prefix = "join";
const DELETE_POPUP_JOIN = `${prefix}/DELETE_POPUP_JOIN`;

const initialState = Map({
    is_joined_done: false,
});

export default handleActions({
    [DELETE_POPUP_JOIN]: (state, action) => {
        return state.set('is_joined_done', action.payload.is_joined_done);
    },
}, initialState);

export const deletePopupJoin = createAction(DELETE_POPUP_JOIN, payload => payload);