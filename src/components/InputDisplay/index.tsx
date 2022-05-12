
import { InputDisplayNumber } from '../../styles/displayNumber.module';
import {  Button, Input, useNumberInput } from '@chakra-ui/react';
import { observer } from 'mobx-react';
import { ShoppingCartStore } from '../../context';
import { useContext, useState } from 'react';

interface InputDisplayNumberComponetProps {
  price: number;
  establishment: string;
  current: number;
  slug: string;
}

export const InputDisplayNumberComponet = observer((props: InputDisplayNumberComponetProps) => {
  const shoppingCart = useContext(ShoppingCartStore);
  const [value, setValue] = useState(props.current ?? 0);

 const decrementSlugQuantity = () => {
  shoppingCart.setOrderShoppingCart({
    establishment: props.establishment,
    name: props.slug,
    price: props.price,
    quantity: value === 0 ? 0 : value - 1
  });

  localStorage.setItem(props.slug, String(value === 0 ? 0 : value - 1));
  setValue(prev => prev === 0 ? 0 : prev - 1);
 }  

 
 const incrementSlugQuantity = () => {
  shoppingCart.setOrderShoppingCart({
    establishment: props.establishment,
    name: props.slug,
    price: props.price,
    quantity: value + 1
  })
  
  localStorage.setItem(props.slug, String(value + 1));
  setValue(prev => prev + 1)
 }  

  return(
    <InputDisplayNumber>
      <Button
        onClick={
          () => {decrementSlugQuantity()}
        }
      >-</Button>
      <Input value={value} readOnly />
      <Button
        onClick={
          () => {incrementSlugQuantity()}
        }
      >+</Button>
    </InputDisplayNumber>
  )
})