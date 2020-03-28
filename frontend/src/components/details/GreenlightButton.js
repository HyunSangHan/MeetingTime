import React, { useState, useEffect } from "react"
import {
  CircularProgressbarWithChildren,
  buildStyles
} from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"

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

  const gapSecondTotal = Math.floor(targetTime - prevTargetTime) || 100

  useEffect(() => {
    if (isGreenlightOn) {
      setGapSecondPassed(gapSecondTotal)
    } else {
      if (gapSecondPassed <= gapSecondTotal) {
        const nowTime = new Date().getTime()
        const isTimerNecessary = nowTime > prevTargetTime
        const gapSecondPassedNew = Math.floor(nowTime - prevTargetTime) || 0
        isTimerNecessary && setGapSecondPassed(gapSecondPassedNew)
      }
    }
  }, [isGreenlightOn])

  useEffect(() => {
    if (!isGreenlightOn) {
      if (gapSecondPassed <= gapSecondTotal) {
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
    }
  }, [isGreenlightOn, gapSecondPassed])

  const getPassedTimeRatio = (passed, total) => {
    return Math.floor((passed / total) * 100)
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
