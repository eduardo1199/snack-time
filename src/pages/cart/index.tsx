import { Image } from "@chakra-ui/react";
import { Box, IconButton } from "@mui/material";
import { Header } from "../../components/Header/Header";

import { observer } from "mobx-react";

import DeleteIcon from '@mui/icons-material/Delete';

import { Container, Card, BoxPrice } from '../../styles/shoppingCart.module';
import { ShoppingCartStore } from "../../context";
import { useContext } from "react";
import { formatPrice } from "../establishments/utils";

const ShoppingCart = observer(() => {
  const shoppingCart = useContext(ShoppingCartStore);

  return(
    <>
      <Header />
      <Container>
        {shoppingCart.getCheckoutOrder().map(order => {
          return (
            <Card key={order.name}>
              <Image 
                boxSize='100px'
                objectFit='cover'
                borderRadius="10"
                src='https://bit.ly/dan-abramov'
                alt='Dan Abramov'
              />
              <Box>
                <h1>{order.name}</h1>
                <span>{order.establishment}</span>
                <span>Quantidade: {order.quantity}</span>
              </Box>
              <BoxPrice>
                <h4>Valor : <p> {formatPrice(order.price)}</p></h4>
                <IconButton aria-label="delete" color="error">
                  <DeleteIcon />
                </IconButton>
              </BoxPrice>
            </Card>
          )
        })}
      </Container>
    </>
  )
})

export default ShoppingCart;