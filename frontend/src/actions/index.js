import * as types from './ActionTypes';

export const deletePopupJoin = () => ({
    type: types.DELETE_POPUP_JOIN
});

export const deletePopup = () => ({
    type: types.DELETE_POPUP
});

export const createJoinedPopup = () => ({
    type: types.CREATE_JOINED_POPUP
});

export const createCopiedPopup = () => ({
    type: types.CREATE_COPIED_POPUP
});

export const getMeetingInfo = () => ({
    type: types.GET_MEETING_INFO
});