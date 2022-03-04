import { v4 as uuidv4 } from 'uuid';
import { Doc, Group } from '../../../types';
import { boards, getBoardById } from './boards';
import { docs, getDocById } from './docs';
import { docTypes } from './docType';
import { getGroupById, groups } from './groups';
import { tags } from './tags';
import { getUserById, users } from './user';

export const resolvers = {
  Query: {
    getTags: () => tags,
    getDocs: () => docs,
    getDocById: (parent: unknown, { id }: { id: string }) => getDocById(id),
    getDocTypes: () => docTypes,
    getGroups: () => groups,
    getGroupById: (parent: unknown, { id }: { id: string }) => getGroupById(id),
    getBoards: () => boards,
    getBoardById: (parent: unknown, { id }: { id: string }) => getBoardById(id),
    getUsers: () => users,
    getUserById: (parent: unknown, { id }: { id: string }) => getUserById(id),
  },
  Mutation: {
    addGroup: (
      parent: unknown,
      { icon, label }: { boarId: string; icon: string; label: string }
    ): Group => {
      return {
        __typename: 'Group',
        id: uuidv4(),
        icon,
        label,
        docIds: [],
      };
    },
    addDoc: (
      parent: unknown,
      {
        description,
        tagIds,
        typeId,
      }: {
        groupdId: string;
        description: string;
        tagIds: string[];
        typeId: string;
      }
    ): Doc => {
      const docType = typeId
        ? docTypes.find((docType) => docType.id === typeId)
        : undefined;
      return {
        __typename: 'Doc',
        id: uuidv4(),
        description,
        tagIds,
        tags: tagIds
          ? tagIds.map((tagId) => {
              const tag = tags.find((tag) => tag.id === tagId);
              return tag
                ? {
                    __typename: 'Tag',
                    ...tag,
                  }
                : null;
            })
          : undefined,
        typeId,
        type: docType
          ? {
              __typename: 'DocType',
              ...docType,
            }
          : undefined,
      };
    },
  },
  Doc: {
    tags: (doc: typeof docs[0]) => {
      return doc.tagIds
        ? doc.tagIds
            .map((id: string) => tags.find((tag) => tag.id === id))
            .filter(Boolean)
        : [];
    },
    type: (doc: typeof docs[0]) => {
      return doc.typeId
        ? docTypes.find((docType) => docType.id === doc.typeId)
        : undefined;
    },
  },
  Group: {
    docs: (group: typeof groups[0]) => {
      return group.docIds
        ? group.docIds
            .map((id: string) => docs.find((doc) => doc.id === id))
            .filter(Boolean)
        : [];
    },
  },
  Board: {
    groups: (board: typeof boards[0]) => {
      return board.groupIds
        ? board.groupIds
            .map((id: string) => groups.find((group) => group.id === id))
            .filter(Boolean)
        : [];
    },
  },
  User: {
    starredBoards: (user: typeof users[0]) => {
      return user.starredBoardIds
        ? user.starredBoardIds
            .map((id: string) => boards.find((board) => id && board.id === id))
            .filter(Boolean)
        : [];
    },
  },
};
