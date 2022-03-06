import * as React from 'react';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import { Button } from '../generics/Button';
import * as Icons from './Icons';
import getGroupByIdQuery from '../schemas/getGroupById.graphql';
import * as Types from '../types';
import { Doc } from './Doc';
import { DocForm } from './DocForm';

const GroupRoot = styled.div`
  flex: 0 0 270px;
`;

const GroupTitle = styled.span`
  font-weight: ${(props) => props.theme.fontWeights['600']};
`;

const GroupContent = styled.div`
  background-color: ${(props) => props.theme.colors.Grey200};
  border-bottom-left-radius: ${(props) => props.theme.radii['8x']};
  border-bottom-right-radius: ${(props) => props.theme.radii['8x']};
`;

const GroupHeader = styled.div`
  background-color: ${(props) => props.theme.colors.Grey200};
  border-top-left-radius: ${(props) => props.theme.radii['8x']};
  border-top-right-radius: ${(props) => props.theme.radii['8x']};
  padding: ${(props) => props.theme.space['8x']};
  position: sticky;
  top: 0;
  z-index: 99;
`;

const GroupBody = styled.div`
  padding-bottom: ${(props) => props.theme.space['8x']};
  padding-left: ${(props) => props.theme.space['8x']};
  padding-right: ${(props) => props.theme.space['8x']};
`;

const GroupCta = styled.div`
  padding-top: 8px;
`;

const Trigger = styled(Button)`
  background-color: ${(props) => props.theme.colors.Grey200};
  display: flex;
  gap: ${(props) => props.theme.space['12x']};
`;

const IconDown = styled(Icons.Triangle)`
  color: ${(props) => props.theme.colors.TextDisabled};
`;

export function Group({ boardId, id }: { boardId: string; id: string }) {
  const { data } = useQuery<
    Types.GetGroupByIdQuery,
    Types.GetGroupByIdQueryVariables
  >(getGroupByIdQuery, { variables: { id } });
  return (
    (data && data.getGroupById && (
      <GroupRoot>
        <GroupHeader>
          <Trigger>
            <span>
              <IconDown height="8px" width="8px" />
            </span>
            <GroupTitle>
              {data.getGroupById.icon} {data.getGroupById.label}
            </GroupTitle>
          </Trigger>
        </GroupHeader>
        <GroupContent>
          <GroupBody>
            {data.getGroupById.docIds &&
              data.getGroupById.docIds.map(
                (docId) => docId && <Doc key={docId} id={docId} />
              )}
            <GroupCta>
              <DocForm groupId={data.getGroupById.id} />
            </GroupCta>
          </GroupBody>
        </GroupContent>
      </GroupRoot>
    )) ||
    null
  );
}
