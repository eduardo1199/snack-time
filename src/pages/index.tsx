import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { api } from '../services/api';
import Cookies from 'universal-cookie';

import { TextField, CircularProgress } from '@mui/material';

import { toast } from 'react-toastify';

import { ToastContainer } from 'react-toastify';

import styles from '../styles/signin.module.scss';
import { useRouter } from 'next/router';

import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

type SignFormData = {
  login: string;
  password: string;
}

const signInFormSchema = yup.object().shape({
  login: yup.string().required('Login obrigatório'),
  password: yup.string().required('Senha obrigatória').min(6, 'A senha precisa de no mínino 6 caracteres')
})

export default function Home() {
  const [step, setStep] = useState<number>(0);

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema)
  });

  const cookies = new Cookies();

  const router = useRouter();
  
  useEffect(() => {
    localStorage.clear();
  }, []);

  const handleRegisterUser: SubmitHandler<SignFormData>  = async (fields, event) => {
    event.preventDefault();

    const { login, password } = fields;

    try {
       const response = await api.post('/user', {
        login,
        password
      });

      toast.success("Usuário cadastrado com sucesso!", {
        theme: 'dark'
      });

      setStep(0);
    } catch (err) {
      toast.error('Login já utilizado!', {
        theme: 'dark'
      });
    }
  }

  const handleLoginUser: SubmitHandler<SignFormData> = async (fields, event) => {
    event.preventDefault();

    const { login, password } = fields;

    try {
      const response = await api.post('/login', {
        login,
        password
      });

      if(!response.data.token) {
        toast.error("Erro ao verificar cadastro!", {
          theme: 'dark'
        });

        return;
      }

      cookies.set('token', response.data.token);
      cookies.set('user', login);

      router.push('/establishments');
    } catch (err) {
      toast.error("Erro realizar login, verificar sua senha!", {
        theme: 'dark'
      });
    }
  }

  return (
    <>
      <Head>SignIn</Head>
      <main className={styles.main}>
        <section className={styles.section}>
          <span>
            Pronto para o lanche!
            <h1>
              Só aqui no SnackTime tem!
            </h1>
          </span>
          <h4>
            Faça o cadastro na nossa página para curtir seu lanche! 
          </h4>
        </section>
        <div>
          {step === 0 ? (
            <form onSubmit={handleSubmit(handleLoginUser)} className={styles.formStyle}>
              <TextField
                label="Login"
                variant="filled"
                InputLabelProps={{
                  style: { color: '#fff' },
                }}
                InputProps={{
                  style: { color: '#fff' },
                }}
                error={formState.errors['login'] ? true : false}
                helperText={formState.errors['login']?.message ?? ''}
                {...register('login')}
              />
              <TextField
                label="Senha"
                variant="filled"
                type="password"
                error={formState.errors['password'] ? true : false}
                helperText={formState.errors['password']?.message ?? ''}
                InputProps={{
                  style: { color: '#fff' },
                }}
                InputLabelProps={{
                  style: { color: '#fff' },
                }}
                {...register('password')}
              />
              <button type="submit">
                <p>Entrar</p> {formState.isSubmitting && (
                  <div>
                    <CircularProgress size={17} color="warning" thickness={10} />
                  </div>
                )}
              </button> 
            </form>
          ) : (
            <form onSubmit={handleSubmit(handleRegisterUser)} className={styles.formStyle}>
              <TextField
                label="Login"
                variant="filled"
                error={formState.errors['login'] ? true : false}
                helperText={formState.errors['login']?.message ?? ''}
                InputLabelProps={{
                  style: { color: '#fff' },
                }}
                InputProps={{
                  style: { color: '#fff' },
                }}
                {...register('login')}
              />
              <TextField
                label="Senha"
                variant="filled"
                type="password"
                error={formState.errors['password'] ? true : false}
                helperText={formState.errors['password']?.message ?? ''}
                InputProps={{
                  style: { color: '#fff' },
                }}
                InputLabelProps={{
                  style: { color: '#fff' },
                }}
                {...register('password')}
              />
              <button type="submit">
                <p>Cadastrar</p>
              </button>
            </form>
          )}
         {step === 0 ? (
            <button
              className={styles.redirectbutton}
              type="button"
              onClick={() => setStep(1)}
            >
              Não tem login?! se cadastre no site!
            </button>
         ):(
          <button
            className={styles.redirectbutton}
            type="button"
            onClick={() => setStep(0)}
          >
            Voltar
          </button>
         )}
         
        </div>
      </main>
      <ToastContainer autoClose={3000} />
    </> 
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => { 
  const cookies = new Cookies(req.headers.cookie); 

  const token = cookies.get('token');

  if(token) {
    return {
      redirect: {
        destination: '/establishments',
        permanent: false
      }
    }
  }

  return {
    props: {

    }
  }
}
