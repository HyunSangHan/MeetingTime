import { createAction, handleActions } from 'redux-actions';
import { Map, get } from 'immutable';
import axios from 'axios';
import { pender } from 'redux-pender';

const CREATE_JOINED_USER = `CREATE_JOINED_USER`;
const GET_JOINED_USER = `GET_JOINED_USER`;

const initialState = Map({
    is_joined_already: false,
    joined_user: {
        profile: {
            id: null,
            image: null,
            is_male: null,
            age_range: null,
            created_at: null,
            last_login_at: null,
            team_introduce: "",
            last_intro_modified_at: null,
            user: {
                username: ""
            },
            company: {
                name: ""
            }
        },
        rank: null,
        is_matched: null,
        meeting: null
    },
}); 

export default handleActions({
    ...pender({
        type: CREATE_JOINED_USER,
        onSuccess: (state, action) => state.set('joined_user', action.payload.data),
    }),
    ...pender({
        type: GET_JOINED_USER,
        onSuccess: (state, action) => state.set('joined_user', action.payload.data)
                                            .set('is_joined_already', true),
        onFailure: (state) => state.set('is_joined_already', false),
    }),
}, initialState);

export const createJoinedUser = createAction(
    CREATE_JOINED_USER,
    (payload) => axios({
        method: 'post',
        url: '/join/',
    })
    .then((response) => {
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
        console.log(response);
        return response
    })
    .catch(
        console.log("not working")
    )
);