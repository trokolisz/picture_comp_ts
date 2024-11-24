import Head from "@/components/header";

export default function Home() {
  return (
    <div className="grid ">
      <Head data="" />

      <header className="flex justify-between items-center p-4 bg-[#52be80] text-white">
        <div className="text-2xl font-bold">Gombakereső</div>
        <nav className="flex gap-4 justify-center flex-1">
          <a href="/about" className="hover:text-gray-200">About</a>
          <a href="/contact" className="hover:text-gray-200">Contact</a>
          <a href="/map" className="hover:text-gray-200">Map</a>
          <a href="/login" className="hover:text-gray-200">Log in</a>
        </nav>
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
