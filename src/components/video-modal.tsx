"use client"

import { useEffect, useRef, useState } from "react"
import { CircledCloseIcon } from "./icons"

export default function VideoModal({ src, onClose, checkpoints }: { src: string; onClose: () => void; checkpoints: { time: number; text: string }[] }) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [showMsg, setShowMsg] = useState(false)
  const [msg, setMsg] = useState("")
  const [checkpointIndex, setCheckpointIndex] = useState(0)
  const [showClose, setShowClose] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleTime = () => {
      const next = checkpoints[checkpointIndex]
      if (next && video.currentTime >= next.time) {
        video.pause()
        setMsg(next.text)
        setShowMsg(true)
      }
    }

    video.addEventListener("timeupdate", handleTime)
    return () => video.removeEventListener("timeupdate", handleTime)
  }, [checkpointIndex])

  const handleContinue = () => {
    setShowMsg(false)
    setCheckpointIndex(prev => prev + 1)
    videoRef.current?.play()
  }

  const handleEnd = () => setShowClose(true)

  return (
    <div className="absolute top-0 left-0 w-screen h-screen bg-black/70 flex items-center justify-center">
      <div className="bg-stone-100 w-5xl relative rounded-3xl flex flex-col border border-stone-700 p-3 gap-3">
        <div className="flex justify-end">
          <div className="cursor-pointer duration-200 hover:scale-y-125 hover:scale-x-125" onClick={onClose}>
            <CircledCloseIcon />
          </div>
        </div>
        <div className="overflow-hidden rounded-2xl relative">
          <video
            ref={videoRef}
            src={src}
            className="w-full"
            controls
            controlsList="nodownload noremoteplayback"
            onEnded={handleEnd}
          />

          {showMsg && (
            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white text-xl gap-4">
              <p>{msg}</p>
              <button
                onClick={handleContinue}
                className="bg-white text-black px-4 py-2 rounded-md cursor-pointer hover:bg-gray-100"
              >
                Okay
              </button>
            </div>
          )}

          {showClose && (
            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white text-xl gap-4">
              <p>Video selesai!</p>
              <button
                onClick={onClose}
                className="bg-white text-black px-4 py-2 rounded-md cursor-pointer hover:bg-gray-100"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
