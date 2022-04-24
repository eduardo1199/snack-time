import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from "react";
import { Box, Grid, Input } from '@mui/material'; 
import { Image } from '@chakra-ui/react';
import { Header } from "../../components/Header/Header";
import { NavBar } from '../../components/NavBar';
import { api } from "../../services/api";

import { BoxContainer, PriceContainer } from '../../styles/slugs.module';
import { InputDisplayNumberComponet } from '../../components/InputDisplay';
import { formatPrice } from '../../utils';
import { observer } from 'mobx-react';
import { ShoppingCartStore, Slug } from '../../context';
import { toJS } from 'mobx';

const SlugEstablishment = observer(() => {
  const [search, setSearch] = useState('');
  const shoppingCart = useContext(ShoppingCartStore);
  const { query } = useRouter();

  useEffect(() => {
    const getSlugEstablishment = async () => {
      const response = await api.get(query.slug as string);

      shoppingCart.setSlugs(response.data);
    }

    getSlugEstablishment();
  }, [query.slug]);  

  return (
    <>
      <Header />
      <NavBar />
      <Box display="flex" justifyContent="center" alignItems="center" marginTop="1rem" marginBottom="1rem">
        <Input
          style={{
            color: 'white',
            width: '75%'
          }}
          placeholder='pesquisar...'
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>
      <Box flexDirection="column" height="100vh">
        <Box 
          maxWidth="1300px"
          marginLeft="auto"
          marginRight="auto"
          marginTop="2rem"
        >
          <Grid container spacing={8} direction="row">
            {shoppingCart.getFilterOrder(search).map(slug => {
              return(
                <Grid item xs={4} key={slug.id}>
                  <BoxContainer>
                      <Image 
                        objectFit='cover'
                        borderRadius="10"
                        src='https://bit.ly/dan-abramov'
                        alt='Dan Abramov'
                      />

                      <h5>{slug.establishment}</h5>
                      
                      <PriceContainer>
                        <p>{slug.name}</p>
                        <span>{formatPrice(slug.price)}</span>
                      </PriceContainer>

                      <InputDisplayNumberComponet 
                        price={slug.price}
                        establishment={slug.establishment}
                        slug={slug.name}
                      />
                      
                  </BoxContainer>
                </Grid>
              )
            })}
          </Grid>
        </Box>
      </Box>
    </>
  )
})

export default SlugEstablishment;
