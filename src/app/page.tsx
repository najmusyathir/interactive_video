import { CircledPlayIcon } from "@/components/icons";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <div className="abslute w-full h-full top-0 left-0">
        <Image src={'/bg.jpg'} alt={'background'} fill className="object-cover w-screen h-screen -z-10" />
      </div>
      <div className="pt-12">
        <span className="flex flex-col gap-5 bg-white/70 py-6 px-8 pl-16 w-min tracking-wide">
          <div className="flex flex-col gap-2">
            <span className="text-6xl font-bold pl-3"> COGNITIVE </span>
            <span className="text-8xl font-bold"> BEHAVIORAL </span>
            <span className="text-6xl font-bold pl-3"> THERAPY </span>
          </div>

          <p className="text-2xl">
            <span className="font-bold text-2xl text-nowrap">
              Pernahkah anda merasai <span className="text-red-600"> kegelisahan </span> sehingga sukar mengawalnya?
            </span>
            Terdapat teknik berasaskan Terapi Kognitif-Perilaku (CBT) <br />
            yang terbukti berkesan untuk membantu anda <br />
            menguruskannya secara berperingkat
          </p>
          <div className="flex justify-center">
            <div className="bg-gray-200 flex gap-3 items-center p-3 text-red-500 pr-8 rounded-full w-min text-lg text-nowrap font-bold hover:bg-gray-300 cursor-pointer duration-200">
              <CircledPlayIcon className="" size={35} /> TONTON VIDEO PENGENALAN
            </div>
          </div>
        </span>
      </div>
    </div>
  );
}
