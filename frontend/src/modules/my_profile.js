import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';
import axios from 'axios';
import { pender } from 'redux-pender';

const GET_PROFILE = `GET_PROFILE`;
const PROFILE_EDITED_AFTER = `PROFILE_EDITED_AFTER`;
const PROFILE_EDITED_BEFORE = `PROFILE_EDITED_BEFORE`;

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
        is_male: false,
        last_img_modified_at: null,
        last_intro_modified_at: null,
        last_login_at: null,
        team_introduce: null,
        user: {
            username: null
        }
    },
    is_edited_profile: true,
}); 

export default handleActions({
    ...pender({
        type: GET_PROFILE,
        onSuccess: (state, action) => state.set('my_profile', action.payload.data)
                                            .set('is_login_already', true),
        onFailure: (state, action) => state.set('is_login_already', false),
    }),
    [PROFILE_EDITED_AFTER]: (state) => {
        return state.set('is_edited_profile', true);
    },
    [PROFILE_EDITED_BEFORE]: (state) => {
        return state.set('is_edited_profile', false);
    },
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

export const profileEditedAfter = createAction(PROFILE_EDITED_AFTER, payload => payload);
export const profileEditedBefore = createAction(PROFILE_EDITED_BEFORE, payload => payload);