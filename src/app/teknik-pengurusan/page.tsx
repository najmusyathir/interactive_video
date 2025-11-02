"use client"
import VideoModal from "@/components/video-modal";
import landingVideoFlow from "@/lib/interactive video/landing.json";

import Image from "next/image";
import { useState } from "react";

export default function TeknikPengurusan() {
  const [showVid, setShowVid] = useState(false);

  const steps = [
    {
      img: "/images/bg-penyahpekaan-sistematik.webp",
      title: "Penyahpekaan Sistematik",
      desc: "Berhadapan dengan situasi cemas secara berperingkat, bermula dari mudah hingga sukar, supaya rasa takut beransur kurang.",
    },
    {
      img: "/images/bg-berhenti-berfikir.webp",
      title: "Berhenti Berfikir",
      desc: "Menghentikan fikiran negatif dengan teknik kawalan mental untuk menenangkan diri secara aktif.",
    },
    {
      img: "/images/bg-mengstrucktur-semula-kognitif.webp",
      title: "Mengstruktur Semula Kognitif",
      desc: "Menilai semula pemikiran yang salah dan menggantikannya dengan yang lebih rasional dan positif.",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-900">
      <div className="absolute w-full h-full top-0 left-0">
        <Image src={"/bg.jpg"} alt={"background"} fill className="object-cover w-screen h-screen opacity-40" />
      </div>

      <div className="relative flex flex-col gap-6">
        <h2 className="text-3xl text-slate-50 font-bold">
          Teknik-Teknik Pengurusan
        </h2>

        <div className="grid grid-cols-3 gap-6 place-items-center">
          {steps.map((step, i) => (
            <div
              key={i}
              className="relative aspect-[2/3] w-full sm:w-48 md:w-sm cursor-pointer overflow-hidden rounded-2xl group"
            >
              <Image
                src={step.img}
                alt={step.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 80vw, (max-width: 1024px) 85vw, 80vw"
              />

              <div className="absolute inset-0 flex flex-col justify-end p-6 gap-4 rounded-2xl text-slate-100 opacity-0 group-hover:opacity-100 bg-gradient-to-b from-slate-800/0 to-slate-800/100 transition-all duration-500 ease-in-out">
                <h4 className="text-xl font-semibold">{step.title}</h4>
                <p className="text-sm">{step.desc}</p>
                <button
                  onClick={() => setShowVid(true)}
                  className="px-4 py-2 rounded-full bg-slate-50 text-slate-800 hover:text-slate-50 hover:bg-slate-700 duration-200 cursor-pointer text-nowrap text-sm"
                >
                  Main sekarang
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showVid && <VideoModal onClose={() => setShowVid(false)} data={landingVideoFlow} />}
    </div>
  );
}
