import * as React from 'react';
import { useMutation } from '@apollo/client';
import styled from 'styled-components';
import addGroupMutation from '../schemas/addGroup.graphql';
import getGroupByIdQuery from '../schemas/getGroupById.graphql';
import boardGroupIdsFragment from '../schemas/boardGroupIds.graphql';
import * as Types from '../types';
import * as Disclosure from '../generics/Disclosure';
import * as Icons from './Icons';
import { Button } from '../generics/Button';

const FormRoot = styled.div`
  flex: 0 0 270px;
`;

const ButtonAdd = styled(Button)`
  align-items: center;
  border-radius: ${(props) => props.theme.radii['4x']};
  color: ${(props) => props.theme.colors.TextSecondary};
  font-size: ${(props) => props.theme.fontSizes.Caption};
  display: flex;
  height: 24px;
  padding-left: ${(props) => props.theme.space['4x']};
  padding-right: ${(props) => props.theme.space['4x']};
  width: 100%;

  &:hover {
    background-color: ${(props) => props.theme.colors.Grey300};
    color: ${(props) => props.theme.colors.TextPrimary};
  }
`;

const IconAdd = styled(Icons.Add)`
  height: 8px;
  margin-right: ${(props) => props.theme.space['6x']};
  width: 8px;
`;

export function GroupForm({ boardId }: { boardId: string }) {
  const [state, setState] = React.useState({ icon: '', label: '' });
  const [addGroup] = useMutation<
    Types.AddGroupMutation,
    Types.AddGroupMutationVariables
  >(addGroupMutation, {
    update(cache, { data: addGroupResult }) {
      const boardRef = cache.readFragment<Types.BoardGroupIdsFragment>({
        id: ['Board', boardId].join(':'),
        fragment: boardGroupIdsFragment,
      });
      if (boardRef && addGroupResult && addGroupResult.addGroup) {
        cache.modify({
          id: cache.identify(boardRef),
          fields: {
            groupIds(cachedGroupIds) {
              return [...cachedGroupIds, addGroupResult.addGroup?.id];
            },
          },
        });
        cache.writeQuery<
          Types.GetGroupByIdQuery,
          Types.GetGroupByIdQueryVariables
        >({
          query: getGroupByIdQuery,
          data: {
            getGroupById: addGroupResult.addGroup,
          },
          variables: {
            id: addGroupResult.addGroup.id,
          },
        });
      }
    },
  });

  const handleIconChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target instanceof HTMLInputElement) {
      setState((s) => ({ ...s, icon: e.target.value }));
    }
  };

  const handleLabelChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target instanceof HTMLInputElement) {
      setState((s) => ({ ...s, label: e.target.value }));
    }
  };

  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();
    addGroup({ variables: { boardId, ...state } });
  };

  return (
    <FormRoot>
      <Disclosure.Root id={[boardId, 'add'].join('-')}>
        <Disclosure.Trigger>
          {(expanded, triggerProps) => (
            <ButtonAdd {...triggerProps}>
              <IconAdd /> Add group
            </ButtonAdd>
          )}
        </Disclosure.Trigger>
        <Disclosure.Panel>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="group-icon-add">
                Icon
                <div>
                  <input
                    required
                    id="group-icon-add"
                    type="text"
                    name="icon"
                    value={state.icon}
                    onChange={handleIconChange}
                  />
                </div>
              </label>
            </div>
            <div>
              <label htmlFor="group-label-add">
                Label
                <div>
                  <input
                    id="group-label-add"
                    required
                    type="text"
                    name="label"
                    value={state.label}
                    onChange={handleLabelChange}
                  />
                </div>
              </label>
            </div>
            <ButtonAdd type="submit">Submit group</ButtonAdd>
          </form>
        </Disclosure.Panel>
      </Disclosure.Root>
    </FormRoot>
  );
}
