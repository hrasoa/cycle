import * as React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import * as Types from '../types';
import { Group } from './Group';
import { GroupForm } from './GroupForm';

const BoardRoot = styled.div`
  display: grid;
  grid-template-rows: min-content 1fr;
  height: 100%;
  row-gap: ${(props) => props.theme.space['16x']};
`;

const BoardContent = styled.div`
  display: flex;
  gap: ${(props) => props.theme.space['12x']};
  overflow-x: auto;
  overflow-y: auto;
`;

const BoardTitle = styled.h1`
  color: ${(props) => props.theme.colors.TextPrimary};
  font-size: ${(props) => props.theme.fontSizes.Headline};
  margin-top: ${(props) => props.theme.space['16x']};
`;

export function Board({ board }: { board: Types.Board }) {
  return (
    <BoardRoot>
      <Head>
        <title>{board.label}</title>
      </Head>
      <header>
        <BoardTitle>
          {board.icon} {board.label}
        </BoardTitle>
      </header>
      <BoardContent>
        {board.groupIds &&
          board.groupIds.map(
            (groupId) =>
              groupId && <Group key={groupId} boardId={board.id} id={groupId} />
          )}
        <GroupForm key={board.id} boardId={board.id} />
      </BoardContent>
    </BoardRoot>
  );
}
