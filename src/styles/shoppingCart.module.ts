import styled from 'styled-components';

import { Box } from '@mui/material';

export const Container = styled(Box)`
  max-width: 1220px;
  flex-direction: column;

  margin: 2rem auto 0 auto;
`

export const Card = styled(Box)`
  height: 8rem;

  display: flex;
  align-items: center;

  background-color: var(--gray-850);
  border-radius: 2rem;
  margin-bottom: 1rem;

  img {
    margin-left: 1rem;
  }

  h1 {
    margin: 0 0 1rem 1rem;
    color: var(--yellow-500);
  }

  span {
    margin-left: 1rem;
    font-weight: bold;
    font-size: 1rem;
    color: var(--gray-100);
  }
`

export const BoxPrice = styled(Box)`
  margin-left: auto;

  display: flex;
  align-items: center;

  padding: 1rem;
  h4 {
    margin-right: 1rem;
    p {
      font-size: 1.1rem;
      font-weight: bold;
      display: inline-block;
      color: var(--yellow-500);
    }
  }
`