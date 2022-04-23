import { Flex, SimpleGrid, Text, VStack, HStack, Image, Button } from '@chakra-ui/react';
import { GetStaticProps } from 'next';
import router from 'next/router';
import { Header } from '../../components/Header/Header';
import { api } from '../../services/api';

import styles from '../../styles/establishments.module.scss';

import { Box } from '@mui/material';

interface Establishments {
  establishments: {
    id: number;
		name: string;
		address: string;
		type: string;
		description: string;
		slug: string;
  }[]
}

export default function Establishments({ establishments }: Establishments) {
  return(
    <>
      <Header />
      <Flex w="100%" my="6" mx="auto" px="6" maxWidth={1200}>
        <VStack spacing="25" mx="8" pr="7" py="20" w="100%">
          {establishments.map(establishment => {
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
                      <Image 
                        boxSize='150px'
                        objectFit='cover'
                        borderRadius="10"
                        src='https://bit.ly/dan-abramov'
                        alt='Dan Abramov'
                      />
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

export const getStaticProps: GetStaticProps = async () => {
  const response = await api.get('estabelecimentos');

  return {
    props: {
      establishments: response.data
    }
  }
}