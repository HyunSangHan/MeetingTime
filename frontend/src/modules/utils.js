export const isObject = target => {
  if (typeof target === "object") {
    return true
  } else {
    return false
  }
}

export const isEmpty = target => {
  if (target === null || target === "" || target === []) {
    return true
  } else {
    return false
  }
}

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

export const getInputWeekLabel = timeStr => {
  let targetWeekLabel = null

  const nowTime = new Date()
  const targetTime = new Date(timeStr)

  if (
    nowTime.getDay() < targetTime.getDay() &&
    targetTime.getTime() - nowTime.getTime() <= 561600000
  ) {
    targetWeekLabel = "이번주"
  } else if (
    nowTime.getDay() < targetTime.getDay() &&
    targetTime.getTime() - nowTime.getTime() > 561600000
  ) {
    targetWeekLabel = "다음주"
  } else if (
    nowTime.getDay() > targetTime.getDay() &&
    targetTime.getTime() - nowTime.getTime() <= 561600000
  ) {
    targetWeekLabel = "다음주"
  } else if (
    nowTime.getDay() > targetTime.getDay() &&
    targetTime.getTime() - nowTime.getTime() > 561600000
  ) {
    targetWeekLabel = "다다음주"
  } else if (
    nowTime.getDay() === targetTime.getDay() &&
    targetTime.getTime() - nowTime.getTime() <= 561600000
  ) {
    targetWeekLabel = "이번주"
  } else if (
    nowTime.getDay() === targetTime.getDay() &&
    targetTime.getTime() - nowTime.getTime() > 561600000
  ) {
    targetWeekLabel = "다음주"
  } else {
    targetWeekLabel = ""
  }

  return targetWeekLabel
}

export const getInputDayLabel = timeStr => {
  const week = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일"
  ]
  const targetDay = new Date(timeStr).getDay()
  const targetDayLabel = week[targetDay]
  return targetDayLabel
}

export const getInputNextLabel = timeStr => {
  let targetNextLabel = null

  const nowTime = new Date()
  const targetTime = new Date(timeStr)

  if (
    nowTime.getDay() < targetTime.getDay() &&
    targetTime.getTime() - nowTime.getTime() <= 561600000
  ) {
    targetNextLabel = "이번"
  } else if (
    nowTime.getDay() < targetTime.getDay() &&
    targetTime.getTime() - nowTime.getTime() > 561600000
  ) {
    targetNextLabel = "다음"
  } else if (
    nowTime.getDay() > targetTime.getDay() &&
    targetTime.getTime() - nowTime.getTime() <= 561600000
  ) {
    targetNextLabel = "다음"
  } else if (
    nowTime.getDay() > targetTime.getDay() &&
    targetTime.getTime() - nowTime.getTime() > 561600000
  ) {
    targetNextLabel = "다다음"
  } else if (
    nowTime.getDay() === targetTime.getDay() &&
    targetTime.getTime() - nowTime.getTime() <= 561600000
  ) {
    targetNextLabel = "이번"
  } else if (
    nowTime.getDay() === targetTime.getDay() &&
    targetTime.getTime() - nowTime.getTime() > 561600000
  ) {
    targetNextLabel = "다음"
  } else {
    targetNextLabel = ""
  }
  return targetNextLabel
}

export const getDateGap = time => {
  const nowTime = new Date()
  const nowDate = new Date(
    nowTime.getFullYear(),
    nowTime.getMonth(),
    nowTime.getDate(),
    0,
    0,
    0,
    0
  )
  const targetDate = new Date(
    time.getFullYear(),
    time.getMonth(),
    time.getDate(),
    0,
    0,
    0,
    0
  )
  const gap = Math.floor((nowDate - targetDate) / (1000 * 60 * 60 * 24))
  if (gap < 0) {
    return gap
  } else if (gap === 0) {
    return "-day"
  } else {
    return "+" + gap
  }
}

export const getTimeNotification = seconds => {
  let gapDatePart = parseInt(seconds / (60 * 60 * 24))
  let gapHourPart = parseInt((seconds - gapDatePart * 60 * 60 * 24) / (60 * 60))
  let gapMinutePart = parseInt(
    (seconds - gapDatePart * 60 * 60 * 24 - gapHourPart * 60 * 60) / 60
  )
  let gapSecondPart =
    seconds -
    gapDatePart * 60 * 60 * 24 -
    gapHourPart * 60 * 60 -
    gapMinutePart * 60

  if (gapHourPart < 10 && gapDatePart !== 0) {
    gapHourPart = "0" + gapHourPart
  }

  if (gapMinutePart < 10) {
    gapMinutePart = "0" + gapMinutePart
  }

  if (gapSecondPart < 10) {
    gapSecondPart = "0" + gapSecondPart
  }

  if (gapDatePart < 1) {
    return "남은시간 " + gapHourPart + ":" + gapMinutePart + ":" + gapSecondPart
  } else {
    return (
      "남은시간 " +
      gapDatePart +
      "일 " +
      gapHourPart +
      ":" +
      gapMinutePart +
      ":" +
      gapSecondPart
    )
  }
}
