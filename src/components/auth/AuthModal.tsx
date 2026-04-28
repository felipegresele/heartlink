import { IoClose } from "react-icons/io5";
import { apiPost } from "../../api/auth/api";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type AuthFormProps = { displayName: string; email: string; password: string; confirmPassword: string };
interface AuthModalProps { fecharModal: () => void }

export function AuthModal({ fecharModal }: AuthModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-[#FAFAFA] border border-gray-300 p-8 rounded-2xl shadow-2xl w-full max-w-md max-h-[95vh] overflow-y-auto custom-scrollbar">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-extrabold text-black tracking-tight">HeartCode</h1>
          <button
            onClick={fecharModal}
            className="p-1 hover:bg-gray-200 rounded-full transition-colors"
          >
            <IoClose size={24} className="text-gray-400 hover:text-black"/>
          </button>
        </div>
        <AuthForm fecharModal={fecharModal} />
      </div>
    </div>
  );
}

function AuthForm({ fecharModal }: AuthModalProps) {
  const { control, handleSubmit, formState: { errors }, getValues } = useForm<AuthFormProps>({
    defaultValues: { displayName: "", email: "", password: "", confirmPassword: "" }
  });
  const navigate = useNavigate();

  const onSubmit = async (data: AuthFormProps) => {
    try {
      const user = await apiPost("/users", {
        username: data.displayName,
        email: data.email,
        password: data.password
      });
      // ✅ Cadastro já retorna token — salva e loga automaticamente
      localStorage.setItem("user", JSON.stringify(user));
      fecharModal();
      navigate("/");
    } catch (err: any) {
      alert(err.message);
    }
  };

  const inputStyles = (hasError: any) => `
    w-full px-4 py-2.5 bg-gray-100 border rounded-xl text-black outline-none transition-all focus:ring-2 
    ${hasError ? 'border-red-500 focus:ring-red-500/20' : 'border-gray-300 focus:border-[#e687cd] focus:ring-[#e687cd]/20'}
  `;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <h2 className="text-lg font-medium text-black">Crie sua conta</h2>
        <p className="text-sm text-gray-500 mb-2">Junte-se à nossa comunidade hoje.</p>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-500 ml-1">Nome de exibição</label>
        <Controller name="displayName" control={control}
          rules={{ required: "Nome obrigatório", minLength: { value: 3, message: "Mínimo 3 caracteres" } }}
          render={({ field }) => (
            <input {...field} placeholder="Seu nome" className={inputStyles(errors.displayName)} />
          )}
        />
        {errors.displayName && <span className="text-xs text-red-400 ml-1">{errors.displayName.message}</span>}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-500 ml-1">Email</label>
        <Controller name="email" control={control}
          rules={{ required: "Email obrigatório", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Email inválido" } }}
          render={({ field }) => (
            <input {...field} placeholder="seu@email.com" className={inputStyles(errors.email)} />
          )}
        />
        {errors.email && <span className="text-xs text-red-400 ml-1">{errors.email.message}</span>}
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-500 ml-1">Senha</label>
          <Controller name="password" control={control}
            rules={{ required: "Senha obrigatória", minLength: { value: 6, message: "Mínimo 6 caracteres" } }}
            render={({ field }) => (
              <input type="password" {...field} placeholder="••••••••" className={inputStyles(errors.password)} />
            )}
          />
          {errors.password && <span className="text-xs text-red-400 ml-1">{errors.password.message}</span>}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-500 ml-1">Confirmar Senha</label>
          <Controller name="confirmPassword" control={control}
            rules={{ required: "Confirme a senha", validate: (v) => v === getValues("password") || "Senhas não coincidem" }}
            render={({ field }) => (
              <input type="password" {...field} placeholder="••••••••" className={inputStyles(errors.confirmPassword)} />
            )}
          />
          {errors.confirmPassword && <span className="text-xs text-red-400 ml-1">{errors.confirmPassword.message}</span>}
        </div>
      </div>

      <button
        type="submit"
        className="w-full cursor-pointer py-3 px-4 mt-6 bg-[#e687cd] hover:bg-pink-400 text-white font-bold rounded-xl transition-all active:scale-[0.98] shadow-lg shadow-pink-200"
      >
        Cadastrar agora
      </button>

      <p className="text-center text-xs text-gray-500 mt-4">
        Ao se cadastrar, você concorda com nossos Termos de Serviço.
      </p>
    </form>
  );
}
