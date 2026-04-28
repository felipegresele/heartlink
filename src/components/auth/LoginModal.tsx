import { Controller, useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { apiPost } from "../../api/auth/api";
import { AuthModal } from "./AuthModal";
import { useState } from "react";

type LoginFormProps = { email: string; password: string };
interface LoginModalProps { fecharModal: () => void }

export function LoginModal({ fecharModal }: LoginModalProps) {
  const [modoCadastro, setModoCadastro] = useState(false);

  if (modoCadastro) {
    return <AuthModal fecharModal={fecharModal} />;
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-[#FAFAFA] border border-gray-300 p-8 rounded-2xl shadow-2xl w-full max-w-md transform transition-all">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-extrabold text-black tracking-tight">HeartCode</h1>
          <button
            onClick={fecharModal}
            className="p-1 hover:bg-gray-200 rounded-full transition-colors"
          >
            <IoClose size={24} className="text-gray-400 hover:text-black" />
          </button>
        </div>
        <LoginForm fecharModal={fecharModal} onCadastro={() => setModoCadastro(true)} />
      </div>
    </div>
  );
}

interface LoginFormInternalProps extends LoginModalProps {
  onCadastro: () => void;
}

function LoginForm({ fecharModal, onCadastro }: LoginFormInternalProps) {
  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormProps>({
    defaultValues: { email: "", password: "" }
  });
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormProps) => {
    try {
      const user = await apiPost("/users/login", data);
      // ✅ Salva o objeto completo incluindo o token JWT
      localStorage.setItem("user", JSON.stringify(user));
      fecharModal();
      navigate("/");
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <h2 className="text-lg font-medium text-black mb-1">Bem-vindo de volta</h2>
        <p className="text-sm text-gray-500 mb-2 mt-1">Você deve estar logado na sua conta para criar sua tela personalizada</p>
        <p className="text-sm text-gray-400 mb-6">Insira seus dados para acessar sua conta.</p>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-500 ml-1">Email</label>
          <Controller
            name="email" control={control}
            rules={{
              required: "Email é obrigatório",
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Email inválido" }
            }}
            render={({ field }) => (
              <input
                {...field}
                placeholder="exemplo@email.com"
                className={`w-full px-4 py-3 bg-gray-100 border rounded-xl text-black outline-none transition-all focus:ring-2 
                  ${errors.email ? 'border-red-500 focus:ring-red-500/20' : 'border-gray-300 focus:border-[#e687cd] focus:ring-[#e687cd]/20'}`}
              />
            )}
          />
          {errors.email && <span className="text-xs text-red-400 ml-1">{errors.email.message}</span>}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-500 ml-1">Senha</label>
          <Controller
            name="password" control={control}
            rules={{ required: "Senha é obrigatória" }}
            render={({ field }) => (
              <input
                type="password"
                {...field}
                placeholder="••••••••"
                className={`w-full px-4 py-3 bg-gray-100 border rounded-xl text-black outline-none transition-all focus:ring-2 
                  ${errors.password ? 'border-red-500 focus:ring-red-500/20' : 'border-gray-300 focus:border-[#e687cd] focus:ring-[#e687cd]/20'}`}
              />
            )}
          />
          {errors.password && <span className="text-xs text-red-400 ml-1">{errors.password.message}</span>}
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-3 cursor-pointer px-4 mt-4 bg-[#e687cd] hover:bg-pink-400 text-white font-semibold rounded-xl transition-all active:scale-[0.98] shadow-lg shadow-pink-200"
      >
        Entrar na conta
      </button>

      <p className="text-sm text-center mt-4 text-gray-500">
        Não tem conta?{" "}
        <button
          type="button"
          onClick={onCadastro}
          className="text-[#e687cd] hover:underline"
        >
          Criar conta
        </button>
      </p>
    </form>
  );
}
