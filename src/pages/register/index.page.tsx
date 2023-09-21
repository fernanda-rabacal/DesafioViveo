import { Input } from "@/components/Input";
import { PasswordInput } from "@/components/Input/PasswordInput";
import { Button, FormControl, TextField, Typography } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import z  from 'zod'
import { useEffect } from "react";
import { maskCPF } from "@/utils/masks";
import { RegisterProps } from "@/@types/types";


const registerFormSchema = z.object({
    name: z
      .string()
      .min(3, { message: "Digite pelo menos três letras."}),
    email: z
      .string()
      .min(1, { message: "Este campo é obrigatório" })
      .email("Informe um email válido."),
    phone: z
      .string()
      .min(1, { message: "Este campo é obrigatório" }),
    cpf: z
      .string()
      .min(1, { message: "Este campo é obrigatório" }),
    password: z
      .string()
      .min(1, { message: "Este campo é obrigatório" }),
    confirm_password: z
      .string()
      .min(1, { message: "Este campo é obrigatório" }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Senhas não conferem.",
    path: ["confirm"],
  });
  
type RegisterFormData = z.infer<typeof registerFormSchema>

export default function Register() {
    const { 
        register, 
        watch, 
        setValue, 
        handleSubmit, 
        control,
        formState: { errors, isSubmitting }
      } = useForm<RegisterFormData>({
        resolver: zodResolver(registerFormSchema)
      })
    
      const cpfValue = watch("cpf")

      function handleRegister(data: RegisterProps) {
        console.log(data)
      }
    
      useEffect(() => {
        setValue("cpf", maskCPF(cpfValue))

        console.log(cpfValue)
      },[cpfValue])

    return (
        <>
            <Head>
                <title>Cadastre-se | Viveo</title>
            </Head>
            {/* <header className="w-full flex justify-center p-4 border-b border-rose-200">
                <Image width={150} height={150} src="/images/viveo-logo.svg" alt="Viveo Logo" />
            </header> */}
            <main className="flex flex-col items-center">
                <Typography variant="h1" className='text-4xl my-8 lg:my-12'>Cadastre, é rápido e facil</Typography>

                <section>
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit(handleRegister)}>
                        <input 
                            type="text"
                            id="name"
                            placeholder="Nome completo" {...register("name")} />
                        <Input 
                            id="cpf"
                            name="cpf"
                            type="text"
                            placeholder="CPF"
                            control={control}
                            />
                        <Input 
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="Telefone"
                            control={control}
                            />
                        <Input 
                            id="email"
                            name="email"
                            type="email"
                            placeholder="E-mail"
                            control={control}
                            />
                        <PasswordInput 
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Senha"
                            control={control}
                            />
                        <Input 
                            id="confirm_password"
                            name="confirm_password"
                            type="password"
                            placeholder="Confirme a senha"
                            icontrol={control}
                            />
                        <Button 
                            className='text-xl p-3 mt-3 bg-blue-primary text-blue-dark hover:bg-blue-dark hover:text-blue-primary' 
                            variant="contained"
                            size="large"
                            type="submit"
                            >
                            Cadastrar
                        </Button>
                        <FormControl>

                        </FormControl>
                    </form>
                </section>
            </main>
        </>
    )
}