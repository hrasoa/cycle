import * as React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useReactiveVar } from '@apollo/client';
import { sideNavCollapsed } from '../cache';
import { SideBarText } from './SideBarText';
import { SideBarAnchor } from './SideBarAnchor';

const Kbd = styled.kbd`
  align-items: center;
  border-radius: ${(props) => props.theme.radii['4x']};
  background-color: ${(props) => props.theme.colors.TextDisabled};
  color: ${(props) => props.theme.colors.Black};
  display: flex;
  flex: 0 0 16px;
  justify-content: center;
  height: 16px;
`;

const Cmds = styled.span`
  align-items: center;
  display: flex;
  flex-grow: 1;
  gap: ${(props) => props.theme.space['8x']};
  justify-content: end;
`;

const Icon = styled.span`
  display: flex;
  justify-content: center;
`;

export function SideBarLink({
  children,
  commands,
  icon,
  link,
  ...props
}: {
  children: React.ReactNode;
  commands?: { name: string; icon?: React.ReactElement }[];
  icon: React.ReactElement | string;
  link: React.ComponentProps<typeof Link>;
} & React.ComponentProps<typeof SideBarAnchor>) {
  const collapsed = useReactiveVar(sideNavCollapsed);
  return (
    <Link {...link} passHref>
      <SideBarAnchor collapsed={collapsed} {...props}>
        <Icon>{icon}</Icon>
        {!collapsed && (
          <SideBarText collapsed={collapsed}>
            <span>{children}</span>
            {commands && (
              <Cmds>
                {commands.map((cmd) => (
                  <Kbd key={cmd.name}>{cmd.icon || cmd.name}</Kbd>
                ))}
              </Cmds>
            )}
          </SideBarText>
        )}
      </SideBarAnchor>
    </Link>
  );
}
