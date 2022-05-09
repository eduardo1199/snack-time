import { Button } from '@mui/material';
import { observer } from 'mobx-react';
import { useContext } from 'react';
import { ShoppingCartStore } from '../../context';
import { Container } from '../../styles/navbar.module';
import router from 'next/router';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

export const NavBar = observer(() => {
  const shoppingCart = useContext(ShoppingCartStore);

  const navigationToShoppingCartPage = () => {
    const verifyShoppingCart = shoppingCart.order.filter((order) => order.quantity !== 0);

    if(verifyShoppingCart.length === 0){

      toast.error("Nenhum pedido foi adicionado!", {
        theme: 'dark'
      });

      return;
    } 

    router.push('/cart');
  }

  return(
    <Container>
      <span>Quantidade de pedidos: <p>{shoppingCart.totalQuantity}</p></span>
      <span>Preço total: <p>{shoppingCart.totalPriceOrder}</p></span>
      <Button onClick={() => navigationToShoppingCartPage()}>Confirmar Produtos</Button>
      <ToastContainer autoClose={3000} />
    </Container>
  );
})