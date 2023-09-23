import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Input } from "@/components/Input";
import { PasswordInput } from "@/components/Input/PasswordInput";
import { Button, Typography } from "@mui/material";
import { useAuth } from "@/hooks/useAuth";
import { maskCPF, maskPhone } from "@/utils/masks";
import { RegisterFormData, registerFormSchema } from "@/utils/zodValidationsSchemas";
import { api } from "@/lib/axios";
import { toastNotify } from "@/lib/toastify";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";

export default function Register() {
  const [searchAdressSucessfull, setSearchAdressSucessfull] = useState(false)
  const { 
      watch, 
      setValue, 
      handleSubmit, 
      setError,
      clearErrors,
      control,
      formState: { 
        errors, 
        isSubmitting 
      }
    } = useForm<RegisterFormData>({
      resolver: zodResolver(registerFormSchema)
    })

    const { signUp } = useAuth()

    const router = useRouter()
    
    const cep = watch("cep")
    const cpf = watch("cpf")
    const phone = watch("phone")

    async function handleSearchAddress() {
      if(!cep) {
        setError("cep", { message:"Preencha esse campo" })
        return;
      }

      if(cep.length < 8) {
        setError("cep", { type: "value", message:"CEP inválido" })
        return;
      }

      try {
          const response = await api.get(`https://viacep.com.br/ws/${cep}/json`)
          
          if(response.status === 400) {
            setError("cep", { message: "CEP não encontrado" })

            throw new Error(response.data.message)
          }

          const { data } = response
          
          clearErrors()

          setSearchAdressSucessfull(true)

          setValue("street", data.logradouro)
          setValue("neighbour", data.bairro)
          setValue("complement", data.complemento)
          setValue("city", data.localidade)
          setValue("uf", data.uf)
      } catch(e: any) {
        console.log(e)
      }
    }

    function handleRegister(data: RegisterFormData) {
      signUp(data)

      toastNotify("success", "Cadastro realizado com sucesso!")

      router.push('/login')
    }

  
    useEffect(() => {
      setValue("cpf", maskCPF(cpf))
    },[cpf])

    useEffect(() => {
      setValue("phone", maskPhone(phone))
    },[phone])

  return (
        <>
          <Head>
              <title>Cadastre-se | Viveo</title>
          </Head>

          <Header /> 
          
          <main className="flex bg-slate-100 p-10">

            <section className='mt-2'>
              <Typography variant="h1" className='text-3xl mb-8'>
                Cadastre-se! É facil e rápido
              </Typography>
              <form 
                className="lg:w-4/5 shadow-lg flex flex-col gap-8 bg-white p-8 rounded border border-slate-300" 
                onSubmit={handleSubmit(handleRegister)}
                >
                <div>
                  <h2 className="text-xl mb-4">Dados Pessoais</h2>
                  
                  <div className="flex flex-col gap-4 md:grid md:grid-cols-2">
                    <Input 
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Nome completo" 
                        control={control} 
                        errorMessage={errors.name?.message}
                        className="col-span-2"
                        />
                    <Input 
                        id="cpf"
                        name="cpf"
                        type="text"
                        placeholder="CPF"
                        control={control}
                        errorMessage={errors.cpf?.message}
                        maxLength={14}
                        />
                    <Input 
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="Telefone"
                        control={control}
                        errorMessage={errors.phone?.message}
                        maxLength={15}
                        />
                    <Input 
                        id="email"
                        name="email"
                        type="email"
                        placeholder="E-mail"
                        control={control}
                        errorMessage={errors.email?.message}
                        className="col-span-2"
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
                  </div>
                </div>

                <div>
                  <h2 className="text-xl mb-4">Endereço</h2>

                  <div className="flex flex-col gap-4 md:grid md:address-form">
                    <div className="flex gap-2 items-start col-span-3">
                      <Input 
                        type="text"
                        id="cep"
                        name="cep"
                        placeholder="CEP" 
                        control={control} 
                        errorMessage={errors.cep?.message}
                      />
                      <Button 
                        variant="contained" 
                        className="bg-blue-primary h-14 text-blue-dark hover:bg-blue-dark hover:text-blue-primary"
                        onClick={handleSearchAddress}
                      >
                        Buscar CEP
                      </Button>
                    </div>

                    <Input 
                      type="text"
                      id="street"
                      name="street"
                      placeholder="Endereço" 
                      control={control} 
                      errorMessage={errors.street?.message}
                      className="col-span-3"
                      disabled={!searchAdressSucessfull}
                      />
                    <Input 
                      type="text"
                      id="number"
                      name="number"
                      placeholder="Número" 
                      control={control} 
                      errorMessage={errors.number?.message}
                      disabled={!searchAdressSucessfull}
                      />
                    <Input 
                      type="text"
                      id="complement"
                      name="complement"
                      placeholder="Complemento (Opcional)" 
                      control={control} 
                      errorMessage={errors.complement?.message}
                      className="col-span-2"
                      disabled={!searchAdressSucessfull}
                      />
                    <Input 
                      type="text"
                      id="neighbour"
                      name="neighbour"
                      placeholder="Bairro" 
                      control={control} 
                      errorMessage={errors.neighbour?.message}
                      disabled={!searchAdressSucessfull}
                      />
                    <Input 
                      type="text"
                      id="city"
                      name="city"
                      placeholder="Cidade" 
                      control={control} 
                      errorMessage={errors.city?.message}
                      disabled={!searchAdressSucessfull}
                      />
                    <Input 
                      type="text"
                      id="uf"
                      name="uf"
                      placeholder="UF" 
                      control={control} 
                      errorMessage={errors.uf?.message}
                      disabled={!searchAdressSucessfull}
                      />
                  </div>

                </div>
                <Button 
                    className='col-span-2 text-lg p-3 bg-blue-primary text-blue-dark hover:bg-blue-dark hover:text-blue-primary' 
                    variant="contained"
                    size="large"
                    type="submit"
                    disabled={isSubmitting}
                    >
                    Cadastrar
                </Button>

                <Typography variant='body1' className='text-center'>
                  Já possui cadastro?
                  <Link className='text-link' href="/login"> Faça login</Link>
                </Typography>
              </form>
            </section>
            
            <section className="hidden lg:block mt-24">
              <Image width={400} height={400} src="/images/register-page-badge.svg" alt="" />
            </section>
          </main>

          <Footer />
        </>
  )
}