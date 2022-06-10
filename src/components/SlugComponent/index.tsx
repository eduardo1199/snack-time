import { Grid } from "@mui/material";

import { BoxContainer, PriceContainer } from '../../styles/slugs.module';
import { InputDisplayNumberComponet } from "../InputDisplay";

import { formatPrice, renderLogoFoods } from '../../utils';

interface SlugComponentProps {
  id: number;
  index: number;
  establishment: string;
  name: string;
  quantity: number;
  price: number;
}

export function  SlugComponent(props: SlugComponentProps){
  return (
    <Grid container item direction="row" xs md={4}>
      <BoxContainer container item direction="column">
          <Grid item container justifyContent="center"> 
            {renderLogoFoods[props.index]}
          </Grid>

          <Grid item>
            <h5>{props.establishment}</h5>
          </Grid>
          
          <Grid item>
            <PriceContainer>
              <p>{props.name}</p>
              <span>{formatPrice(props.price)}</span>
            </PriceContainer>
          </Grid>

          <Grid item>
            <InputDisplayNumberComponet 
              current={props.quantity}
              price={props.price}
              establishment={props.establishment}
              slug={props.name}
            />
          </Grid>
          
      </BoxContainer>
    </Grid>
  )
}