import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import z  from 'zod'
import { maskCPF } from "@/utils/masks";

import { Input } from "@/components/Input";
import { PasswordInput } from "@/components/Input/PasswordInput";
import { Button, Typography } from "@mui/material";

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
        watch, 
        setValue, 
        handleSubmit, 
        control,
        formState: { 
          errors, 
          isSubmitting 
        }
      } = useForm<RegisterFormData>({
        resolver: zodResolver(registerFormSchema)
      })
    
      const cpfValue = watch("cpf")

      function handleRegister(data: RegisterFormData) {
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

          <main className="flex flex-col items-center">
            <section className='flex flex-col items-center justify-center mt-4 w-full'>
              <Image width={150} height={150} src="/images/viveo-logo.svg" alt="Viveo Logo" />

              <Typography variant="h1" className='text-4xl my-8 lg:my-12'>Cadastre, é rápido e facil</Typography>

              <form className="w-4/5 lg:w-3/5 flex flex-col gap-5" onSubmit={handleSubmit(handleRegister)}>
                  <Input 
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Nome completo" 
                      control={control} 
                      errorMessage={errors.name?.message}
                    />
                  <Input 
                      id="cpf"
                      name="cpf"
                      type="text"
                      placeholder="CPF"
                      control={control}
                      errorMessage={errors.cpf?.message}
                      />
                  <Input 
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="Telefone"
                      control={control}
                      errorMessage={errors.phone?.message}
                      />
                  <Input 
                      id="email"
                      name="email"
                      type="email"
                      placeholder="E-mail"
                      control={control}
                      errorMessage={errors.email?.message}
                      />
                  <PasswordInput 
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Senha"
                      control={control}
                      errorMessage={errors.password?.message}
                      />
                  <Input 
                      id="confirm_password"
                      name="confirm_password"
                      type="password"
                      placeholder="Confirme a senha"
                      control={control}
                      errorMessage={errors.confirm_password?.message}
                      />
                  <Button 
                      className='text-xl p-3 mt-3 bg-blue-primary text-blue-dark hover:bg-blue-dark hover:text-blue-primary' 
                      variant="contained"
                      size="large"
                      type="submit"
                      disabled={isSubmitting}
                      >
                      Cadastrar
                  </Button>
              </form>
            </section>
          </main>
        </>
    )
}