import * as React from 'react';
import { useReactiveVar } from '@apollo/client';
import styled from 'styled-components';
import * as Discolure from '../generics/Disclosure';
import { sideNavCollapsed } from '../cache';
import * as Icons from './Icons';
import { Button } from '../generics/Button';

type ExpandedProps = {
  $expanded?: boolean;
};

type TriggerProps = {
  $active?: boolean;
};

const Trigger = styled(Button)<TriggerProps>`
  align-items: center;
  color: ${(props) =>
    props.$active ? props.theme.colors.White : props.theme.colors.TextDisabled};
  font-size: ${(props) => props.theme.fontSizes.Body};
  display: grid;
  grid-template-columns: 32px 1fr;
  text-align: left;
  width: 100%;
`;

const IndicatorCell = styled.span`
  display: flex;
  justify-content: center;
`;

const Indicator = styled(Icons.Triangle)<ExpandedProps>`
  transform: ${(props) => (props.$expanded ? 'rotate(0)' : 'rotate(-90deg)')};
  transition: transform 0.1s;
`;

const Panel = styled(Discolure.Panel)`
  padding-top: ${(props) => props.theme.space['8x']};
`;

export function SideBarDisclosureLinks({
  active,
  children,
  id,
  label,
}: {
  active?: boolean;
  children: React.ReactNode;
  id: string;
  label: string;
}) {
  const collapsed = useReactiveVar(sideNavCollapsed);
  return (
    <Discolure.Root id={id}>
      {!collapsed && (
        <Discolure.Trigger>
          {(expanded, triggerProps) => (
            <Trigger $active={active} {...triggerProps}>
              <IndicatorCell>
                <Indicator $expanded={expanded} />
              </IndicatorCell>
              <span>{label}</span>
            </Trigger>
          )}
        </Discolure.Trigger>
      )}
      {collapsed ? children : <Panel>{children}</Panel>}
    </Discolure.Root>
  );
}
