import * as React from 'react';
import { useQuery } from '@apollo/client';
import styled, { css } from 'styled-components';
import { Button } from '../generics/Button';
import { Tooltip } from '../generics/Tooltip';
import getDocByIdQuery from '../schemas/getDocById.graphql';
import * as Icons from './Icons';
import * as Types from '../types';

type TagVariants = {
  variant?: Types.Tag['variant'];
};

const MoreButton = styled(Button)`
  align-items: center;
  border-radius: ${(props) => props.theme.radii['4x']};
  color: ${(props) => props.theme.colors.White};
  display: none;
  height: 20px;
  position: absolute;
  right: ${(props) => props.theme.space['4x']};
  top: 0;
  justify-content: center;
  width: 20px;
`;

const IconMore = styled(Icons.More)`
  color: ${(props) => props.theme.colors.TextDisabled};
`;

const DocRoot = styled.div`
  background-color: ${(props) => props.theme.colors.White};
  border-radius: ${(props) => props.theme.radii['6x']};
  margin-top: ${(props) => props.theme.space['8x']};
  padding: ${(props) => props.theme.space['8x']};
  position: relative;

  &:first-of-type {
    margin-top: 0;
  }

  &:hover ${MoreButton} {
    display: flex;
  }
`;

const DocText = styled.p``;

const DocTags = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: ${(props) => props.theme.space['8x']};
  margin-top: ${(props) => props.theme.space['8x']};
`;

const DocTag = styled(Tooltip)<TagVariants>`
  align-items: center;
  border-radius: ${(props) => props.theme.radii['4x']};
  border: 2px solid ${(props) => props.theme.colors.Grey200};
  font-size: ${(props) => props.theme.fontSizes.Caption};
  display: flex;
  height: 24px;
  max-width: 130px;
  padding-left: ${(props) => props.theme.space['4x']};
  padding-right: ${(props) => props.theme.space['4x']};
  position: relative;

  &::before {
    position: absolute;
  }

  ${(props) => {
    switch (props.variant) {
      case 'Blue':
        return css`
          border-color: transparent;
          background-color: ${props.theme.colors.Blue200};
          color: ${props.theme.colors.TextBlue};
        `;
      case 'BlueGreen':
        return css`
          border-color: transparent;
          background-color: ${props.theme.colors.BackgroundBlueGreenLight};
          color: ${props.theme.colors.TextBlueGreen};
        `;
      case 'Green':
        return css`
          border-color: transparent;
          background-color: ${props.theme.colors.BackgroundGreenLight};
          color: ${props.theme.colors.TextGreen};
        `;
      case 'Orange':
        return css`
          border-color: transparent;
          background-color: ${props.theme.colors.Orange200};
          color: ${props.theme.colors.TextOrange};
        `;
      case 'Purple':
        return css`
          border-color: transparent;
          background-color: ${props.theme.colors.BackgroundPurpleLight};
          color: ${props.theme.colors.TextPurple};
        `;
      default:
        return '';
    }
  }}
`;

const DocLabel = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export function Doc({ id }: { id: string }) {
  const { data } = useQuery<
    Types.GetDocByIdQuery,
    Types.GetBoardByIdQueryVariables
  >(getDocByIdQuery, { variables: { id } });
  return (
    (data && data.getDocById && (
      <DocRoot>
        <MoreButton>
          <IconMore />
        </MoreButton>
        <DocText>{data.getDocById.description}</DocText>
        {(data.getDocById.type || data.getDocById.tags) && (
          <DocTags>
            {data.getDocById.type && (
              <DocTag as="li" data-tooltip={data.getDocById.type.label}>
                <DocLabel>{data.getDocById.type.icon}</DocLabel>
              </DocTag>
            )}
            {data.getDocById.tags &&
              data.getDocById.tags.map(
                (tag) =>
                  tag && (
                    <DocTag
                      as="li"
                      key={tag.id}
                      variant={tag.variant}
                      data-tooltip={tag.label}
                    >
                      <DocLabel>{tag.label}</DocLabel>
                    </DocTag>
                  )
              )}
          </DocTags>
        )}
      </DocRoot>
    )) ||
    null
  );
}
