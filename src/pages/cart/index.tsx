import { Header } from "../../components/Header/Header";

import { observer } from "mobx-react";

import { Container } from '../../styles/shoppingCart.module';

import { Order } from "../../context";
import { useState, useEffect, useMemo } from "react";
import { formatPrice } from "../../utils";
import { CheckoutBottom } from "../../components/CheckoutBottom/CheckoutBottom"
import { CheckoutButton } from "../../components/CheckoutButton/CheckoutButton"

import Cookies from 'universal-cookie';
import { OrderCard } from "../../components/OrderCard";

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
            <OrderCard 
              establishment={order.establishment}
              name={order.name}
              price={order.price}
              quantity={order.quantity}
              key={order.name}
              visibleDelete
            />
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