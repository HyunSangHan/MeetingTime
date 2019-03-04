import * as types from '../actions/ActionTypes';

const initialState = {
//딱히넣을거없음
};

function popup(state = initialState, action) {

    switch(action.type) {
        case types.DELETE_POPUP:
            return {
                is_joined: false,
                is_copied: false
            };

        default:
            return state;
    }
}

export default popup;