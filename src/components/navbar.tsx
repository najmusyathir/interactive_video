"use client"

import Link from "next/link";
import { useState } from "react";
import { MenuIcon } from "./icons";

const FaqNav = ({ label, href }: { label: string; href: string }) => (
  <Link className="hover:bg-stone-500 p-2 px-3 md:px-16 duration-200" href={href}>{label}</Link>
);

export default function Navbar() {
  const [openNav, setOpenNav] = useState(false)

  return (
    <div className="w-full bg-stone-400 flex flex-col relative">
      <div className="text-white hidden md:flex flex-col md:flex-row justify-center font-bold md:text-base">
        <FaqNav href={'/'} label={"LAMAN UTAMA"} />
        <FaqNav href={'/teknik-pengurusan'} label={"TEKNIK-TEKNIK PENGURUSAN"} />
        <FaqNav href={'/rujukan-tambahan'} label={"RUJUKAN TAMBAHAN"} />
      </div>

      <div className="text-white flex flex-col justify-center py-2 px-3 gap-3 md:hidden">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold">
            MENU
          </h2>

          <button className="p-1 rounded-lg text-white border-2 w-min h-min hover:bg-stone-600 duration-200 cursor-pointer" onClick={() => setOpenNav(!openNav)}>
            <MenuIcon size={20} className="text-white" />
          </button>
        </div>
        {openNav &&
          <div className="flex flex-col border-t border-stone-50">
            <FaqNav href={'/'} label={"LAMAN UTAMA"} />
            <FaqNav href={'/teknik-pengurusan'} label={"TEKNIK-TEKNIK PENGURUSAN"} />
            <FaqNav href={'/rujukan-tambahan'} label={"RUJUKAN TAMBAHAN"} />
          </div>
        }
      </div>
    </div>
  );
}
