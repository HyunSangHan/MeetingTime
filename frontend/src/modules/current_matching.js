import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';
import axios from 'axios';
import { pender } from 'redux-pender';


const CURRENT_MATCHING = "CURRENT_MATCHING";

const initialState = Map({
    is_current_matching: false,
    current_matching: {},
});

export default handleActions({
    ...pender({
        type: CURRENT_MATCHING,
        onSuccess: (state, action) => state.set('current_matching', action.payload.data)
                                            .set('is_current_matching', true),
        onFailure: (state, action) => state.set('is_current_matching', false)
    }),
}, initialState);

export const getCurrentMatching = createAction(
    CURRENT_MATCHING,
    (payload) => axios({
        method: 'get',
        url: '/current_matching',
    })
    .then((response) => {
        console.log(response);
        return response
    })
    .catch((err)=>{
        console.log(err + "not working (current_matching)")
    })
);