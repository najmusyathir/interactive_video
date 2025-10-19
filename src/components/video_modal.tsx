"use client"

import Link from "next/link";
import { useState } from "react";
import { CircledCloseIcon, MenuIcon } from "./icons";

const FaqNav = ({ label, href }: { label: string; href: string }) => (
  <Link className="hover:bg-stone-500 p-2 px-3 md:px-16 duration-200" href={href}>{label}</Link>
);

export default function VideoModal({ src }: { src: string }) {

  return (
    <div className="absolute top-0 left-0 w-screen h-screen bg-black/70 flex items-center justify-center">
      <div className="bg-stone-100 w-5xl relative rounded-3xl flex flex-col border border-stone-700 p-3 gap-3">
        <div className="flex justify-end">
          <CircledCloseIcon />
        </div>
        <div className="overflow-hidden rounded-2xl">
          <video src={src} className="w-full" controls controlsList="nodownload noremoteplayback" />
        </div>
      </div>
    </div>
  );
}
