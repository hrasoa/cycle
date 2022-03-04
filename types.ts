export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Board = {
  __typename?: 'Board';
  groupIds?: Maybe<Array<Maybe<Scalars['String']>>>;
  groups?: Maybe<Array<Maybe<Group>>>;
  icon: Scalars['String'];
  id: Scalars['ID'];
  label: Scalars['String'];
};

export type Doc = {
  __typename?: 'Doc';
  description: Scalars['String'];
  id: Scalars['ID'];
  tagIds?: Maybe<Array<Maybe<Scalars['String']>>>;
  tags?: Maybe<Array<Maybe<Tag>>>;
  type?: Maybe<DocType>;
  typeId?: Maybe<Scalars['String']>;
};

export type DocType = {
  __typename?: 'DocType';
  icon: Scalars['String'];
  id: Scalars['ID'];
  label: Scalars['String'];
};

export type Group = {
  __typename?: 'Group';
  docIds?: Maybe<Array<Maybe<Scalars['String']>>>;
  docs?: Maybe<Array<Maybe<Doc>>>;
  icon: Scalars['String'];
  id: Scalars['ID'];
  label: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addDoc?: Maybe<Doc>;
  addGroup?: Maybe<Group>;
};


export type MutationAddDocArgs = {
  description: Scalars['String'];
  groupId: Scalars['String'];
  tagIds?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  typeId?: InputMaybe<Scalars['String']>;
};


export type MutationAddGroupArgs = {
  boardId: Scalars['String'];
  icon: Scalars['String'];
  label: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getBoardById?: Maybe<Board>;
  getBoards?: Maybe<Array<Maybe<Board>>>;
  getDocById?: Maybe<Doc>;
  getDocTypes?: Maybe<Array<Maybe<DocType>>>;
  getDocs?: Maybe<Array<Maybe<Doc>>>;
  getGroupById?: Maybe<Group>;
  getGroups?: Maybe<Array<Maybe<Group>>>;
  getTags?: Maybe<Array<Maybe<Tag>>>;
  getUserById?: Maybe<User>;
  getUsers?: Maybe<Array<Maybe<User>>>;
};


export type QueryGetBoardByIdArgs = {
  id: Scalars['ID'];
};


export type QueryGetDocByIdArgs = {
  id: Scalars['ID'];
};


export type QueryGetGroupByIdArgs = {
  id: Scalars['ID'];
};


export type QueryGetUserByIdArgs = {
  id: Scalars['ID'];
};

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['ID'];
  label: Scalars['String'];
  variant?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  avatar: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  starredBoardIds?: Maybe<Array<Maybe<Scalars['String']>>>;
  starredBoards?: Maybe<Array<Maybe<Board>>>;
};

export type AddDocMutationVariables = Exact<{
  groupId: Scalars['String'];
  description: Scalars['String'];
  tagIds?: InputMaybe<Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>>;
  typeId?: InputMaybe<Scalars['String']>;
}>;


export type AddDocMutation = { __typename?: 'Mutation', addDoc?: { __typename?: 'Doc', id: string, description: string, tags?: Array<{ __typename?: 'Tag', id: string, label: string, variant?: string | null } | null> | null, type?: { __typename?: 'DocType', id: string, icon: string, label: string } | null } | null };

export type AddGroupMutationVariables = Exact<{
  boardId: Scalars['String'];
  icon: Scalars['String'];
  label: Scalars['String'];
}>;


export type AddGroupMutation = { __typename?: 'Mutation', addGroup?: { __typename?: 'Group', id: string, label: string, icon: string, docIds?: Array<string | null> | null } | null };

export type BoardGroupIdsFragment = { __typename?: 'Board', id: string, groupIds?: Array<string | null> | null };

export type GetBoardByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetBoardByIdQuery = { __typename?: 'Query', getBoardById?: { __typename?: 'Board', id: string, icon: string, label: string, groupIds?: Array<string | null> | null } | null };

export type GetBoardsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBoardsQuery = { __typename?: 'Query', getBoards?: Array<{ __typename?: 'Board', id: string, icon: string, label: string, groups?: Array<{ __typename?: 'Group', id: string, icon: string, label: string, docs?: Array<{ __typename?: 'Doc', id: string, description: string, tags?: Array<{ __typename?: 'Tag', id: string, label: string, variant?: string | null } | null> | null, type?: { __typename?: 'DocType', id: string, icon: string, label: string } | null } | null> | null } | null> | null } | null> | null };

export type GetDocByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetDocByIdQuery = { __typename?: 'Query', getDocById?: { __typename?: 'Doc', id: string, description: string, tags?: Array<{ __typename?: 'Tag', id: string, label: string, variant?: string | null } | null> | null, type?: { __typename?: 'DocType', id: string, icon: string, label: string } | null } | null };

export type GetDocTypesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDocTypesQuery = { __typename?: 'Query', getDocTypes?: Array<{ __typename?: 'DocType', id: string, label: string, icon: string } | null> | null };

export type GetDocsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDocsQuery = { __typename?: 'Query', getDocs?: Array<{ __typename?: 'Doc', id: string, description: string, tags?: Array<{ __typename?: 'Tag', id: string, label: string, variant?: string | null } | null> | null, type?: { __typename?: 'DocType', id: string, icon: string, label: string } | null } | null> | null };

export type GetGroupByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetGroupByIdQuery = { __typename?: 'Query', getGroupById?: { __typename?: 'Group', id: string, icon: string, label: string, docIds?: Array<string | null> | null } | null };

export type GetGroupsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetGroupsQuery = { __typename?: 'Query', getGroups?: Array<{ __typename?: 'Group', id: string, icon: string, label: string, docs?: Array<{ __typename?: 'Doc', id: string, description: string, tags?: Array<{ __typename?: 'Tag', id: string, label: string, variant?: string | null } | null> | null } | null> | null } | null> | null };

export type GetTagsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTagsQuery = { __typename?: 'Query', getTags?: Array<{ __typename?: 'Tag', id: string, label: string, variant?: string | null } | null> | null };

export type GetUserByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetUserByIdQuery = { __typename?: 'Query', getUserById?: { __typename?: 'User', id: string, name: string, avatar: string, starredBoards?: Array<{ __typename?: 'Board', id: string, icon: string, label: string } | null> | null } | null };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', getUsers?: Array<{ __typename?: 'User', id: string, name: string, avatar: string } | null> | null };

export type GroupIdFragmentFragment = { __typename?: 'Group', id: string };
