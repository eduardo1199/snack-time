import { Image } from "@chakra-ui/react";
import { Box, IconButton } from "@mui/material";
import { Header } from "../../components/Header/Header";

import { observer } from "mobx-react";

import DeleteIcon from '@mui/icons-material/Delete';

import { Container, Card, BoxPrice } from '../../styles/shoppingCart.module';
import { Order } from "../../context";
import { useState, useEffect, useMemo } from "react";
import { formatPrice } from "../establishments/utils";
import { CheckoutBottom } from "../../components/CheckoutBottom/CheckoutBottom"
import { CheckoutButton } from "../../components/CheckoutButton/CheckoutButton"

import Cookies from 'universal-cookie';

const ShoppingCart = observer(() => {
  const [orders, setOrders] = useState<Order[]>([])

  const cookies = new Cookies();

  useEffect(() => {
    const cookiesOrders = cookies.get('orders');

    setOrders(cookiesOrders);
  }, [])

  const infoCheckoutOrders = useMemo(() => orders.reduce((acc, item) => {
    acc.quantityTotal +=  item.price * item.quantity;
    acc.ordersTotal = orders.length;

    return acc;
  }, {
    quantityTotal: 0,
    ordersTotal: 0
  }), [orders]);

  return(
    <>
      <Header />
      <Container>
        {orders.map(order => {
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
        <CheckoutBottom 
          ordersTotal={infoCheckoutOrders.ordersTotal}
          priceTotal={formatPrice(infoCheckoutOrders.quantityTotal)}
        />
        <CheckoutButton />

      </Container>
    </>
  )
})

export default ShoppingCart;