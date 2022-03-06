import * as React from 'react';
import type { NextPage } from 'next';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import { SideBar } from '../components/SideBar';
import getUserByIdQuery from '../schemas/getUserById.graphql';
import { GetUserByIdQuery, GetUserByIdQueryVariables } from '../types';
import { userId } from '../pages/api/resolvers/user';

const Root = styled.div`
  background-color: ${(props) => props.theme.colors.Grey100};
  display: flex;
  gap: ${(props) => props.theme.space['32x']};
  height: 100vh;
`;

const Main = styled.main`
  flex: 1;
`;

export const Layout: NextPage = ({ children }) => {
  useQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(getUserByIdQuery, {
    variables: { id: userId },
  });
  return (
    <Root>
      <SideBar />
      <Main>{children}</Main>
    </Root>
  );
};
