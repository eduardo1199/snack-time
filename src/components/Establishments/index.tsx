import { Button, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { Box } from "@mui/material";
import { renderLogoEstablishment } from "../../utils";
import router from 'next/router';

import styles from '../../styles/establishments.module.scss';

interface EstablishmentsContainerProps {
  id: number;
  name: string;
  type: string;
  slug: string;
  address: string;
}

export function EstablishmentsContainer(props: EstablishmentsContainerProps) {
  return (
    <Box className={styles.container}>
      <Button 
        w="100%" 
        bg="transparent" 
        outline="none" 
        border="none"
        onClick={() => router.push(`establishments/${props.slug}`)}
      >
        <Flex w="100%" h="100%" p="10" d="flex" direction="row">
          <HStack spacing="20">
            {renderLogoEstablishment(props.name)}
            <VStack spacing="25">
              <Text as="p" mr="auto">{props.name} / 
                <Text as="span">{props.type}</Text>
              </Text>
              <Text as="span">{props.address}</Text>
            </VStack>
          </HStack>
        </Flex>
      </Button>
    </Box>
  );
};