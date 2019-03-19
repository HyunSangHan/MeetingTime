import * as types from '../actions/ActionTypes';

const initialState = {
    is_joined: false,
    is_copied: false,
    is_joined_done: false
};

function popup(state = initialState, action) {

    switch(action.type) {
        case types.DELETE_POPUP:
            return {
                is_joined: false,
                is_copied: false,
                is_joined_done: state.is_joined_done
            };

        case types.DELETE_POPUP_JOIN:
            return {
                is_joined: false,
                is_copied: false,
                is_joined_done: true
            };

        case types.CREATE_JOINED_POPUP:
            return {
                is_joined: true,
                is_copied: false,
                is_joined_done: state.is_joined_done
            };

        case types.CREATE_COPIED_POPUP:
            return {
                is_joined: false,
                is_copied: true,
                is_joined_done: state.is_joined_done
            };

        default:
            return state;
    }
}

export default popup;