import * as React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

type Props = {
  $collapsed?: boolean;
};

const Anchor = styled.a<Props>`
  align-items: center;
  border-radius: ${(props) => props.theme.radii['4x']};
  color: ${(props) => props.theme.colors.TextDisabled};
  cursor: pointer;
  display: grid;
  grid-template-columns: 32px 1fr;
  height: 32px;
  padding-bottom: ${(props) => props.theme.space['4x']};
  padding-top: ${(props) => props.theme.space['4x']};
  text-decoration: none;
  transition: background-color 0.1s, color 0.1s;
  width: ${(props) => (props.$collapsed ? '32px' : '100%')};

  &:not([data-active='true']):hover {
    background-color: ${(props) => props.theme.colors.Grey900};
    color: ${(props) => props.theme.colors.White};
  }

  &[data-active='true'] {
    background-color: ${(props) => props.theme.colors.BackgroundBlue};
    color: ${(props) => props.theme.colors.White};
  }
`;

export const SideBarAnchor = React.forwardRef<
  React.ElementRef<typeof Anchor>,
  React.ComponentProps<typeof Anchor>
>(function SideBarAnchor(props, ref) {
  const router = useRouter();
  return (
    <Anchor ref={ref} data-active={props.href === router.asPath} {...props} />
  );
});
