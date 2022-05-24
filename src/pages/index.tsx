import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { api } from '../services/api';
import Cookies from 'universal-cookie';

import { TextField } from '@mui/material';

import { toast } from 'react-toastify';

import { ToastContainer } from 'react-toastify';

import styles from '../styles/Home.module.scss';
import { useRouter } from 'next/router'

export default function Home() {
  const [login, setLogin] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [step, setStep] = useState<number>(0);

  const cookies = new Cookies();

  const router = useRouter();
  
  useEffect(() => {
    localStorage.clear();
    cookies.remove('orders')
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.post('/login', {
        login,
        password
      });

      if(!response.data.token) {
        alert('Erro ao verificar cadastro');
        return;
      }

      cookies.set('token', response.data.token);

      localStorage.setItem('user', login);

      router.push('/establishments');
    } catch (err) {
      toast.error("Erro realizar login, verificar sua senha!", {
        theme: 'dark'
      });
    }
  }

  const registerUser = async () => {
    try {
      const response = await api.post('/user', {
        login,
        password
      });

      toast.success("Usuário cadastrado com sucesso!", {
        theme: 'light'
      });

      setStep(0);
    } catch (err) {
      alert(err.message);
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
        <div className={styles.containerSignIn}>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Login"
              variant="filled"
              required
              value={login}
              onChange={e => setLogin(e.target.value)}
              InputLabelProps={{
                style: { color: '#fff' },
              }}
              InputProps={{
                style: { color: '#fff' },
              }}
            />
            <TextField
              label="Senha"
              variant="filled"
              required
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              InputProps={{
                style: { color: '#fff' },

              }}
              InputLabelProps={{
                style: { color: '#fff' },
              }}
              
            />

            {step === 0 ? <button type="submit">Entrar</button> : <button type="button" onClick={() => registerUser()}>Cadastrar</button>}
          </form>
          {step === 0 ? <button type="button" onClick={() => setStep(1)}>Cadastro do slack time</button> : <button type="button" onClick={() => setStep(0)}>Voltar</button>}
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
