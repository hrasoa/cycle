import * as React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { useApolloClient, useReactiveVar } from '@apollo/client';
import getUserByIdQuery from '../pages/api/getUserById.graphql';
import { userId } from '../pages/api/resolvers/user';
import cycle from '../public/cycle.svg';
import * as Icons from './Icons';
import { GetUserByIdQuery, GetUserByIdQueryVariables } from '../types';
import { sideNavCollapsed } from '../cache';
import { SideBarDropdown } from './SideBarDropdown';
import { SideBarLink } from './SideBarLink';
import { SideBarStarredBoards } from './SideBarStarredBoards';
import { Button } from '../generics/Button';

type Props = {
  collapsed?: boolean;
};

type BlockProps = {
  separator?: boolean;
};

const List = styled.ul`
  list-style: none;
`;

const Root = styled.div<Props>`
  background-color: ${(props) => props.theme.colors.Black};
  color: ${(props) => props.theme.colors.TextDisabled};
  flex: 0 0 ${(props) => (props.collapsed ? '64px' : '240px')};
  transition: flex 0.1s;
  position: relative;
`;

const Block = styled.div<BlockProps>`
  padding: ${(props) => props.theme.space['16x']};
  position: relative;

  ${(props) =>
    props.separator !== false
      ? `
  &::after {
    content: ' ';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 1px;
    background-color: ${props.theme.colors.TextSecondary};
    opacity: 0.2;
  }  
  `
      : ''}
`;

const Header = styled.div<Props>`
  display: flex;
  justify-content: space-between;
  flex-direction: ${(props) => (props.collapsed ? 'column' : 'row')};
`;

type AvatarProps = {
  $src: string;
};

const Avatar = styled.span<AvatarProps>`
  background-image: url('${(props) => props['$src']}');
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  border-radius: 50%;
  display: block;
  border-radius: 50%;
  border: 2px solid #fff;
  box-shadow: 0 0 0 2px ${(props) => props.theme.colors.BackgroundBlue};
  height: 20px;
  width: 20px;
`;

const CollapseBtn = styled(Button)<Props>`
  background-color: ${(props) => props.theme.colors.BackgroundBlue};
  cursor: pointer;
  border-radius: 50%;
  display: block;
  position: absolute;
  right: 0;
  top: 16px;
  transform: ${(props) =>
    props.collapsed
      ? 'translate(50%, 0) rotate(90deg)'
      : 'translate(50%, 0) rotate(-90deg)'};
  height: 24px;
  width: 24px;
  transition: transform 0.2s;
  z-index: 99;
`;

const CollapseBtnIcon = styled(Icons.Chevron)`
  color: ${(props) => props.theme.colors.White};
  transform: translate(0, -2px);
`;

export function SideBar() {
  const collapsed = useReactiveVar(sideNavCollapsed);
  const client = useApolloClient();
  const userData = client.readQuery<
    GetUserByIdQuery,
    GetUserByIdQueryVariables
  >({
    query: getUserByIdQuery,
    variables: { id: userId },
  });

  const handleOnCollapse: React.MouseEventHandler<{}> = (e) => {
    e.preventDefault();
    sideNavCollapsed(!collapsed);
  };

  return (
    <Root collapsed={collapsed}>
      <CollapseBtn
        aria-label="Toggle sidenav"
        aria-expanded={!collapsed}
        collapsed={collapsed}
        onClick={handleOnCollapse}
      >
        <CollapseBtnIcon />
      </CollapseBtn>
      <Block>
        <Header collapsed={collapsed}>
          <SideBarDropdown
            icon={
              <Image src={cycle.src} width="20px" height="20px" alt="Logo" />
            }
          >
            Cycle
          </SideBarDropdown>
          {userData && userData.getUserById && (
            <SideBarDropdown
              aria-label={userData.getUserById.name}
              icon={<Avatar $src={userData.getUserById.avatar} />}
            />
          )}
        </Header>
      </Block>
      <Block>
        <nav>
          <List>
            <li>
              <SideBarLink
                aria-label="Search"
                link={{ href: '/search' }}
                icon={<Icons.Search />}
              >
                Search
              </SideBarLink>
            </li>
            <li>
              <SideBarLink
                aria-label="Notifications"
                link={{ href: '/notifs' }}
                icon={<Icons.Notify />}
              >
                Notifications
              </SideBarLink>
            </li>
            <li>
              <SideBarLink
                aria-label="Commands"
                link={{ href: '/commands' }}
                icon={<Icons.Flash />}
                commands={[
                  {
                    icon: <Icons.Cmd height="12px" width="12px" />,
                    name: 'cmd',
                  },
                  { name: 'K' },
                ]}
              >
                Commands
              </SideBarLink>
            </li>
            <li>
              <SideBarLink
                aria-label="Create doc"
                link={{ href: '/create' }}
                icon={<Icons.Add />}
              >
                Create doc
              </SideBarLink>
            </li>
            <li>
              <SideBarLink
                aria-label="All docs"
                link={{ href: '/docs' }}
                icon={<Icons.Ticket />}
              >
                All docs
              </SideBarLink>
            </li>
          </List>
        </nav>
      </Block>
      {userData &&
        userData.getUserById &&
        userData.getUserById.starredBoards &&
        userData.getUserById.starredBoards.length > 0 && (
          <Block separator={false}>
            <SideBarStarredBoards />
          </Block>
        )}
    </Root>
  );
}
