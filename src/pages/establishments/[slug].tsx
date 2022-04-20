import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import { Box, Grid, Container } from '@mui/material'; 
import { Header } from "../../components/Header/Header";
import { api } from "../../services/api";

import { BoxContainer } from '../../styles/slugs.module';

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
      <Box flexDirection="column" height="100vh">
        <Box 
          width="100%"
          maxWidth="1600px"
          marginLeft="auto"
          marginRight="auto"
          marginTop="5rem"
        >
          <Container component="section" maxWidth="xl">
            <Grid container spacing={3}>
              {slugs.map(slug => {
                return(
                  <Grid item xs={12} sm={4} key={slug.id}>
                    <BoxContainer>

                    </BoxContainer>
                  </Grid>
                )
              })}
            </Grid>
          </Container> 
        </Box>
      </Box>
    </>
  )
}
