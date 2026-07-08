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
      <div
        role="button"
        tabIndex={0}
        onClick={isVisible}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            isVisible();
          }
        }}
        className="w-full rounded-2xl cursor-pointer hover:scale-105 active:scale-95 transition overflow-hidden"
      >
        <img
          src={imgBanner}
          className="w-250 h-130 object-cover rounded-2xl"
        />
      </div>
    </div>
  );
}