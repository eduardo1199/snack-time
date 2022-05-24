import styles from '../../styles/checkoutButton.module.scss';

import { observer } from "mobx-react";

import Cookies from 'universal-cookie';
import { Order } from '../../context';
import { formatPrice } from '../../pages/establishments/utils';
import { api } from '../../services/api';
import { useRouter } from 'next/router'

import { toast } from 'react-toastify';

import { ToastContainer } from 'react-toastify';

export function CheckoutButton(){
  const cookies = new Cookies();
  const router = useRouter();

  const finishOrders = async () => {
    const cookiesOrders: Order[] = cookies.get('orders');
    const token = cookies.get('token');

    const product:  string[] = [];
    const quantity: number[] = [];
    const total_price: string[] = [];

    cookiesOrders.forEach(order => {
      product.push(order.name);
      quantity.push(order.quantity);
      total_price.push(String(order.quantity * order.price).split(',').join('.'));
    });

    const finishOrdersBatch = {
      establishment: cookiesOrders[0].establishment+','+cookiesOrders[0].establishment,
      product: product.toString(),
      quantity: quantity.toString(),
      total_price: total_price.toString(),
      user_login: localStorage.getItem('user'),
    };

    try {
      const response = await api.post('new', finishOrdersBatch, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      });

      toast.success("Pedidos cadastrados com sucesso!", {
        theme: 'light'
      });

      router.push('/establishments');
    } catch (err) {
      toast.error("Erro ao salvar pedidos!", {
        theme: 'dark'
      });
    }
  }

  return(
    <div className={styles.buttonfinalizar}>
        <button onClick={() => finishOrders()}>Finalizar Pedido</button>
        <ToastContainer autoClose={3000} />
    </div>
  )
}