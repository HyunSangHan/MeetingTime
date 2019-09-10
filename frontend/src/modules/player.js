import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';
import axios from 'axios';
import { pender } from 'redux-pender';


const COUNTER_PROFILE = "COUNTER_PROFILE";
const GREEN_LIGHT_ON = "GREEN_LIGHT_ON";
const GREEN_LIGHT_OFF = "GREEN_LIGHT_OFF";
const GIFT_ON = "GIFT_ON";
const CREATE_POPUP = "CREATE_POPUP";
const DELETE_POPUP = "DELETE_POPUP";

//counter_profile 받아오기 + 그린라이트 액션

const initialState = Map({
    is_counter_profile: false,
    is_gift_popup: false,
    is_gift_already: false,

    counter_profile: {
        age_range: null,
        company: {
            name: null
        },
        created_at: null,
        id: 21,
        image: null,
        image_two: null,
        image_three: null,
        is_male: false,
        last_intro_modified_at: null,
        last_login_at: null,
        team_introduce: null,
        user: {
            username: null
        }
    },
}); 

export default handleActions({
    [CREATE_POPUP]: (state) => {
        return state.set('is_gift_popup', true)
    },

    [DELETE_POPUP]: (state) => {
        console.log('팝업삭제눌림');
        return state.set('is_gift_popup', false)
    },

    ...pender({
        type: GREEN_LIGHT_ON,
    }),

    ...pender({
        type: GREEN_LIGHT_OFF,
    }),

    ...pender({
        type: GIFT_ON,
        onSuccess: (state, action) => state.set('is_gift_already', true),
        onFailure: (state, action) => state.set('is_gift_already', false)
    }),

    ...pender({
        type: COUNTER_PROFILE,
        onSuccess: (state, action) => state.set('counter_profile', action.payload.data)
                                            .set('is_counter_profile', true),
        onFailure: (state, action) => state.set('is_counter_profile', false)
    }),
}, initialState);



//GIFT CONFIRM POPUP
export const createPopup = createAction(CREATE_POPUP);
export const deletePopup = createAction(DELETE_POPUP);

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
        .catch((err) => {
            console.log("not working (counter_profile) - " + err)
        })
);


//'''GreenLight Actions [ON/OFF]'''
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
    .catch((err) => {
        console.log("not working (greenlight api) - " + err)
    })
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
        .catch((err) => {
            console.log("not working (greenlight api) - " + err)
        })
);

//'''Gift Actions only On'''
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
        .catch((err) => {
            console.log("not working (gift api) - " + err)
        })
);
