export const createAction = (actionType, data) => {
  if (!data) {
    return {
      type: actionType
    }
  } else {
    return {
      type: actionType,
      data: data
    }
  }
}
