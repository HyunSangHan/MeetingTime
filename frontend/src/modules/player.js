import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';
import axios from 'axios';
import { pender } from 'redux-pender';


const COUNTER_PROFILE = "COUNTER_PROFILE";
const GREEN_LIGHT_ON = "GREEN_LIGHT_ON";
const GREEN_LIGHT_OFF = "GREEN_LIGHT_OFF";


//counter_profile 받아오기 + 그린라이트 액션

const initialState = Map({
    is_counterProfile: false,
    is_greenlight_on : false,
    is_greenlight_off: true,
    
}); 

export default handleActions({
    [GREEN_LIGHT_ON]: (state, action) => {
        return state.set('is_greenlight_on', true)
            .set('is_greenlight_off', false);
    },
    [GREEN_LIGHT_OFF]: (state, action) => {
        return state.set('is_greenlight_on', false)
            .set('is_greenlight_off', true);
    },
    ...pender({
        type: COUNTER_PROFILE,
        onSuccess: (state, action) => state.set('counter_profile', action.payload.data)
            .set('is_counterProfile', true),
        onFailure: (state, action) => state.set('is_counterProfile', false),
    }),
}, initialState);

export const getCounterProfile = createAction(
    COUNTER_PROFILE,
    (payload) => axios({
        method: 'get',
        url: '/counter_profile',
    })
        .then((response) => {
            console.log(response);
            return response
        })
        .catch(
            console.log("not working (counter_profile)")
        )
);