import imgBanner from "../../../../../img/retrospectiva-banner-imgs/bg-retrospectiva-spotify.png";

export function RetrospectiveSpotifyBtn({
  isVisible,
}: {
  isVisible: () => void;
}) {
  return (
    <div
      className="flex flex-col justify-center items-center pt-4 pb-16"
      style={{
        background:
          "linear-gradient(180deg, #111827 0%, #0a0a0a 55%, #000000 100%)",
      }}
    >
      <div className="w-full max-w-sm px-4 flex justify-center items-center text-center">
        <button
        onClick={isVisible}
        className="mt-6 bg-[#3EC6F0] text-black font-bold w-40 h-12 rounded-full cursor-pointer hover:scale-105 active:scale-95 transition"
      ></button>
        <img
          src={imgBanner}
          className="w-full h-auto object-contain rounded-xl"
        />
      </div>

      <button
        onClick={isVisible}
        className="mt-6 bg-[#3EC6F0] text-black font-bold w-40 h-12 rounded-full cursor-pointer hover:scale-105 active:scale-95 transition"
      >
        Acessar
      </button>
    </div>
  );
}