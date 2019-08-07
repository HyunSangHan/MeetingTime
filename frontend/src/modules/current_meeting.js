import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';
import axios from 'axios';
import { pender } from 'redux-pender';

const GET_MEETING_INFO = `GET_MEETING_INFO`;

const initialState = Map({
    current_meeting: Map({
        id: 3,
        starting_date: "2019-04-24T10:00:00.000Z",
        mid_date: "2019-05-25T10:00:00.000Z",
        meeting_date: "2019-12-25T22:00:00.000Z",
        location: "Hongdae",
        cutline: 0,
    }),
}); 

export default handleActions({
    ...pender({
        type: GET_MEETING_INFO,
        onSuccess: (state, action) => state.set('current_meeting', action.payload.data.meeting)
    }),
}, initialState);

export const getMeetingInfo = createAction(
    GET_MEETING_INFO,
    (payload) => axios({
        method: 'get',
        url: '/current_meeting',
    })
    .then((response) => {
        console.log("this is working OOOOO");
        console.log(response);
        return response
    })
    .catch(
        console.log("not working XXXXX")
    )
);