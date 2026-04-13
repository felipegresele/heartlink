import img from "../../../../../img/bg-retrospectiva.png";

export function RetrospectiveBtn({ isVisible }: { isVisible: () => void }) {

  return (
    <div>
        <div className="w-100 h-110">
          <img src={img} className="w-80 h-full object-cover rounded-md" />
          <div className="absolute inset-0 flex items-end justify-center pb-6">
            <button onClick={isVisible} className="bg-green-500 font-bold text-black w-35 h-12 mb-30 rounded-md cursor-pointer">
              Acessar
            </button>
          </div>
        </div>
    </div>
  );
}