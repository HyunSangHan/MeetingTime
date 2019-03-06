import * as types from '../actions/ActionTypes';

const initialState = {
    is_joined: false,
    is_copied: false
};

function popup(state = initialState, action) {

    switch(action.type) {
        case types.DELETE_POPUP:
            return {
                is_joined: false,
                is_copied: false
            };

        case types.CREATE_JOINED_POPUP:
            return {
                is_joined: true,
                is_copied: false
            };

        case types.CREATE_COPIED_POPUP:
            return {
                is_joined: false,
                is_copied: true
            };

        default:
            return state;
    }
}

export default popup;