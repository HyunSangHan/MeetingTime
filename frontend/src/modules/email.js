import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';
import axios from 'axios';
import { pender } from 'redux-pender';

const SEND_EMAIL = "SEND_EMAIL";
const VALIDATE_EMAIL = "VALIDATE_EMAIL";

const initialState = Map({
    sent: false,
    validated: false,
});

export default handleActions({
    ...pender({
        type: SEND_EMAIL,
        onSuccess: (state) => state.set('sent', true),
    }),
    ...pender({
        type: VALIDATE_EMAIL,
        onSuccess: (state) => state.set('validated', true),
    })
}, initialState);

export const sendEmail = createAction(
    SEND_EMAIL,
    (payload) => axios({
        method: 'post',
        url: '/email/',
        data: {
            email: payload.email
        }
    })
    .then((response) => {
        return response
    })
);

export const validateEmail = createAction(
    VALIDATE_EMAIL,
    (payload) => axios({
        method: 'post',
        url: '/validate/',
        data: {
            code: payload.code
        }
    })
    .then((response) => {
        return response
    })
    .catch(
        console.log("not working")
    )
);