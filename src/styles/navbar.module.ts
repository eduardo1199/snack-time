import styled from 'styled-components';

import { Box } from "@mui/material";

export const Container = styled(Box)`
  max-width: 1300px;
  margin: auto;

  display: flex;
  align-items: center;
  justify-content: space-around;

  background-color: var(--gray-850);

  padding: 1rem;
  margin-top: 0.5rem;
  border-radius: 2rem;

  span {
    font-size: 1rem;
    color: var(--white);
    font-weight: bold;
    margin-right: 0.5rem;

    p {
      display: inline-block;
      font-size: 1rem;
      color: var(--yellow-500);
      font-weight: bold;
    }

  
  }

  button {
    background-color: var(--yellow-500);
    color: var(--white);
    font-weight: bold;
    
    &:hover {
      filter: brightness(0.8);
    }
  }
  
`;