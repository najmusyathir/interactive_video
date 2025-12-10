"use client"

import { useEffect, useRef, useState } from "react"
import { CircledCloseIcon } from "./icons"

type FlowOption = {
  id: string
  label: string
  correct?: boolean
}

type Flow = {
  time: number
  text: string
  options?: FlowOption[]
}

type VideoData = {
  src: string
  flows: Flow[]
}

export default function VideoModal({ data, onClose, }: { data: VideoData; onClose: () => void; }) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [showMsg, setShowMsg] = useState(false)
  const [currentFlow, setCurrentFlow] = useState<Flow | null>(null)
  const [checkpointIndex, setCheckpointIndex] = useState(0)
  const [showClose, setShowClose] = useState(false)
  const [wrongOption, setWrongOption] = useState<string | null>(null)
  const [correctOption, setCorrectOption] = useState<string | null>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const timeoutId = setTimeout(() => {
      video.play().catch(() => {
        // Autoplay might be blocked by the browser; ignore the error
      })
    }, 1000)

    return () => clearTimeout(timeoutId)
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleTime = () => {
      const next = data.flows[checkpointIndex]
      if (next && video.currentTime >= next.time) {
        video.pause()
        setCurrentFlow(next)
        setShowMsg(true)
        setWrongOption(null)
        setCorrectOption(null)
      }
    }

    video.addEventListener("timeupdate", handleTime)
    return () => video.removeEventListener("timeupdate", handleTime)
  }, [checkpointIndex])

  const handleContinue = () => {
    setShowMsg(false)
    setCheckpointIndex(prev => prev + 1)
    setCurrentFlow(null)
    setWrongOption(null)
    setCorrectOption(null)
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
            src={data.src}
            className="w-full"
            controls
            controlsList="nodownload noremoteplayback"
            onEnded={handleEnd}
          />

          {showMsg && currentFlow && (
            <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center px-4">
              <div className="w-full max-w-xl bg-white/95 text-slate-900 rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-full bg-slate-900 text-white flex items-center justify-center text-lg font-semibold">
                    Q{checkpointIndex + 1}
                  </div>
                  <div className="space-y-2">
                    <p className="text-lg font-semibold leading-snug">{currentFlow.text}</p>
                    <p className="text-sm text-slate-500">Pilih jawapan yang betul untuk teruskan.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(currentFlow.options && currentFlow.options.length > 0)
                    ? currentFlow.options.map((option) => {
                      const isWrong = wrongOption === option.id
                      const isCorrect = correctOption === option.id
                      return (
                        <button
                          key={option.id}
                          onClick={() => {
                            if (option.correct) {
                              setCorrectOption(option.id)
                              setTimeout(handleContinue, 400)
                            } else {
                              setWrongOption(option.id)
                              setTimeout(() => setWrongOption(null), 1200)
                            }
                          }}
                          className={[
                            "text-left px-4 py-3 rounded-xl border transition-all duration-200",
                            "cursor-pointer shadow-sm hover:shadow",
                            isCorrect ? "bg-emerald-500 text-white border-emerald-500" : "",
                            isWrong ? "bg-rose-500 text-white border-rose-500" : "",
                            !isCorrect && !isWrong ? "bg-slate-50 border-slate-200 hover:border-slate-300" : "",
                          ].join(" ")}
                        >
                          {option.label}
                        </button>
                      )
                    })
                    : (
                      <button
                        onClick={handleContinue}
                        className="col-span-full bg-slate-900 text-white px-4 py-3 rounded-xl hover:bg-slate-800 transition-all"
                      >
                        Teruskan
                      </button>
                    )}
                </div>
              </div>
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
