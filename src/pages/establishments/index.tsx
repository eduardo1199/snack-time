import { Flex, Text, VStack, HStack, Button } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import router from 'next/router';
import { Header } from '../../components/Header/Header';
import { api } from '../../services/api';

import styles from '../../styles/establishments.module.scss';

import Cookies from 'universal-cookie';

import { Box, Input } from '@mui/material';
import { renderLogoEstablishment } from './utils';
import { ShoppingCartStore } from '../../context';
import { useContext, useEffect, useState } from 'react';

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
  }, [shoppingCart])

  return(
    <>
      <Header />
      <Flex w="100%" my="6" mx="auto" px="6" maxWidth={1200}>
        <VStack spacing="25" mx="8" pr="7" py="20" w="100%">
          <Box width="100%" display="flex" justifyContent="center">
            <Input
              style={{
                color: 'white',
                width: '100%'
              }}
              placeholder='Pesquisar por um estabelecimento...'
              onChange={(e) => setSearch(e.target.value)}
            />
          </Box>
          {filteredEstablishments(search).map(establishment => {
            return(
              <Box className={styles.container} key={establishment.id}>
                <Button 
                  w="100%" 
                  bg="transparent" 
                  outline="none" 
                  border="none"
                  onClick={() => router.push(`establishments/${establishment.slug}`)}
                >
                  <Flex w="100%" h="100%" p="10" d="flex" direction="row">
                    <HStack spacing="20">
                      {renderLogoEstablishment(establishment.name)}
                      <VStack spacing="25">
                        <Text as="p" mr="auto">{establishment.name} / 
                          <Text as="span">{establishment.type}</Text>
                        </Text>
                        <Text as="span">{establishment.address}</Text>
                      </VStack>
                    </HStack>
                  </Flex>
                </Button>
              </Box>
            )
          })}
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