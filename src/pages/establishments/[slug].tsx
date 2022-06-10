import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from "react";
import { Box, Grid, Input } from '@mui/material'; 
import { GetServerSideProps } from 'next';
import { Header } from "../../components/Header/Header";
import { NavBar } from '../../components/NavBar';
import { api } from "../../services/api";

import { InputDisplayNumberComponet } from '../../components/InputDisplay';
import { formatPrice, renderLogoFoods } from '../../utils';
import { observer } from 'mobx-react';
import { ShoppingCartStore, ResponseSlug } from '../../context';

import Cookies from 'universal-cookie';
import { FilterBar } from '../../components/FilterBar';
import { SlugComponent } from '../../components/SlugComponent';

const SlugEstablishment = observer(() => {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const cookies = new Cookies();

  const shoppingCart = useContext(ShoppingCartStore);

  const { query } = useRouter();

  useEffect(() => {
    const getSlugEstablishment = async () => {
      const token = cookies.get('token');

      const response = await api.get<ResponseSlug[]>(query.slug as string, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      });

      const serializeSlugResponse = response.data.map(slug => {
        if(!localStorage.getItem(slug.name)) {
          return {
            ...slug,
            quantity: 0
          }
        } else {
          return {
            ...slug,
            quantity: Number(localStorage.getItem(slug.name))
          }
        }
      });

      shoppingCart.setSlugs(serializeSlugResponse);
      setLoading(false);
    }

    
    getSlugEstablishment();

    return () => {
      shoppingCart.setSlugs([]);
    }
  }, [query.slug, shoppingCart]);

  return (
    <>
      <Header />
      <NavBar />
      <Box maxWidth="1300px" margin="2rem auto 0 auto">
        <FilterBar onChangeFilter={setSearch} label="pesquisar por um produto..." />
      </Box>
      <Box height="100vh">
        <Box 
          maxWidth="1300px"
          marginLeft="auto"
          marginRight="auto"
          marginTop="2rem"
        >
          <Grid container spacing={8} direction="row">
            {shoppingCart.getFilterSlugs(search).map((slug, index) => {
              return(
                <SlugComponent 
                  establishment={slug.establishment}
                  id={slug.id}
                  index={index}
                  name={slug.name}
                  price={slug.price}
                  quantity={slug.quantity}
                  key={slug.id}
                />
              )
            })}
          </Grid>
        </Box>
      </Box>
    </>
  )
});

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const cookies = new Cookies(req.headers.cookie);
  const token = cookies.get('token');


  if(!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
     
    }
  }
}

export default SlugEstablishment;
