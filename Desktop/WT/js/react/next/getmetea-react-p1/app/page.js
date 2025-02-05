import Image from "next/image";

export default function Home() {
  return (
    <>
      <div>
        <div className="flex justify-center text-white h-[44vh] items-center flex-col gap-4">
          <div className="font-bold text-5xl flex justify-center items-center gap-2"> Buy Me a Tea <span><img src="/p1gif.gif" alt="" width={44} /></span></div>
          <p>
            A crowdfunding platform for developers. Fund your projects effortlessly. Start Now!
          </p>
          <div>
            <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
              {/* this button is taken from tailwind flobite webiste */}
              Start here
            </button>
            <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
              Read More
            </button>
          </div>
        </div>
      </div>
      <div className="bg-white h-1 opacity-10 text-white">
      </div>

      <div className="text-white container mx-auto pb-32 pt-14">
        <h2 className="text-3xl font-bold text-center mb-14">Your Fans can buy you a Tea</h2>
        <div className="flex gap-5 justify-around">
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img src="/funds.gif" alt="" className="bg-slate-400 rounded-full p-2 text-black" width={44} />
            <p className="font-bold">Fund Yourself</p>
            <p className="text-center">Fans want to help you</p>
          </div>
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img src="/friend.gif" alt="" className="bg-slate-400 rounded-full p-2 text-black" width={44} />
            <p className="font-bold">Fund Yourself</p>
            <p className="text-center">Fans want to help you</p>
          </div>
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img src="/coin.gif" alt="" className="bg-slate-400 rounded-full p-2 text-black" width={44} />
            <p className="font-bold">Fund Yourself</p>
            <p className="text-center">Fans want to help you</p>
          </div>
        </div>
      </div>

      <div className="bg-white h-1 opacity-10 text-white">
      </div>

      <div className="text-white container mx-auto pb-32 pt-14 flex flex-col items-center">
        <h2 className="text-3xl font-bold text-center mb-14">Learn more about us</h2>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/ea5fdEU947w?si=FRwLW-5JeqDpw40W" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </div>
    </>
  );
}
