import { Button } from '@mui/material';
import { observer } from 'mobx-react';
import { useContext } from 'react';
import { ShoppingCartStore } from '../../context';
import { Container } from '../../styles/navbar.module';
import router from 'next/router';
import { Input } from '@chakra-ui/react';

export const NavBar = observer(() => {
  const shoppingCart = useContext(ShoppingCartStore);

  return(
    <Container>
      <span>Quantidade de pedidos: <p>{shoppingCart.totalQuantity}</p></span>
      <span>Preço total: <p>{shoppingCart.totalPriceOrder}</p></span>
      <Button onClick={() => router.push('/cart')}>Confirmar Produtos</Button>
    </Container>
  );
})