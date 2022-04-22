import styled from 'styled-components';

import { Box } from '@mui/material'; 

export const InputDisplayNumber = styled(Box)`
  display: flex;
  height: 5rem;

  align-items: center;
  justify-content: space-around;

  button {
    height: 30px;
    width: 30px;

    border-radius: 50%;

    border: none;
    background-color: var(--yellow-500);
    color: var(--white);
  }

  input {
    border: none;
    outline: none;
    display: flex;

    font-size: 1.2rem;

    background-color: var(--gray-800);
    color: var(--white);
    border-radius: 20px;

    padding: 0.5rem;
  }
`;
