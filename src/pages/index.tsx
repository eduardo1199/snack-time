import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { getSession, signIn } from 'next-auth/react';

import { Button } from '@mui/material';
import { Fastfood, GitHub } from '@mui/icons-material';

import styles from '../styles/Home.module.scss';

export default function Home() {
  return (
    <>
      <Head>SignIn</Head>
      <main className={styles.main}>
        <section className={styles.section}>
          <span>
            Pronto para o lanche!
            <h1>
              Só aqui no SlackTime tem!
            </h1>
          </span>
          <h4>
            Faça o cadastro na nossa página para curtir seu lanche! 
          </h4>
        </section>
        <div className={styles.containerSignIn}>
          <Fastfood />
          <Button onClick={() => signIn('github', )}>
            Entrar <GitHub />
          </Button>
        </div>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if(session) {
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
