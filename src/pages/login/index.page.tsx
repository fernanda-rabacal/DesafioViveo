import 'react-toastify/dist/ReactToastify.css';
import Head from "next/head";
import Link from "next/link";
import Image from 'next/image';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toastNotify } from '@/lib/toastify';
import { ToastContainer } from "react-toastify";
import { Input } from '@/components/Input';
import { PasswordInput } from '@/components/Input/PasswordInput';
import { Button, Checkbox, FormControlLabel, Typography } from '@mui/material';
import { LoginFormData, loginFormSchema } from '@/utils/zodValidationsSchemas';
import { useAuth } from '@/hooks/useAuth';


export default function Login() {
  const { 
      control, 
      register, 
      handleSubmit, 
      formState: { 
        errors 
      } 
    } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema)
  })

  const { signIn } = useAuth()

  function handleSignIn(data: LoginFormData) {
    const { status, user } = signIn(data)

    console.log("teste")
    
    if(!status) {
      toastNotify("error", "Email ou senha incorretos")
      return;
    }

    toastNotify("success", `Login feito, ${user?.name}`)
  }
  
  return(
    <>
      <Head>
        <title>Login | Viveo</title>
      </Head>


      <main>
        <ToastContainer />

        <section className='grid grid-cols-1 lg:grid-cols-2 h-screen'>
          <div className='flex flex-col items-center justify-center mt-4'>
            <Image width={150} height={150} src="/images/viveo-logo.svg" alt="Viveo Logo" className='md:w-48'/>

            <Typography variant="h1" className='text-4xl my-8 lg:my-12'>
              Acesse sua conta
            </Typography>

            <form onSubmit={handleSubmit(handleSignIn)} className='w-4/5 lg:w-3/5 flex flex-col gap-5'>
              <Input 
                type="email" 
                name="email" 
                id="email" 
                placeholder="E-mail" 
                errorMessage={errors.email?.message}
                control={control} 
              />

              <PasswordInput 
                id="password" 
                name="password" 
                placeholder='Senha'
                errorMessage={errors.password?.message}
                control={control} 
              />

              <div className='flex flex-col xl:flex-row xl:items-center justify-between'>
                <FormControlLabel 
                  id="keep-connect"  
                  value="yes"
                  control={<Checkbox />} 
                  label="Mantenha-me conectado"
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
          </div>

          <div className="hidden lg:flex items-center justify-center bg-blue-primary">
            <Image width={400} height={400} src="/images/login-page-badge.svg" alt="" />
          </div>
        </section>
      </main>
    </>
  )
}