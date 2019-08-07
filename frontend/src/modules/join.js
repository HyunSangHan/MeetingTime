import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';
import axios from 'axios';
import { pender } from 'redux-pender';
// import {getMeetingInfo} from '../actions/index'

// const prefix = "join";
const DELETE_POPUP = `DELETE_POPUP`;
const CREATE_JOINED_POPUP = `CREATE_JOINED_POPUP`;
const RECLICK_JOINED_POPUP = `RECLICK_JOINED_POPUP`;
const GET_MEETING_INFO = `GET_MEETING_INFO`;
// const DELETE_POPUP = `${prefix}/DELETE_POPUP`;
// const CREATE_JOINED_POPUP = `${prefix}/CREATE_JOINED_POPUP`;
// const GET_MEETING_INFO = `${prefix}/GET_MEETING_INFO`;


const initialState = Map({
    is_joined_popup_on: false,
    is_joined_already: false,
    meeting: Map({
        id: 3,
        starting_date: "2019-04-24T10:00:00.000Z",
        mid_date: "2019-05-25T10:00:00.000Z",
        meeting_date: "2019-12-25T22:00:00.000Z",
        location: "Hongdae",
        cutline: 0,
    }),
}); 

export default handleActions({
    [DELETE_POPUP]: (state, action) => {
        return state.set('is_joined_popup_on', false)
                    .set('is_joined_already', true);
    },
    ...pender({
        type: CREATE_JOINED_POPUP,
        onSuccess: (state, action) => state.set('rank', action.payload.data.rank)
                                            .set('is_joined_popup_on', true),
    }),
    [RECLICK_JOINED_POPUP]: (state, action) => {
        return state.set('is_joined_popup_on', true)
    },
    [GET_MEETING_INFO]: (state, action) => {
        return
    },
}, initialState);

export const deletePopup = createAction(DELETE_POPUP, payload => payload);
export const createJoinedPopup = createAction(
    CREATE_JOINED_POPUP,
    (payload) => axios({
        method: 'post',
        url: '/join/',
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
export const reclickJoinedPopup = createAction(RECLICK_JOINED_POPUP, payload => payload);
export const getMeetingInfo = createAction(GET_MEETING_INFO, payload => payload);
