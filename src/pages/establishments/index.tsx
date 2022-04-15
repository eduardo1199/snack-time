import { GetStaticProps } from 'next';
import { Header } from '../../components/Header/Header';
import { api } from '../../services/api';

interface Establishments {
  establishments: {
    id: number;
		name: string;
		address: string;
		type: string;
		description: string;
		slug: string;
  }[]
}

export default function Establishments({ establishments }: Establishments) {

  console.log(establishments);

  return(
    <>
      <Header />
      <div>establishments</div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await api.get('estabelecimentos');

  return {
    props: {
      establishments: response.data
    }
  }
}