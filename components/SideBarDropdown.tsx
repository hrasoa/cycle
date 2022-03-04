import * as React from 'react';
import styled from 'styled-components';
import { useReactiveVar } from '@apollo/client';
import * as Icons from './Icons';
import { sideNavCollapsed } from '../cache';
import { SideBarText } from './SideBarText';
import { Button } from '../generics/Button';

type Props = {
  collapsed?: boolean;
};

const Btn = styled(Button)`
  align-items: center;
  background: none;
  border-radius: ${(props) => props.theme.radii['4x']};
  border: none;
  height: 36px;

  &:hover {
    background-color: ${(props) => props.theme.colors.Grey900};
    color: ${(props) => props.theme.colors.White};
  }
`;

const IconChevronGrey = styled(Icons.Chevron)`
  color: ${(props) => props.theme.colors.TextDisabled};
`;

const Trigger = styled(Btn)<Props>`
  display: grid;
  grid-template-columns: 32px 1fr;
  color: ${(props) => props.theme.colors.White};
  width: ${(props) => (props.collapsed ? '32px' : 'auto')};
`;

const Icon = styled.span`
  display: flex;
  justify-content: center;
`;

export function SideBarDropdown({
  children,
  icon,
  ...props
}: {
  children?: React.ReactNode;
  icon?: React.ReactElement;
} & React.ComponentProps<typeof Trigger>) {
  const collapsed = useReactiveVar(sideNavCollapsed);
  return (
    <Trigger collapsed={collapsed} {...props}>
      <Icon>{icon}</Icon>
      <SideBarText collapsed={collapsed}>
        {children && <span>{children}</span>}
        <span>
          <IconChevronGrey />
        </span>
      </SideBarText>
    </Trigger>
  );
}
