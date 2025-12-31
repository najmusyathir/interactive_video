"use client"

import { useEffect, useRef, useState } from "react"
import { CircledCloseIcon } from "./icons"

export default function VideoModal({ data, onClose, }: { data: any; onClose: () => void; }) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [currentFlowIndex, setCurrentFlowIndex] = useState(0)
  const [showPopup, setShowPopup] = useState(false)
  const [currentPopup, setCurrentPopup] = useState<any>(null)
  const [showClose, setShowClose] = useState(false)
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)

  // Extract flows from the new structure
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
  
  // Get current video source based on current flow index
  const getCurrentVideoSrc = () => {
    // Find the video at currentFlowIndex
    if (flows[currentFlowIndex]?.video?.src) {
      return flows[currentFlowIndex].video.src
    }
    // If current index doesn't have a video, look backwards
    for (let i = currentFlowIndex; i >= 0; i--) {
      if (flows[i]?.video?.src) {
        return flows[i].video.src
      }
    }
    return null
  }

  const currentVideoSrc = getCurrentVideoSrc()

  useEffect(() => {
    const video = videoRef.current
    if (!video || !currentVideoSrc) return

    // Load and play the current video
    video.src = currentVideoSrc
    video.load()

    const timeoutId = setTimeout(() => {
      video.play().catch(() => {
        // Autoplay might be blocked by the browser; ignore the error
      })
    }, 1000)

    return () => clearTimeout(timeoutId)
  }, [currentVideoSrc])

  const handleVideoEnd = () => {
    // Check if there's a next flow item
    if (currentFlowIndex + 1 < flows.length) {
      const nextFlow = flows[currentFlowIndex + 1]
      
      // If next flow is a popup, show it
      if (nextFlow?.popup) {
        // Reset popup states
        setSelectedOptionIndex(null)
        setIsCorrect(null)
        setCurrentPopup(nextFlow.popup)
        setShowPopup(true)
      } 
      // If next flow is a video, move to it (will auto-play)
      else if (nextFlow?.video) {
        setCurrentFlowIndex(prev => prev + 1)
      }
    } else {
      // No more flows, show close message
      setShowClose(true)
    }
  }

  const handleOptionSelect = (option: any, index: number) => {
    // If already selected correct answer, don't allow more selections
    if (isCorrect === true) return

    setSelectedOptionIndex(index)
    
    if (option.correct) {
      // Correct answer - show green and continue after delay
      setIsCorrect(true)
      
      // Wait a bit before continuing to next video
      setTimeout(() => {
        // Close popup and reset states
        setShowPopup(false)
        setCurrentPopup(null)
        setSelectedOptionIndex(null)
        setIsCorrect(null)
        
        // Move to next flow item (skip the popup we just answered)
        const nextIndex = currentFlowIndex + 2
        
        if (nextIndex < flows.length) {
          // Check if next item is a video
          const nextFlow = flows[nextIndex]
          if (nextFlow?.video) {
            setCurrentFlowIndex(nextIndex)
          } else {
            // If it's not a video (shouldn't happen in normal flow), show close
            setShowClose(true)
          }
        } else {
          // No more flows, show close message
          setShowClose(true)
        }
      }, 1500) // 1.5 second delay before continuing
    } else {
      // Wrong answer - show red (shake animation is handled by button className)
      setIsCorrect(false)
    }
  }

  const handleClose = () => {
    setShowClose(false)
    onClose()
  }

  return (
    <div className="absolute top-0 left-0 w-screen h-screen bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-stone-100 w-full max-w-5xl relative rounded-3xl flex flex-col border border-stone-700 shadow-2xl overflow-hidden">
        <div className="flex justify-between items-center p-4 pb-2">
          <div className="flex items-center gap-2">
            <span className="text-sm sm:text-base font-medium text-gray-700">
              Video
            </span>
            <span className="text-sm sm:text-base font-semibold text-gray-900 bg-gray-200 px-3 py-1 rounded-md">
              {currentVideoNumber} / {totalVideos}
            </span>
          </div>
          <div className="cursor-pointer duration-200 hover:scale-110 transition-transform" onClick={onClose}>
            <CircledCloseIcon />
          </div>
        </div>
        <div className="overflow-hidden rounded-2xl relative mx-4 mb-4">
          {currentVideoSrc && (
            <video
              ref={videoRef}
              src={currentVideoSrc}
              className="w-full"
              controls
              controlsList="nodownload noremoteplayback"
              onEnded={handleVideoEnd}
            />
          )}

          {showPopup && currentPopup && (
            <div className="absolute inset-0 bg-black/85 backdrop-blur-sm flex flex-col items-center justify-center text-white p-6 sm:p-8 md:p-10 gap-6 md:gap-8">
              <h3 className="text-lg font-semibold text-center leading-tight px-4 max-w-3xl">
                {currentPopup.text}
              </h3>
              <div className="flex flex-col gap-3 sm:gap-4 w-full max-w-2xl px-4">
                {currentPopup.options?.map((option: any, index: number) => {
                  const isSelected = selectedOptionIndex === index
                  const isSelectedCorrect = isSelected && option.correct
                  const isSelectedWrong = isSelected && !option.correct
                  
                  // Determine button styling
                  let buttonClass = "hover:scale-103 px-5 py-4 sm:px-6 sm:py-4 rounded-lg cursor-pointer text-base sm:text-sm font-medium transition-all duration-300 text-left w-full "
                  
                  if (isSelectedCorrect) {
                    // Correct answer selected - green
                    buttonClass += "bg-green-600 hover:bg-green-700 text-white scale-[1.02] shadow-lg shadow-green-500/50 border-2 border-green-400"
                  } else if (isSelectedWrong) {
                    // Wrong answer selected - red with light background
                    buttonClass += "bg-red-500 hover:bg-red-600 text-white animate-shake border-2 border-red-400"
                  } else if (isCorrect === true && option.correct) {
                    // Show correct answer in green even if not selected
                    buttonClass += "bg-green-500 text-white border-2 border-green-400"
                  } else {
                    // Default state
                    buttonClass += "bg-white hover:bg-gray-50 text-gray-800 border-2 border-gray-200 hover:border-gray-300 shadow-sm"
                  }
                  
                  // Disable buttons if correct answer already selected
                  const isDisabled = isCorrect === true
                  
                  return (
                    <button
                      key={index}
                      onClick={() => handleOptionSelect(option, index)}
                      disabled={isDisabled}
                      className={buttonClass}
                    >
                      {option.text}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {showClose && (
            <div className="absolute inset-0 bg-black/75 backdrop-blur-sm flex flex-col items-center justify-center text-white gap-6 p-6">
              <p className="text-2xl sm:text-3xl font-semibold">Video selesai!</p>
              <p className="text-base sm:text-lg text-gray-300 text-center max-w-md">
                Terima kasih kerana menonton. Semoga anda mendapat manfaat daripada modul ini.
              </p>
              <button
                onClick={handleClose}
                className="bg-white hover:bg-gray-100 text-gray-900 px-8 py-3 rounded-lg cursor-pointer font-medium text-base sm:text-lg transition-all duration-200 shadow-lg hover:shadow-xl mt-2"
              >
                Tutup
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
