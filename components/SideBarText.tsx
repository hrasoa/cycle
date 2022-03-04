import styled from 'styled-components';

type Props = {
  collapsed?: boolean;
};

export const SideBarText = styled.span<Props>`
  display: flex;
  gap: ${(props) => props.theme.space['8x']};
  opacity: ${(props) => (props.collapsed ? '0' : '1')};
  overflow: hidden;
  padding-right: ${(props) => props.theme.space['8x']};
  transition: opacity 0.1s, flex 0.1s;
  white-space: nowrap;
`;
