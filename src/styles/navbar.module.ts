import styled from 'styled-components';

import { Box } from "@mui/material";

export const Container = styled(Box)`
  max-width: 1300px;
  margin: auto;

  display: flex;
  justify-content: space-around;

  background-color: var(--gray-850);

  padding: 2rem;
`;