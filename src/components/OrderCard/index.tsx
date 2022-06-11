import { Image } from "@chakra-ui/react";
import { Box, IconButton } from "@mui/material";
import { Card, BoxPrice } from '../../styles/shoppingCart.module';
import { formatPrice } from "../../utils";

import DeleteIcon from '@mui/icons-material/Delete';

interface OrderCardProsp {
  name: string;
  establishment: string;
  quantity: number;
  price: number;
  visibleDelete?: boolean;
}

export function OrderCard(props: OrderCardProsp) {
  return (
    <Card>
      <Image 
        boxSize='100px'
        objectFit='cover'
        borderRadius="10"
        src='https://bit.ly/dan-abramov'
        alt='Dan Abramov'
      />
      <Box>
        <h1>{props.name}</h1>
        <span>{props.establishment}</span>
        <span>Quantidade: {props.quantity}</span>
      </Box>
      <BoxPrice>
        <h4>Valor : <p> {formatPrice(props.price)}</p></h4>

        {props.visibleDelete && (
          <IconButton aria-label="delete" color="error">
            <DeleteIcon />
          </IconButton>
        )}
      </BoxPrice>
    </Card>
  );
};