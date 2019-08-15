import { createAction, handleActions } from 'redux-actions';
import { Map, get } from 'immutable';
import axios from 'axios';
import { pender } from 'redux-pender';

const GET_PROFILE = "GET_PROFILE";
const UPDATE_PROFILE = "UPDATE_PROFILE";

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
    ...pender({
        type: UPDATE_PROFILE,
        onSuccess: (state, action) => state.set('my_profile', action.payload.data)
                                            .set('is_login_already', true),
        onFailure: (state, action) => state.set('is_login_already', false),
    }),
    }, initialState);

export const getMyProfile = createAction(
    GET_PROFILE,
    (payload) => axios({
        method: 'get',
        url: '/profile',
    })
    .then((response) => {
        console.log(response);
        return response
    })
    .catch(
        console.log("not working (profile)")
    )
);

export const ProfileUpdate = createAction(
    UPDATE_PROFILE,
    (payload) => axios({
        method: "patch",
        url: '/profile/',
        data: {
            age_range: payload.age_value,
            image: payload.image_value,
            team_introduce : payload.team_intro_value,
        }
    })
    .then((response) => {
        console.log(response);
        console.log("프로필 수정 성공");
        return response
    })
    .catch(
        console.log("not working (update_profile)")
    )
);

export const CompanyUpdate = createAction(
    UPDATE_PROFILE,
    (payload) => axios({
        method: "patch",
        url: "/company/",
        data: {
            name: payload.company_value,
        }
    })
    .then((response) => {
        console.log(response);
        return response
    })
    .catch(
        console.log("not working (update_profile)")
    )
);