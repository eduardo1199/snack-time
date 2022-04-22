
import { InputDisplayNumber } from '../../styles/displayNumber.module';
import {  Button, Input, useNumberInput } from '@chakra-ui/react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import { ShoppingCartStore } from '../../context';
import { useContext } from 'react';

interface InputDisplayNumberComponetProps {
  price: number;
  establishment: string;
  slug: string;
}

export const InputDisplayNumberComponet = observer((props: InputDisplayNumberComponetProps) => {
  const shoppingCart = useContext(ShoppingCartStore);

  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: 0,
      min: 0,
      max: 6,
      precision: 0,
    })

  const inc = getIncrementButtonProps()
  const dec = getDecrementButtonProps()
  const input = getInputProps()

  console.log(shoppingCart.totalOfOrders);

  return(
    <InputDisplayNumber>
      <Button 
        {...dec} 
        onClick={
          () => shoppingCart.setOrderShoppingCart({
            establishment: props.establishment,
            name: props.slug,
            price: props.price,
            quantity: Number(input['aria-valuenow'])
          })
        }
      >-</Button>
      <Input {...input} />
      <Button 
        {...inc}
        onClick={
          () => shoppingCart.setOrderShoppingCart({
            establishment: props.establishment,
            name: props.slug,
            price: props.price,
            quantity: Number(input['aria-valuenow'])
          })
        }
      >+</Button>
    </InputDisplayNumber>
  )
})