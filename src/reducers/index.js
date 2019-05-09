import * as types from '../actions/ActionTypes';

const initialState = {
    is_joined: false,
    is_copied: false,
    is_joined_done: false,
    meeting: {
        id: 3,
        starting_date: "2019-04-24T10:00:00.000Z",
        mid_date: "2019-05-25T10:00:00.000Z",
        meeting_date: "2019-12-25T22:00:00.000Z",
        location: "Hongdae",
        cutline: 0,
    },
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

        // for test (success)
        case types.GET_MEETING_INFO:
            return {
                ...state,
                meeting: state.meeting
            };

        default:
            return state;
    }
}

export default popup;