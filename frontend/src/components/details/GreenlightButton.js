import React, { useState, useEffect, useMemo } from "react"
import {
  CircularProgressbarWithChildren,
  buildStyles
} from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"

export default function GreenlightButton(props) {
  const CALL_BUTTON_FILL_TERM = 1000
  const [gapSecondPassed, setGapSecondPassed] = useState(0)

  const {
    prevTargetTime,
    targetTime,
    isGreenlightMale,
    isGreenlightFemale
  } = props
  const gapSecondTotal = Math.floor(targetTime - prevTargetTime) || 100

  useEffect(() => {
    if (gapSecondPassed < gapSecondTotal) {
      const timer = setTimeout(() => {
        const nowTime = new Date().getTime()
        const isTimerNecessary = nowTime > prevTargetTime
        const gapSecondPassedNew = Math.floor(nowTime - prevTargetTime) || 0
        isTimerNecessary && setGapSecondPassed(gapSecondPassedNew)
      }, CALL_BUTTON_FILL_TERM)
      return () => {
        clearTimeout(timer)
      }
    }
  }, [gapSecondPassed])

  const getRestTimeRatio = (rest, total) => {
    return Math.floor((rest / total) * 100)
  }

  const { handleGreenLight, myProfile, isGreenlightOn } = props

  const toggleGreenLight = () => {
    if (myProfile.isMale) {
      handleGreenLight({ isGreenlightMale: !isGreenlightOn })
    } else {
      handleGreenLight({ isGreenlightFemale: !isGreenlightOn })
    }
  }

  const greenlightOn =
    isGreenlightOn ||
    (myProfile.isMale && isGreenlightMale) ||
    (!myProfile.isMale && isGreenlightFemale)

  return (
    <div className="greenlight-back">
      <div className="greenlight move-1" onClick={toggleGreenLight}>
        {console.log(gapSecondPassed)}
        {console.log(gapSecondTotal)}
        <CircularProgressbarWithChildren
          value={getRestTimeRatio(gapSecondPassed, gapSecondTotal)}
          strokeWidth={50}
          styles={buildStyles({
            strokeLinecap: "butt"
          })}
        >
          <div className="call-button font-jua">
            {greenlightOn ? "콜!!" : "콜?"}
          </div>
        </CircularProgressbarWithChildren>
      </div>
    </div>
  )
}
