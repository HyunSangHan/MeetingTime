import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';
import axios from 'axios';
import { pender } from 'redux-pender';

const GET_PROFILE = `GET_PROFILE`;

const initialState = Map({
    is_login_already: false,
}); 

export default handleActions({
    ...pender({
        type: GET_PROFILE,
        onSuccess: (state, action) => state.set('my_profile', action.payload.data)
                                            .set('is_login_already', true),
        onFailure: (state, action) => state.set('is_login_already', false),
    }),
}, initialState);

export const getJoinedUser = createAction(
    GET_PROFILE,
    (payload) => axios({
        method: 'get',
        url: '/profile',
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