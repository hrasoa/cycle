import { v4 as uuidv4 } from 'uuid';
import { docTypes } from './docType';
import * as tags from './tags';

export const docs = [
  {
    id: uuidv4(),
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus nec leo blandit, malesuada arcu scelerisque, fermentum lectus. Nulla ac accumsan erat.',
    tagIds: tags.tags
      .filter(({ id }) =>
        [tags.cyc321ID, tags.designID, tags.sprint4ID].includes(id)
      )
      .map(({ id }) => id),
    typeId: docTypes[0].id,
  },
  {
    id: uuidv4(),
    description: 'Aliquam eget felis vulputate, pharetra ex vitae.',
    tagIds: tags.tags
      .filter(({ id }) =>
        [tags.cyc321ID, tags.designID, tags.sprint5ID].includes(id)
      )
      .map(({ id }) => id),
    typeId: docTypes[1].id,
  },
  {
    id: uuidv4(),
    description: 'Phasellus id ipsum in massa commodo aliquam vel in lectus.',
    tagIds: tags.tags
      .filter(({ id }) =>
        [tags.cyc322ID, tags.designID, tags.sprint4ID].includes(id)
      )
      .map(({ id }) => id),
    typeId: docTypes[2].id,
  },
  {
    id: uuidv4(),
    description: 'Suspendisse dapibus metus aliquet lectus ultrices placerat',
    tagIds: tags.tags
      .filter(({ id }) =>
        [
          tags.cyc322ID,
          tags.designID,
          tags.sprint4ID,
          tags.highPrioID,
          tags.newFeaturesID,
        ].includes(id)
      )
      .map(({ id }) => id),
    typeId: docTypes[2].id,
  },
  {
    id: uuidv4(),
    description:
      'Aliquam elementum arcu velit, ac consequat arcu lobortis sed. Integer non cursus leo, et euismod felis.',
    tagIds: tags.tags
      .filter(({ id }) =>
        [tags.cyc322ID, tags.designID, tags.sprint4ID].includes(id)
      )
      .map(({ id }) => id),
    typeId: docTypes[2].id,
  },
  {
    id: uuidv4(),
    description: 'Nam semper eleifend diam.',
    tagIds: tags.tags
      .filter(({ id }) =>
        [tags.cyc322ID, tags.designID, tags.sprint4ID].includes(id)
      )
      .map(({ id }) => id),
    typeId: docTypes[2].id,
  },
  {
    id: uuidv4(),
    description: 'Aliquam eget felis vulputate, pharetra ex vitae.',
    tagIds: tags.tags
      .filter(({ id }) =>
        [tags.cyc321ID, tags.designID, tags.sprint4ID].includes(id)
      )
      .map(({ id }) => id),
    typeId: docTypes[0].id,
  },
  {
    id: uuidv4(),
    description:
      'Restibulum pharetra ligula sed dapibus commodo. Aliquam pulvinar posuere condimentum.',
    tagIds: tags.tags
      .filter(({ id }) =>
        [tags.cyc322ID, tags.designID, tags.sprint5ID].includes(id)
      )
      .map(({ id }) => id),
    typeId: docTypes[1].id,
  },
  {
    id: uuidv4(),
    description: 'Vestibulum sed massa mollis sem interdum rutrum.',
    tagIds: tags.tags
      .filter(({ id }) =>
        [tags.cyc322ID, tags.designID, tags.sprint4ID].includes(id)
      )
      .map(({ id }) => id),
    typeId: docTypes[2].id,
  },
  {
    id: uuidv4(),
    description: 'Phasellus id ipsum in massa commodo aliquam vel in lectus.',
    tagIds: tags.tags
      .filter(({ id }) =>
        [tags.cyc321ID, tags.designID, tags.sprint4ID].includes(id)
      )
      .map(({ id }) => id),
    typeId: docTypes[0].id,
  },
];

export const getDocById = (id: string) => docs.find((doc) => doc.id === id);
