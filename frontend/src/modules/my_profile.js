import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';
import axios from 'axios';
import { pender } from 'redux-pender';

const GET_PROFILE = `GET_PROFILE`;
const UPDATE_PROFILE = `UPDATE_PROFILE`;
const CREATE_POPUP = `CREATE_POPUP`;
const DELETE_POPUP = `DELETE_POPUP`;
const NEW_TAB_ON = `NEW_TAB_ON`;
const PREV_TAB_ON = `PREV_TAB_ON`;

const initialState = Map({
    is_login_already: false,
    my_profile: {
        age_range: null,
        company: {
            name: null
        },
        created_at: null,
        id: null,
        image: null,
        image_two: null,
        image_three: null,
        is_male: false,
        last_intro_modified_at: null,
        last_login_at: null,
        team_introduce: null,
        user: {
            username: null
        },
        validated: false,
    },
    is_edited_profile: false,
    action: "prev",
});

export default handleActions({
    ...pender({
        type: GET_PROFILE,
        onSuccess: (state, action) => state.set('my_profile', action.payload.data)
                                            .set('is_login_already', true),
        onFailure: (state, action) => state.set('is_login_already', false),
    }),

    [CREATE_POPUP]: (state) => {
        return state.set('is_edited_profile', true)
    },

    [DELETE_POPUP]: (state) => {
        return state.set('is_edited_profile', false)
    },

    ...pender({
        type: UPDATE_PROFILE,
        onSuccess: (state, action) => state.set('my_profile.user.username', action.payload.data)
                                            .set('is_login_already', true),
        onFailure: (state, action) => state.set('is_login_already', false),
    }),

    [NEW_TAB_ON]: (state) => {
        return state.set('action', "new")
    },

    [PREV_TAB_ON]: (state) => {
        return state.set('action', "prev")
    },

}, initialState);

//팝업용 액션
export const createPopup = createAction(CREATE_POPUP);
export const deletePopup = createAction(DELETE_POPUP);

export const getMyProfile = createAction(
    GET_PROFILE,
    () => axios({
        method: 'get',
        url: '/profile'
    })
    .then((response) => {
        return response
    })
    .catch((err) => {
        console.log("not working (get_profile) - " + err)
    })
);

export const profileUpdate = createAction(
    UPDATE_PROFILE,
    (payload) => axios({
        method: "patch",
        url: '/profile/',
        data: {
            age_range: payload.age_value,
        }
    })
    .then((response) => {
        console.log(response);
        return response
    })
    .catch((err) => {
        console.log("not working (update_profile) - " + err)
    })
);

export const companyUpdate = createAction(
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
    .catch((err) => {
        console.log("not working (update_profile) - " + err)
    })
);

export const teamUpdate= createAction(
    UPDATE_PROFILE,
    (payload) => axios({
        method: "patch",
        url: '/profile/',
        data: {
            image: payload.image_value,
            image_two: payload.image_two_value,
            image_three: payload.image_three_value,
            team_name: payload.team_name_value,
            team_introduce : payload.team_intro_value,
        }
    })
    .then((response) => {
        console.log(response);
        return response
    })
    .catch((err) => {
        console.log("not working (update_profile) - " + err)
    })
);

//TwoTab.js용
export const newTabOn = createAction(NEW_TAB_ON);
export const prevTabOn = createAction(PREV_TAB_ON);
