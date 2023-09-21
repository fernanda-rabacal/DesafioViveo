import 'react-toastify/dist/ReactToastify.css';
import Head from "next/head";
import Link from "next/link";
import Image from 'next/image';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
//import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
import { toastNotify } from '@/lib/toastify';
import { ToastContainer } from "react-toastify";
import { Input } from '@/components/Input';
import { PasswordInput } from '@/components/Input/PasswordInput';
import {  
  Button, 
  Checkbox, 
  FormControlLabel, 
  Typography
} from '@mui/material';


const loginFormSchema = z.object({
  email: z.string().email({ message: "Email é obrigatório" }),
  password: z.string().min(1, { message: "Senha é obrigatória" }),
  keep_connected: z.string().transform(val => val === "yes" ? true : false)
})

type LoginFormData = z.infer<typeof loginFormSchema>

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema)
  })

  const router = useRouter()

  //const { signIn } = useContext(AuthContext)

  const handleSignIn = async (data: LoginFormData) => {
    toastNotify("success", "teste")
/*     const hasLogged = await signIn(data)

    if(hasLogged) {
      router.back()
    } */
  }

  return(
    <>
      <Head>
        <title>Login | Viveo</title>
      </Head>

      <ToastContainer />
      <main className='grid grid-cols-1 lg:grid-cols-2 h-screen'>
        <section className='flex flex-col items-center justify-center'>
          <Image width={150} height={150} src="/images/viveo-logo.svg" alt="Viveo Logo" className='md:w-48'/>

          <Typography variant="h1" className='text-4xl my-8 lg:my-12'>Acesse sua conta</Typography>

          <form onSubmit={handleSubmit(handleSignIn)} className='w-4/5 lg:w-3/5 flex flex-col gap-5' >
            <Input 
              type="email" 
              id="email" 
              placeholder="E-mail" 
              hasError={!!errors.email}
              {...register('email')} 
            />

            <PasswordInput 
              id="password" 
              placeholder='Senha'
              hasError={!!errors.password}
              {...register('password')} 
            />

            <div className='flex flex-col md:flex-row items-center justify-between'>
              <FormControlLabel 
                id="keep-connect"  
                value="yes"
                control={<Checkbox />} 
                label="Mantenha-me conectado" 
                {...register("keep_connected")}
              />
              <Link href="#" className='text-link'>Esqueceu sua senha?</Link>
            </div>

            <Button 
              className='text-xl p-3 mt-3 bg-blue-primary text-blue-dark hover:bg-blue-dark hover:text-blue-primary' 
              variant="contained"
              size="large"
              type="submit"
            >
              Login
            </Button>
            <Typography variant='body1' className='text-center'>
              Não possui conta? 
              <Link className='text-link' href="/register"> Cadastre-se!</Link>
            </Typography>
          </form>
        </section>

        <section className="hidden lg:flex items-center justify-center bg-blue-primary">
          <Image width={400} height={400} src="/images/login-page-badge.svg" alt="" />
        </section>
      </main>
    </>
  )
}