import { Button } from '@mui/material';
import { observer } from 'mobx-react';
import { useContext, useEffect } from 'react';
import { ShoppingCartStore } from '../../context';
import { Container } from '../../styles/navbar.module';

export const NavBar = observer(() => {
  const shoppingCart = useContext(ShoppingCartStore);

  return(
    <Container>
      <span>Quantidade de pedidos: <p>{shoppingCart.totalQuantity}</p></span>
      <span>Preço total: <p>{shoppingCart.totalPriceOrder}</p></span>
      <Button>Confirmar Produtos</Button>
    </Container>
  );
})