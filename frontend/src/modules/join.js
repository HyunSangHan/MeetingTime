import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';
import axios from 'axios';
import { pender } from 'redux-pender';

const DELETE_POPUP = `DELETE_POPUP`;
const CREATE_JOINED_POPUP = `CREATE_JOINED_POPUP`;
const RECLICK_JOINED_POPUP = `RECLICK_JOINED_POPUP`;
const GET_JOINED_USER = `GET_JOINED_USER`;

const initialState = Map({
    is_joined_popup_on: false,
    is_joined_already: false,
    joined_user : {},
}); 

export default handleActions({
    [DELETE_POPUP]: (state, action) => {
        return state.set('is_joined_popup_on', false)
                    .set('is_joined_already', true);
    },
    ...pender({
        type: CREATE_JOINED_POPUP,
        onSuccess: (state, action) => state.set('joined_user', action.payload.data)
                                            .set('is_joined_popup_on', true),
    }),
    ...pender({
        type: GET_JOINED_USER,
        onSuccess: (state, action) => state.set('joined_user', action.payload.data)
                                            .set('is_joined_already', true),
        onFailure: (state, action) => state.set('is_joined_already', false),
    }),
    [RECLICK_JOINED_POPUP]: (state, action) => {
        return state.set('is_joined_popup_on', true);
    },
}, initialState);

export const deletePopup = createAction(DELETE_POPUP, payload => payload);
export const createJoinedPopup = createAction(
    CREATE_JOINED_POPUP,
    (payload) => axios({
        method: 'post',
        url: '/join/',
    })
    .then((response) => {
        console.log("this is working");
        console.log(response);
        return response
    })
    .catch(
        console.log("not working")
    )
);
export const getJoinedUser = createAction(
    GET_JOINED_USER,
    (payload) => axios({
        method: 'get',
        url: '/join',
    })
    .then((response) => {
        console.log("this is working");
        console.log(response);
        return response
    })
    .catch(
        console.log("not working")
    )
);
export const reclickJoinedPopup = createAction(RECLICK_JOINED_POPUP, payload => payload);