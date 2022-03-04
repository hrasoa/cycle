import { boards } from './boards';

// Hard code the ID for the test.
export const userId = '5d17c689-1951-4aae-938b-0f3cdfb50806';

export const users = [
  {
    id: userId,
    avatar:
      'https://s3-alpha-sig.figma.com/img/8a7d/68fe/92be1f29404445476407d81857a346d3?Expires=1646611200&Signature=fo9cPWQa305Jii7gVgzi1EhVxvLSutxr0zbadUX~sJZP0qSTo0HO0kMdKYyFOqiUdcyhSWUfkAA2xpOQdANsM6W~kQhQUdav7qxn4vYbSSTz90FfbxYDxcYK3NNF0YkKArUe-nM3ubhrneSLfCbEr0PG6gvi~-GSX04VrNN7aisAeS2~ArPAHexiABwE9f8b71PS9TJ0z33S276fHx0SwPjijmava~5FSct7U8wzpjBKEKgjrXrj1Tbw7GipD4aEcgu4riEavyuat79uE1BxydVoHp~kaSKToPUMdO67DwEDLQ~kSdObPIxfQdl9fb4m9NiYW0ZNGoSuFzuRLegqeQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
    starredBoardIds: boards.map(({ id }) => id),
    name: 'John Doe',
  },
];

export const getUserById = (id: string) => {
  return users.find((user) => user.id === id);
};
