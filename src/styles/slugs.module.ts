import styled from 'styled-components';

import { Box, Grid } from '@mui/material'; 

export const BoxContainer = styled(Grid)`
  border-radius: 2rem;

  background-color: var(--gray-850);

  img {
    width: 100%;
    height: 12rem;
  }

  h5 {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;

    font-size: 1.5rem;
    color: var(--yellow-500);
    text-align: center;
  }
  
`;

export const PriceContainer = styled(Box)`
   display: flex;
  justify-content: space-around;

  p {
    font-size: 1.2rem;
    color: var(--white);
    font-weight: bold;
  }

  span {
    font-size: 1.2rem;
    color: var(--yellow-500);
    font-weight: bold;
  }
`;
