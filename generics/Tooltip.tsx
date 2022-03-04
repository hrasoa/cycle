import styled from 'styled-components';

export const Tooltip = styled.div`
  position: relative;

  &::before {
    background-color: ${(props) => props.theme.colors.Black};
    bottom: calc(100% + ${(props) => props.theme.space['8x']});
    border-radius: ${(props) => props.theme.radii['4x']};
    content: attr(data-tooltip) ' ';
    color: ${(props) => props.theme.colors.White};
    display: none;
    left: 50%;
    position: absolute;
    padding: ${(props) =>
      `${props.theme.space['6x']} ${props.theme.space['8x']}`};
    transform: translate(-50%, 0);
    white-space: nowrap;
  }

  &:hover::before {
    display: block;
  }
`;
