import Head from "@/components/header";
import dynamic from 'next/dynamic';
import NavMenu from "@/components/navbar";
// const DynamicMap = dynamic(() => import('@/components/Map'), { ssr: false });

export default function Home() {
  return (
    <div className="grid ">
      

      <header className="flex flex-col md:flex-row justify-between items-center p-4 bg-gradient-to-r from-green-400 to-blue-500 text-white shadow-lg rounded-b-lg">
        <h1 className="text-2xl font-bold text-center">Picture Competition</h1>
        <NavMenu />

      </header>          




<br/>

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0 ">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3 ">
        <div className="aspect-video rounded-xl bg-muted/50 hover:bg-[#52be80]">
            Doboz 1
          </div>
          <div className="aspect-video rounded-xl bg-muted/50 hover:bg-[#52be80]" >
            Doboz 2
          </div>
          <div className="aspect-video rounded-xl bg-muted/50 hover:bg-[#52be80]" >
            Doboz 3
          </div>
        </div>
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
      </div>

    </div>
  );
}
