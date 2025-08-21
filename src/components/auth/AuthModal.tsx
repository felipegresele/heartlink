import { Controller, useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import { auth, db } from "../../firebase/firebaseconfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

type AuthFormProps = {
  email: string;
  password: string;
  confirmPassword: string;
  displayName: string;
};

interface AuthModalProps {
  fecharModal: () => void;
}

export function AuthModal({ fecharModal }: AuthModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full sm:w-100">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold text-white">Heartlink</h1>
          <button onClick={fecharModal}>
            <IoClose size={20} color="white" />
          </button>
        </div>

        <AuthForm fecharModal={fecharModal} />
      </div>
    </div>
  );
}

export function AuthForm({ fecharModal }: AuthModalProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm<AuthFormProps>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      displayName: "",
    },
  });

  const onSubmit = async (data: AuthFormProps) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(userCredential.user, {
        displayName: data.displayName,
      });

      await setDoc(doc(db, "users", userCredential.user.uid), {
        nome: data.displayName,
        email: data.email,
        createdAt: new Date(),
      });

      alert("Usuário cadastrado com sucesso!");
      fecharModal();
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        alert("Esse email já está cadastrado. Tente fazer login.");
      } else if (error.code === "auth/weak-password") {
        alert("A senha deve ter pelo menos 6 caracteres.");
      } else {
        alert("Erro ao cadastrar: " + error.message);
      }
      console.error("Erro ao cadastrar: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="text-white">
      <h2 className="text-lg font-semibold mb-4 text-white">Crie sua conta</h2>

      {/* Nome Completo */}
      <Controller
        name="displayName"
        control={control}
        rules={{
          required: { value: true, message: "Nome é obrigatório" },
          maxLength: { value: 30, message: "O nome deve ter no máximo 30 caracteres" },
          minLength: { value: 3, message: "O nome deve ter no mínimo 3 caracteres" },
        }}
        render={({ field }) => (
          <>
            <label className="block text-sm font-medium mb-1 text-white">Nome Completo:</label>
            <input {...field} placeholder="Digite seu nome completo" className="w-full p-2 border border-gray-600 rounded-md mb-2 bg-gray-700 text-white focus:outline-none focus:border-red-500" />
            {errors.displayName && <p className="text-xs text-red-500">{errors.displayName.message}</p>}
          </>
        )}
      />

      {/* Email */}
      <Controller
        name="email"
        control={control}
        rules={{
          required: { value: true, message: "Email é obrigatório" },
          pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Formato de e-mail inválido" },
        }}
        render={({ field }) => (
          <>
            <label className="block text-sm font-medium mb-1 text-white">Email:</label>
            <input {...field} placeholder="Digite seu email" className="w-full p-2 border border-gray-600 rounded-md mb-2 bg-gray-700 text-white focus:outline-none focus:border-red-500" />
            {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
          </>
        )}
      />

      {/* Senha */}
      <Controller
        name="password"
        control={control}
        rules={{ required: { value: true, message: "Senha é obrigatória" } }}
        render={({ field }) => (
          <>
            <label className="block text-sm font-medium mb-1 text-white">Senha:</label>
            <input {...field} placeholder="Digite sua senha" type="password" className="w-full p-2 border border-gray-600 rounded-md mb-2 bg-gray-700 text-white focus:outline-none focus:border-red-500" />
            {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
          </>
        )}
      />

      {/* Confirmar Senha */}
      <Controller
        name="confirmPassword"
        control={control}
        rules={{
          required: { value: true, message: "Confirme a senha por favor" },
          validate: (value) => value === getValues("password") || "As senhas não coincidem"
        }}
        render={({ field }) => (
          <>
            <label className="block text-sm font-medium mb-1 text-white">Confirmar Senha:</label>
            <input {...field} placeholder="Confirme sua senha" type="password" className="w-full p-2 border border-gray-600 rounded-md mb-2 bg-gray-700 text-white focus:outline-none focus:border-red-500" />
            {errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword.message}</p>}
          </>
        )}
      />

      <button type="submit" className="w-full mt-4 bg-red-700 font-bold text-white py-2 rounded-md hover:bg-red-500 focus:outline-none">
        Criar Conta
      </button>
    </form>
  );
}
