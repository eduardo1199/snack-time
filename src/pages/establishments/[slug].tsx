import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import { Box, Grid, Container,  } from '@mui/material'; 
import { Image } from '@chakra-ui/react';
import { Header } from "../../components/Header/Header";
import { NavBar } from '../../components/NavBar';
import { api } from "../../services/api";

import { BoxContainer, PriceContainer } from '../../styles/slugs.module';
import { InputDisplayNumberComponet } from '../../components/InputDisplay';
import { formatPrice } from '../../utils';

type Slug = {
  description: string;
  establishment: string;
  id: number;
  name: string;
  price: number;
  type: string;
}

export default function SlugEstablishment() {
  const [slugs, setSlugs] = useState<Slug[]>([]);
  const { query } = useRouter();

  useEffect(() => {
    const getSlugEstablishment = async () => {
      const response = await api.get(query.slug as string);

      setSlugs(response.data);
    }

    getSlugEstablishment();
  }, [query]);

  return (
    <>
      <Header />
      <NavBar />
      <Box flexDirection="column" height="100vh">
        <Box 
          maxWidth="1300px"
          marginLeft="auto"
          marginRight="auto"
          marginTop="2rem"
        >
          <Grid container spacing={3} direction="row">
            {slugs.map(slug => {
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
}
