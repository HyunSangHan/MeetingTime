import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';
import axios from 'axios';
import { pender } from 'redux-pender';


const COUNTER_PROFILE = "COUNTER_PROFILE";
const GREEN_LIGHT_ON = "GREEN_LIGHT_ON";
const GREEN_LIGHT_OFF = "GREEN_LIGHT_OFF";
const GIFT_ON = "GIFT_ON";
const GIFT_OFF = "GIFT_OFF";

//counter_profile 받아오기 + 그린라이트 액션

const initialState = Map({
    is_counter_profile: false,
}); 

export default handleActions({
    ...pender({
        type: GREEN_LIGHT_ON,
    }),

    ...pender({
        type: GREEN_LIGHT_OFF,
    }),

    ...pender({
        type: GIFT_ON,
    }),

    ...pender({
        type: GIFT_OFF,
    }),

    ...pender({
        type: COUNTER_PROFILE,
        onSuccess: (state, action) => state.set('counter_profile', action.payload.data)
            .set('is_counter_profile', true),
        onFailure: (state, action) => state.set('is_counter_profile', false)
    }),
}, initialState);

//'''Get Counter_profile'''
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


//'''GreenLight Actions'''
export const handleGreenLightOn = createAction(
    GREEN_LIGHT_ON,
    (payload) => axios({
        method: "patch",
        url: '/current_matching/',
        data : {
            is_greenlight_male: payload.male,
            is_greenlight_female: payload.female
        }
    })
    .then((response) => {
        console.log(response);
        return response
    })
    .catch(
        console.log("not working (greenlight api)")
    )
);

export const handleGreenLightOff = createAction(
    GREEN_LIGHT_OFF,
    (payload) => axios({
        method: "patch",
        url: '/current_matching/',
        data: {
            is_greenlight_male: payload.male,
            is_greenlight_female: payload.female
        }
    })
        .then((response) => {
            console.log(response);
            return response
        })
        .catch(
            console.log("not working (greenlight api)")
        )
);

//'''Gift Actions'''
export const handleGiftOn = createAction(
    GIFT_ON,
    (payload) => axios({
        method: "patch",
        url: '/current_matching/',
        data: {
            is_gift_male: payload.male,
            is_gift_female: payload.female
        }
    })
        .then((response) => {
            console.log(response);
            return response
        })
        .catch(
            console.log("not working (gift api)")
        )
);

export const handleGiftOff = createAction(
    GIFT_OFF,
    (payload) => axios({
        method: "patch",
        url: '/current_matching/',
        data: {
            is_gift_male: payload.male,
            is_gift_female: payload.female
        }
    })
        .then((response) => {
            console.log(response);
            return response
        })
        .catch(
            console.log("not working (gift api)")
        )
);