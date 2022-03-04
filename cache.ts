import { gql, makeVar } from '@apollo/client';

export const GET_SIDE_NAV_COLLAPSED = gql`
  query GetSideNavExpanded {
    sideNavCollapsed @client
  }
`;

export const sideNavCollapsed = makeVar(false);
