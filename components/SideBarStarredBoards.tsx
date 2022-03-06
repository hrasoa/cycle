import * as React from 'react';
import { useApolloClient, useReactiveVar } from '@apollo/client';
import styled from 'styled-components';
import getUserByIdQuery from '../schemas/getUserById.graphql';
import { GetUserByIdQuery, GetUserByIdQueryVariables } from '../types';
import { userId } from '../pages/api/resolvers/user';
import { sideNavCollapsed } from '../cache';
import { SideBarLink } from './SideBarLink';
import { SideBarDisclosureLinks } from './SideBarDisclosureLinks';
import * as Icons from './Icons';
import { Button } from '../generics/Button';
import { useRouter } from 'next/router';

type LinkProps = {
  $collapsed?: boolean;
};

const List = styled.ul`
  list-style: none;
`;

const MoreButton = styled(Button)`
  align-items: center;
  border-radius: ${(props) => props.theme.radii['4x']};
  cursor: pointer;
  background-color: ${(props) => props.theme.colors.Grey800};
  color: ${(props) => props.theme.colors.White};
  display: none;
  height: 20px;
  position: absolute;
  right: ${(props) => props.theme.space['8x']};
  top: 50%;
  transform: translate(0, -50%);
  justify-content: center;
  width: 20px;
`;

const Link = styled(SideBarLink)<LinkProps>`
  padding-left: ${(props) =>
    props.$collapsed ? '0' : props.theme.space['24x']};
`;

const Item = styled.div`
  position: relative;

  &:hover ${MoreButton} {
    display: flex;
  }
`;

export function SideBarStarredBoards() {
  const collapsed = useReactiveVar(sideNavCollapsed);
  const client = useApolloClient();
  const userData = client.readQuery<
    GetUserByIdQuery,
    GetUserByIdQueryVariables
  >({
    query: getUserByIdQuery,
    variables: { id: userId },
  });
  const router = useRouter();
  const urls = userData?.getUserById?.starredBoards?.map(board => board && `/board/${board.id}`);
  const containsActiveLinks = urls?.find(url => url === router.asPath);
  return (
    (userData &&
      userData.getUserById &&
      userData.getUserById.starredBoards &&
      userData.getUserById.starredBoards.length > 0 && (
        <SideBarDisclosureLinks active={!!containsActiveLinks} label="Starred" id="starred">
          <List>
            {userData.getUserById.starredBoards.map(
              (board) =>
                board && (
                  <Item key={board.id}>
                    <Link
                      icon={board.icon}
                      link={{ href: `/board/${board.id}/` }}
                      $collapsed={collapsed}
                    >
                      {board.label}
                    </Link>
                    {!collapsed && (
                      <MoreButton stopPropagation>
                        <Icons.More />
                      </MoreButton>
                    )}
                  </Item>
                )
            )}
          </List>
        </SideBarDisclosureLinks>
      )) ||
    null
  );
}
