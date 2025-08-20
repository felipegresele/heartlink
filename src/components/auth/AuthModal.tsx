import { Controller, useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/firebaseconfig";

// Definindo o tipo de dados do formulário
type AuthFormProps = {
  email: string;
  password: string;
  confirmPassword: string;
  displayName: string;
};

// Definindo o tipo da propriedade para o modal
interface AuthModalProps {
  fecharModal: () => void; // Função para fechar o modal
}

export function AuthModal({ fecharModal }: AuthModalProps) {
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

        {/* Formulário de autenticação */}
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
        //cria o usuario com email e senha
        const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password)
        
        //atualiza o nome no firebase auth
        await updateProfile(userCredential.user, {
            displayName: data.displayName,
        })

        //salva os dados do usuário no fireStone
        await addDoc(collection(db, "usuarios"), {
            uid: userCredential.user.uid,
            nome: data.displayName,
            email: data.email
        })

        console.log("Usuário cadastrado com sucesso!")
        fecharModal()
    } catch(error) {
        console.error("Erro ao cadastrar: ", error)
        alert("Erro ao cadastrar")
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
            <input
              {...field}
              placeholder="Digite seu nome completo"
              className="w-full p-2 border border-gray-600 rounded-md mb-2 bg-gray-700 text-white focus:outline-none focus:border-red-500"
            />
            {errors.displayName && (
              <p className="text-xs text-red-500">{errors.displayName.message}</p>
            )}
          </>
        )}
      />

      {/* Email */}
      <Controller
        name="email"
        control={control}
        rules={{
          required: { value: true, message: "Email é obrigatório" },
          validate: async (value) => {
            try {
                const resp = await fetch(`https://emailvalidation.abstractapi.com/v1/?api_key=f789f509a13643a3ae9ec34a6fb22d6c&email=${value}`)
                const data = await resp.json(); //transformando a resp em json no data

                if (!data.is_valid_format?.value) {
                    return "Formato de e-mail inválido";
                }

                if (!data.deliverability || data.deliverability === "UNDELIVERABLE") {
                    return "Esse email é inválido"
                }

                return true
            } catch (error) {
                console.error(error)
                return "Erro ao validar -mail"
            }
          }
        }}
        render={({ field }) => (
          <>
            <label className="block text-sm font-medium mb-1 text-white">Email:</label>
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
            <label className="block text-sm font-medium mb-1 text-white">Senha:</label>
            <input
              {...field}
              placeholder="Digite sua senha"
              type="password"
              className="w-full p-2 border border-gray-600 rounded-md mb-2 bg-gray-700 text-white focus:outline-none focus:border-red-500"
            />
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password.message}</p>
            )}
          </>
        )}
      />

      <Controller
        name="confirmPassword"
        control={control}
        rules={{
          required: { value: true, message: "Confirme a senha por favor" },
          validate: (value) => {
            const senha = getValues("password")

            if(value !== senha) {
                return "As senhas não coincidem"
            }
            return true
          }
        }}
        render={({ field }) => (
          <>
            <label className="block text-sm font-medium mb-1 text-white">Confirmar Senha:</label>
            <input
              {...field}
              placeholder="Confirme sua senha"
              type="password"
              className="w-full p-2 border border-gray-600 rounded-md mb-2 bg-gray-700 text-white focus:outline-none focus:border-red-500"
            />
            {errors.confirmPassword && (
              <p className="text-xs text-red-500">{errors.confirmPassword.message}</p>
            )}
          </>
        )}
      />

      <button
        type="submit"
        className="w-full mt-4 bg-red-700 font-bold text-white py-2 rounded-md hover:bg-red-500 focus:outline-none"
      >
        Criar Conta
      </button>
    </form>
  );
}
