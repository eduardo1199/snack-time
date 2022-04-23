
import { InputDisplayNumber } from '../../styles/displayNumber.module';
import {  Button, Input, useNumberInput } from '@chakra-ui/react';
import { observer } from 'mobx-react';
import { ShoppingCartStore } from '../../context';
import { useContext, useState } from 'react';

interface InputDisplayNumberComponetProps {
  price: number;
  establishment: string;
  slug: string;
}

export const InputDisplayNumberComponet = observer((props: InputDisplayNumberComponetProps) => {
  const shoppingCart = useContext(ShoppingCartStore);

  const [value, setValue] = useState(0);


  return(
    <InputDisplayNumber>
      <Button
        onClick={
          () => {shoppingCart.setOrderShoppingCart({
            establishment: props.establishment,
            name: props.slug,
            price: props.price,
            quantity: value === 0 ? 0 : value - 1
          });setValue(prev => prev === 0 ? 0 : prev - 1);}
        }
      >-</Button>
      <Input value={value} readOnly/>
      <Button
        onClick={
          () => {shoppingCart.setOrderShoppingCart({
            establishment: props.establishment,
            name: props.slug,
            price: props.price,
            quantity: value + 1
          });setValue(prev => prev + 1)}
        }
      >+</Button>
    </InputDisplayNumber>
  )
})