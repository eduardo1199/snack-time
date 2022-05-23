import React, { useState } from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { api } from '../services/api';
import Cookies from 'universal-cookie';

import { TextField } from '@mui/material';

import styles from '../styles/Home.module.scss';
import { useRouter } from 'next/router'

export default function Home() {
  const [login, setLogin] = useState<string>();
  const [password, setPassword] = useState<string>();
  const cookies = new Cookies();

  const router = useRouter();

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

      router.push('/establishments');
    } catch (err) {
      alert(err.message);
      return;
    }
  }

  const registerUser = async () => {
    try {
      const response = await api.post('/user', {
        login,
        password
      });

      
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
              value={password}
              onChange={e => setPassword(e.target.value)}
              InputProps={{
                style: { color: '#fff' },
              }}
              InputLabelProps={{
                style: { color: '#fff' },
              }}
            />
            <button type="submit">Entrar</button>
          </form>
          <button type="button" onClick={() => registerUser()}>Cadastro</button>
        </div>
      </main>
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
