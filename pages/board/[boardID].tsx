import * as React from 'react';
import { useQuery } from '@apollo/client';
import type { GetServerSideProps, NextPage } from 'next';
import { GetBoardByIdQuery, GetBoardByIdQueryVariables } from '../../types';
import getBoardByIdQuery from '../../schemas/getBoardById.graphql';
import { Board } from '../../components/Board';

type BoardPageProps = { boardID: string };

const BoardPage: NextPage<BoardPageProps> = ({ boardID }) => {
  const { error, loading, data, refetch } = useQuery<
    GetBoardByIdQuery,
    GetBoardByIdQueryVariables
  >(getBoardByIdQuery, { variables: { id: boardID } });

  if (loading) return <div>Loding...</div>;
  if (error) return <div>Error. {error.message}</div>;
  if (!data || !data.getBoardById) return <div>Board not found.</div>;

  return <Board board={data.getBoardById} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  if (typeof query.boardID !== 'string') {
    return {
      notFound: true,
    };
  }
  return {
    props: { boardID: query.boardID },
  };
};

export default BoardPage;
