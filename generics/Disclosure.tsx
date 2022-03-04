import * as React from 'react';
import styled from 'styled-components';

const DivPanel = styled.div``;

type ContextValue = {
  expanded: boolean;
  id: string;
  nodes: {
    trigger: React.ButtonHTMLAttributes<{}>;
  };
};

export const Context = React.createContext<ContextValue>({
  expanded: false,
  id: 'disclosure',
  nodes: { trigger: {} },
});

export function Root({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const [{ expanded }, setState] = React.useState({ expanded: false });
  const handleOnTriggetClick: React.MouseEventHandler<{}> = (e) => {
    e.preventDefault();
    setState((s) => ({ expanded: !s.expanded }));
  };
  return (
    <Context.Provider
      value={{
        expanded,
        id,
        nodes: {
          trigger: {
            onClick: handleOnTriggetClick,
            'aria-expanded': expanded,
            'aria-controls': `${id}-panel`,
          },
        },
      }}
    >
      {children}
    </Context.Provider>
  );
}

export function Trigger({
  children,
}: {
  children: (
    expanded: boolean,
    props: ContextValue['nodes']['trigger']
  ) => JSX.Element;
}) {
  const {
    expanded,
    nodes: { trigger },
  } = React.useContext(Context);
  return children(expanded, trigger);
}

export function Panel(props: React.ComponentProps<typeof DivPanel>) {
  const { expanded, id } = React.useContext(Context);
  return <DivPanel id={`${id}-panel`} hidden={!expanded} {...props} />;
}
