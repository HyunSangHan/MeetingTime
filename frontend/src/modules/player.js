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
    counter_profile: {
        age_range: null,
        company: {
            name: null
        },
        created_at: null,
        id: 21,
        image: null,
        is_male: false,
        last_img_modified_at: null,
        last_intro_modified_at: null,
        last_login_at: null,
        team_introduce: null,
        user: {
            username: null
        }
    },
}); 

export default handleActions({
    ...pender({
        type: GREEN_LIGHT_ON,
        onSuccess: (state, action) => state.set('is_greenlight_on', true)
                
    }),
    ...pender({
        type: GREEN_LIGHT_OFF,
        onSuccess: (state, action) => state.set('is_greenlight_on', false)

    }),
    ...pender({
        type: COUNTER_PROFILE,
        onSuccess: (state, action) => state.set('counter_profile', action.payload.data)
                                            .set('is_counter_profile', true),
        onFailure: (state, action) => state.set('is_counter_profile', false)
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

export const handleGreenLightOn = createAction(
    GREEN_LIGHT_ON,
    (payload) => axios({
        method: "patch",
        url: '/current_matching/',
        data : {
            is_greenlight_male: true  //큰따옴표 있는 지 없는지 모르겟..
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
            is_greenlight_male: false  //큰따옴표 있는 지 없는지 모르겟..
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