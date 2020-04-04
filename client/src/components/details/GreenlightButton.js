import React, { useState, useEffect, useRef, useCallback } from "react"
import {
  CircularProgressbarWithChildren,
  buildStyles
} from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import { isEmpty } from "../../modules/utils"

export default function GreenlightButton(props) {
  const CALL_BUTTON_FILL_TERM = 1000
  const [gapSecondPassed, setGapSecondPassed] = useState(0)

  const {
    myProfile,
    prevTargetTime,
    targetTime,
    handleGreenLight,
    isGreenlightOn
  } = props

  const gapSecondTotal =
    !isEmpty(targetTime) && !isEmpty(prevTargetTime)
      ? targetTime - prevTargetTime
      : 10000000000000
  const progressTick = useCallback(() => {
    const nowTime = new Date().getTime()
    const isTimerNecessary = nowTime > prevTargetTime
    const gapSecondPassedNew = Math.floor(nowTime - prevTargetTime) || 0
    isTimerNecessary && setGapSecondPassed(gapSecondPassedNew)
  }, [prevTargetTime])

  let timer = useRef(null)
  useEffect(() => {
    if (!isGreenlightOn) {
      if (gapSecondPassed <= gapSecondTotal) {
        timer.current = setTimeout(progressTick, CALL_BUTTON_FILL_TERM)
      }
      return () => clearTimeout(timer.current)
    }
  }, [isGreenlightOn, gapSecondPassed, gapSecondTotal, progressTick])

  const getPassedTimeRatio = (passed, total) => {
    const ratio = Math.floor((passed / total) * 100)
    if (ratio < 0) {
      return 0
    } else if (ratio < 100) {
      return ratio
    } else {
      return 100
    }
  }

  const toggleGreenLight = () => {
    if (myProfile.isMale) {
      handleGreenLight({ isGreenlightMale: !isGreenlightOn })
    } else {
      handleGreenLight({ isGreenlightFemale: !isGreenlightOn })
    }
  }

  return (
    <div className="greenlight-back">
      <div className="greenlight move-1" onClick={toggleGreenLight}>
        <CircularProgressbarWithChildren
          value={getPassedTimeRatio(gapSecondPassed, gapSecondTotal)}
          strokeWidth={isGreenlightOn ? 0 : 50}
          styles={buildStyles({
            strokeLinecap: "butt"
          })}
        >
          <div className="call-button font-jua">
            {isGreenlightOn ? "콜!!" : "콜?"}
          </div>
        </CircularProgressbarWithChildren>
      </div>
    </div>
  )
}
