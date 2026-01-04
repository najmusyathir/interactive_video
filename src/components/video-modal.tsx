"use client"

import { useEffect, useRef, useState } from "react"
import { CircledCloseIcon } from "./icons"

export default function VideoModal({ data, onClose }: { data: any; onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [currentFlowIndex, setCurrentFlowIndex] = useState(0)
  const [showPopup, setShowPopup] = useState(false)
  const [currentPopup, setCurrentPopup] = useState<any>(null)
  const [feedback, setFeedback] = useState<string | null>(null)
  const [afterPopup, setAfterPopup] = useState<any>(null)
  const [showClose, setShowClose] = useState(false)

  const flows = data?.videos?.[0]?.flows || []
  // Count total videos in flows
  const totalVideos = flows.filter((flow: any) => flow?.video?.src).length
  // Get current video number (count videos up to currentFlowIndex)
  const getCurrentVideoNumber = () => {
    let videoCount = 0
    for (let i = 0; i <= currentFlowIndex; i++) {
      if (flows[i]?.video?.src) {
        videoCount++
      }
    }
    return videoCount
  }

  const currentVideoNumber = getCurrentVideoNumber()
  const getCurrentVideoSrc = () => {
    for (let i = currentFlowIndex; i >= 0; i--) {
      if (flows[i]?.video?.src) return flows[i].video.src
    }
    return null
  }

  const currentVideoSrc = getCurrentVideoSrc()

  useEffect(() => {
    const video = videoRef.current
    if (!video || !currentVideoSrc) return
    video.src = currentVideoSrc
    video.load()
    setTimeout(() => video.play().catch(() => { }), 500)
  }, [currentVideoSrc])

  const handleVideoEnd = () => {
    const next = flows[currentFlowIndex + 1]
    if (next?.popup) {
      setCurrentPopup(next.popup)
      setShowPopup(true)
    } else if (next?.video) {
      setCurrentFlowIndex(i => i + 1)
    } else {
      setShowClose(true)
    }
  }

  const handleOptionSelect = (option: any) => {
    setFeedback(option.feedback)
    if (currentPopup?.autoNext) {
      setTimeout(goNext, 5500)
    }
  }

  const goNext = () => {
    setShowPopup(false)
    setFeedback(null)
    setCurrentPopup(null)
    setAfterPopup(null)
    setCurrentFlowIndex(i => i + 2)
  }

  const handleButtonClick = () => {
    if (currentPopup?.after && !afterPopup) {
      setAfterPopup(currentPopup.after)
    } else {
      goNext()
    }
  }

  return (
    <div className="absolute inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
      <div className="bg-stone-100 w-full max-w-5xl rounded-3xl overflow-hidden">
        <div className="flex justify-between p-4">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-900 font-thin bg-gray-200 px-3 py-1 rounded-full">
              Video <span className="font-semibold" >{currentVideoNumber}</span> of <span className="font-semibold">{totalVideos}</span>
            </span>
          </div>
          <div />
          <div onClick={onClose} className="cursor-pointer"><CircledCloseIcon /></div>
        </div>

        <div className="relative mx-4 mb-4 rounded-2xl overflow-hidden">
          {currentVideoSrc && (
            <video
              ref={videoRef}
              className="w-full"
              controls
              onEnded={handleVideoEnd}
            />
          )}

          {showPopup && currentPopup && (
            <div className="absolute inset-0 bg-black flex flex-col justify-center items-center p-6 gap-4 text-white">
              <h3 className="text-xl text-center">
                {afterPopup ? afterPopup.text : currentPopup.question || currentPopup.text}
              </h3>

              {!feedback && !afterPopup && currentPopup.options?.map((opt: any, i: number) => (
                <button
                  key={i}
                  onClick={() => handleOptionSelect(opt)}
                  className="w-full cursor-pointer hover:bg-gray-300 max-w-xl px-5 py-4 bg-slate-50 text-slate-800 rounded-lg hover:scale-105 duration-200"
                >
                  {opt.text}
                </button>
              ))}

              {!feedback && !afterPopup && currentPopup.buttons?.map((btn: any, i: number) => (
                <button
                  key={i}
                  onClick={handleButtonClick}
                  className="px-8 py-3 bg-white hover:scale-105 duration-200 hover:bg-gray-200 text-black rounded-lg cursor-pointer"
                >
                  {btn.text}
                </button>
              ))}

              {feedback && (
                <>
                  <p className="text-center max-w-xl">{feedback}</p>
                  {currentPopup.showContinue && (
                    <button
                      onClick={handleButtonClick}
                      className="px-8 py-3 bg-white hover:scale-105 duration-200 hover:bg-gray-200 text-black rounded-lg cursor-pointer"
                    >
                      Teruskan
                    </button>
                  )}
                </>
              )}

              {afterPopup?.buttons?.map((btn: any, i: number) => (
                <button
                  key={i}
                  onClick={handleButtonClick}
                  className="px-8 py-3 bg-white hover:scale-105 duration-200 hover:bg-gray-200 text-black rounded-lg cursor-pointer"
                >
                  {btn.text}
                </button>
              ))}
            </div>
          )}

          {showClose && (
            <div className="absolute inset-0 bg-black/75 flex flex-col items-center justify-center text-white gap-4">
              <p className="text-2xl font-semibold">Video selesai!</p>
              <button onClick={onClose} className="bg-white hover:scale-105 duration-200 hover:bg-gray-200 text-black px-6 py-3 rounded-lg cursor-pointer">
                Tutup
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
