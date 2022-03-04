import * as React from 'react';
import styled from 'styled-components';

type Props = { stopPropagation?: boolean } & React.ComponentProps<typeof Btn>;

const Btn = styled.button`
  cursor: pointer;
`;

export function Button({ onClick, stopPropagation, ...props }: Props) {
  const handleClick: React.MouseEventHandler<{}> = (e) => {
    if (stopPropagation) {
      e.stopPropagation();
    }
    if (onClick) {
      onClick(e);
    }
  };

  return <Btn type="button" onClick={handleClick} {...props} />;
}
