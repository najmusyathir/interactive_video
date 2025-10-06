"use client"

import Accardion from "@/components/small-components/accordion";
import dataQnA from "@/lib/qna.json";
import dataArticle from "@/lib/article.json";
import { useState } from "react";


const FaqNav = ({ label, onClick }: { label: string; onClick: () => void }) => (
  <button
    className="p-1 md:p-3 md:px-6 hover:bg-black/10 duration-200 cursor-pointer w-full text-left"
    onClick={onClick}
  >
    {label}
  </button>
);

const FaqBody = ({ label, data }: { label: string; data: any }) => {
  return (
    <div className="md:px-24 flex flex-col w-full gap-6 min-h-[600px]">
      <h2 className="flex text-3xl md:text-6xl font-semibold">{label}</h2>
      <div className="w-full md:py-12">
        <Accardion data={data} />
      </div>
    </div>
  );
}


export default function Home() {
  const [page, setPage] = useState('qna')

  return (
    <div className="bg-stone-100">
      <div className="flex pt-8 md:pt-20 flex-col md:flex-row gap-6">
        
        <div className="flex flex-col pl-8 md:pl-20 gap-3 md:gap-16">
          <h2 className="text-2xl md:text-6xl font-bold">
            FAQ
          </h2>
          <div className="flex flex-col items-start underline md:text-3xl text-nowrap md:px-12">
            <FaqNav label="Q&A" onClick={() => setPage("qna")} />
            <FaqNav label="RUJUKAN BUKU & ARTIKEL" onClick={() => setPage("article")} />
          </div>
        </div>
        <div className="flex md:border-l-4 pb-24 w-full p-3">
          {page == 'qna' ? <FaqBody label="QnA" data={dataQnA} /> : <FaqBody label="Artikel" data={dataArticle} />}
        </div>
      </div>

    </div>
  );
}
