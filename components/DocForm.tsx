import * as React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import styled from 'styled-components';
import getTagsQuery from '../pages/api/getTags.graphql';
import getDocTypesQuery from '../pages/api/getDocTypes.graphql';
import getDocByIdQuery from '../pages/api/getDocById.graphql';
import addDocMutation from '../pages/api/addDoc.graphql';
import groupIdFragment from '../pages/api/groupIdFragment.graphql';
import * as Types from '../types';
import * as Icons from './Icons';
import * as Disclosure from '../generics/Disclosure';
import { Button } from '../generics/Button';

const ButtonAdd = styled(Button)`
  align-items: center;
  border-radius: ${(props) => props.theme.radii['4x']};
  color: ${(props) => props.theme.colors.TextSecondary};
  display: flex;
  font-size: ${(props) => props.theme.fontSizes.Caption};
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

const Form = styled.form`
  margin-top: ${(props) => props.theme.space['8x']};
`;

export function DocForm({ groupId }: { groupId: string }) {
  const [state, setState] = React.useState<{
    description: string;
    tagIds: string[];
    typeId: string;
  }>({
    description: '',
    tagIds: [],
    typeId: '',
  });
  const tagsQuery = useQuery<Types.GetTagsQuery>(getTagsQuery);
  const typesQuery = useQuery<Types.GetDocTypesQuery>(getDocTypesQuery);
  const [addDoc] = useMutation<
    Types.AddDocMutation,
    Types.AddDocMutationVariables
  >(addDocMutation, {
    update(cache, { data: addDocResult }) {
      const groupRef = cache.readFragment<Types.GroupIdFragmentFragment>({
        id: ['Group', groupId].join(':'),
        fragment: groupIdFragment,
      });
      if (groupRef && addDocResult && addDocResult.addDoc) {
        cache.modify({
          id: cache.identify(groupRef),
          fields: {
            docIds(cachedDocIds) {
              return [...cachedDocIds, addDocResult.addDoc?.id];
            },
          },
        });
        cache.writeQuery<Types.GetDocByIdQuery, Types.GetDocByIdQueryVariables>(
          {
            query: getDocByIdQuery,
            data: {
              getDocById: addDocResult.addDoc,
            },
            variables: {
              id: addDocResult.addDoc.id,
            },
          }
        );
      }
    },
  });

  const handleTypeChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    setState((s) => ({
      ...s,
      typeId: e.target.value,
    }));
  };

  const handleDescChange: React.ChangeEventHandler<HTMLTextAreaElement> = (
    e
  ) => {
    setState((s) => ({
      ...s,
      description: e.target.value,
    }));
  };

  const handleTagChange: React.MouseEventHandler<HTMLInputElement> = (e) => {
    const { checked, name } = e.currentTarget;
    const tagsIdsCopy = [...state.tagIds];
    if (checked) {
      tagsIdsCopy.push(name);
    } else {
      const index = tagsIdsCopy.findIndex((tagId) => tagId === name);
      if (index >= 0) {
        tagsIdsCopy.splice(index, 1);
      }
    }
    setState((s) => ({
      ...s,
      tagIds: tagsIdsCopy,
    }));
  };

  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();
    addDoc({
      variables: {
        groupId,
        ...state,
      },
    });
  };

  return (
    <div>
      <Disclosure.Root id={[groupId, 'add'].join('-')}>
        <Disclosure.Trigger>
          {(expanded, triggerProps) => (
            <ButtonAdd {...triggerProps}>
              <IconAdd /> Add doc
            </ButtonAdd>
          )}
        </Disclosure.Trigger>
        <Disclosure.Panel>
          <Form onSubmit={handleSubmit}>
            <textarea
              required
              value={state.description}
              placeholder="Description"
              onChange={handleDescChange}
            />
            {typesQuery.data && typesQuery.data.getDocTypes && (
              <select value={state.typeId} onChange={handleTypeChange}>
                <option>Choose a doc type...</option>
                {typesQuery.data.getDocTypes.map(
                  (type) =>
                    type && (
                      <option key={type.id} value={type.id}>
                        {type.icon} {type.label}
                      </option>
                    )
                )}
              </select>
            )}
            <div>
              {tagsQuery.data &&
                tagsQuery.data.getTags &&
                tagsQuery.data.getTags.map(
                  (tag) =>
                    tag && (
                      <div key={tag.id}>
                        <label htmlFor={[groupId, tag.id].join('-')}>
                          <input
                            id={[groupId, tag.id].join('-')}
                            name={tag.id}
                            type="checkbox"
                            onClick={handleTagChange}
                          />{' '}
                          {tag.label}
                        </label>
                      </div>
                    )
                )}
            </div>
            <ButtonAdd type="submit">Submit doc</ButtonAdd>
          </Form>
        </Disclosure.Panel>
      </Disclosure.Root>
    </div>
  );
}
