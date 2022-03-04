import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  type Tag {
    id: ID!
    label: String!
    variant: String
  }

  type DocType {
    id: ID!
    label: String!
    icon: String!
  }

  type Doc {
    id: ID!
    description: String!
    tagIds: [String]
    tags: [Tag]
    typeId: String
    type: DocType
  }

  type Group {
    id: ID!
    icon: String!
    label: String!
    docIds: [String]
    docs: [Doc]
  }

  type Board {
    id: ID!
    icon: String!
    label: String!
    groupIds: [String]
    groups: [Group]
  }

  type User {
    id: ID!
    avatar: String!
    name: String!
    starredBoardIds: [String]
    starredBoards: [Board]
  }

  type Query {
    getTags: [Tag]
    getDocTypes: [DocType]
    getDocs: [Doc]
    getDocById(id: ID!): Doc
    getGroups: [Group]
    getGroupById(id: ID!): Group
    getBoards: [Board]
    getBoardById(id: ID!): Board
    getUsers: [User]
    getUserById(id: ID!): User
  }

  type Mutation {
    addGroup(boardId: String!, icon: String!, label: String!): Group
    addDoc(
      groupId: String!
      description: String!
      tagIds: [String]
      typeId: String
    ): Doc
  }
`;
