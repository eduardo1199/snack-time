import { GetServerSideProps } from "next";
import Cookies from "universal-cookie";
import { Header } from "../../../components/Header/Header";

import { Container } from '../../../styles/shoppingCart.module';
import { api } from "../../../services/api";
import { OrderCard } from "../../../components/OrderCard";

interface SavedCardUserProps {
  orders: {
    id: number,
    establishment: string,
    product: string,
    quantity: number,
    total_price: number
  }[]
}

export default function SavedCardUser({ orders }: SavedCardUserProps) {
  return (
    <>
      <Header />
      <Container>
        {orders.map(order => {
          return (
            <OrderCard 
              establishment={order.establishment}
              name={order.product}
              price={order.total_price}
              quantity={order.quantity}
              key={order.id}
            />
          )
        })}
      </Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const cookies = new Cookies(req.headers.cookie);

  const token = cookies.get('token');
  const user = cookies.get('user');

  if(!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  try {
    const response = await api.get(`/carrinho/${user}`, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    });
    
    return {
      props: {
       orders: response.data
      }
    }
  } catch (err) {
    return {
      props: {
       orders: []
      }
    }
  }

}
