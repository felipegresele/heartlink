import { Controller, useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import { auth } from "../../firebase/firebaseconfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

type LoginFormProps = {
  email: string;
  password: string;
};

interface LoginModalProps {
  fecharModal: () => void;
}

export function LoginModal({ fecharModal }: LoginModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full sm:w-100">
        {/* Fechar Modal */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold text-white">Heartlink</h1>
          <button onClick={fecharModal}>
            <IoClose size={20} color="white" />
          </button>
        </div>

        <LoginForm fecharModal={fecharModal} />
      </div>
    </div>
  );
}

export function LoginForm({ fecharModal }: LoginModalProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormProps>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();
  const [mensagem, setMensagem] = useState(""); // Estado para mostrar a mensagem

  const onSubmit = async (data: LoginFormProps) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);

      alert("Login realizado com sucesso!"); 
      fecharModal();
      navigate("/");

    } catch (error: any) {
      if (error.code === "auth/user-not-found") {
        alert("Usuário não encontrado. Cadastre-se primeiro.");
      } else if (error.code === "auth/wrong-password") {
        alert("Senha incorreta.");
      } else {
        alert("Erro ao fazer login: " + error.message);
      }
      console.error("Erro no login: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="text-white">
      <h2 className="text-lg font-semibold mb-4 text-white">Faça login</h2>

      {/* Mensagem */}
      {mensagem && (
        <p className="mb-2 text-sm font-semibold text-yellow-400">{mensagem}</p>
      )}

      {/* Email */}
      <Controller
        name="email"
        control={control}
        rules={{
          required: { value: true, message: "Email é obrigatório" },
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Formato de e-mail inválido",
          },
        }}
        render={({ field }) => (
          <>
            <label className="block text-sm font-medium mb-1 text-white">
              Email:
            </label>
            <input
              {...field}
              placeholder="Digite seu email"
              className="w-full p-2 border border-gray-600 rounded-md mb-2 bg-gray-700 text-white focus:outline-none focus:border-red-500"
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email.message}</p>
            )}
          </>
        )}
      />

      {/* Senha */}
      <Controller
        name="password"
        control={control}
        rules={{
          required: { value: true, message: "Senha é obrigatória" },
        }}
        render={({ field }) => (
          <>
            <label className="block text-sm font-medium mb-1 text-white">
              Senha:
            </label>
            <input
              {...field}
              type="password"
              placeholder="Digite sua senha"
              className="w-full p-2 border border-gray-600 rounded-md mb-2 bg-gray-700 text-white focus:outline-none focus:border-red-500"
            />
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password.message}</p>
            )}
          </>
        )}
      />

      <button
        type="submit"
        className="w-full mt-4 bg-red-700 font-bold text-white py-2 rounded-md hover:bg-red-500 focus:outline-none"
      >
        Entrar
      </button>
    </form>
  );
}
