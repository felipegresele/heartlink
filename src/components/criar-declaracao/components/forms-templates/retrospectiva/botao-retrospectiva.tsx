import img from "../../../../../img/bg-retrospectiva.png";

export function RetrospectiveBtn({ isVisible }: { isVisible: () => void }) {
  return (
    <div className="flex bg-gray-900 flex-col justify-center items-center mt-4 h-150">
      
      <div className="flex justify-center items-center text-center">
        <img
          src={img}
          className="w-70 h-100 object-cover rounded-md"
        />
      </div>

      {/* BOTÃO COM BORDA ANIMADA */}
      <div className="p-[2px] rounded-md bg-gradient-to-r from-gray-500 via-red-500 to-pink-500 animate-border mt-4 mb-20">
        <button
          onClick={isVisible}
          className="bg-black text-white font-bold w-40 h-12 rounded-md cursor-pointer hover:scale-105 transition"
        >
          Acessar
        </button>
      </div>

    </div>
  );
}