import { Flex, VStack } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { Header } from '../../components/Header/Header';
import { api } from '../../services/api';

import Cookies from 'universal-cookie';

import { Box, Typography } from '@mui/material';
import { ShoppingCartStore } from '../../context';
import { useContext, useEffect, useState } from 'react';
import { FilterBar } from '../../components/FilterBar';
import { EstablishmentsContainer } from '../../components/Establishments';

interface EstablishmentsProps {
  establishments: {
    id: number;
		name: string;
		address: string;
		type: string;
		description: string;
		slug: string;
  }[]
}

const Establishments = (establishments: EstablishmentsProps) => {
  const [search, setSearch] = useState('');
  const shoppingCart = useContext(ShoppingCartStore);
  const cookies = new Cookies();

  const filteredEstablishments = (name: string) => {
    if(!name) return establishments.establishments;

    const filtered = establishments.establishments.filter(establishments => (establishments.name.toLocaleLowerCase()).includes(name.toLocaleLowerCase()));

    return filtered;
  }

  useEffect(() => {
    shoppingCart.setOrdersEmpty();
    cookies.remove('orders');
  }, [shoppingCart]);

  return(
    <>
      <Header />
      <Flex w="100%" my="6" mx="auto" px="6" maxWidth={1200}>
        <VStack spacing="25" mx="8" pr="7" py="20" w="100%">

          <FilterBar onChangeFilter={setSearch} label="pesquisar por um estabelecimento..." />

          {filteredEstablishments(search).map(establishment => {
            return(
              <EstablishmentsContainer 
                key={establishment.id}
                address={establishment.address}
                id={establishment.id}
                name={establishment.name}
                type={establishment.type}
                slug={establishment.slug}
              />
            )
          })}

          {filteredEstablishments(search).length === 0 && (
            <Box>
              <Typography fontSize={20} fontWeight="bold">
                Nenhum estabelecimento encontrado
              </Typography>
            </Box>
          )}

        </VStack>
      </Flex>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const cookies = new Cookies(req.headers.cookie);
  const token = cookies.get('token');
  
  try {

    if(!token) {
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      }
    }

    const response = await api.get('estabelecimentos', {
      headers: {
        Authorization: 'Bearer ' + token
      }
    });

    return {
      props: {
        establishments: response.data
      }
    }
  } catch (e) {
    return {
      props: {
        establishments: []
      }
    }
  }
}

export default Establishments; 