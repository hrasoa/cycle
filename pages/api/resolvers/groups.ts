import { v4 as uuidv4 } from 'uuid';
import { docs } from './docs';

export const groups = [
  {
    id: uuidv4(),
    icon: '📐',
    label: 'Framing',
    docIds: docs.slice(0, 6).map(({ id }) => id),
  },
  {
    id: uuidv4(),
    icon: '🎨',
    label: 'In Design',
    docIds: docs.slice(6, 9).map(({ id }) => id),
  },
  {
    id: uuidv4(),
    icon: '✏️',
    label: 'In Review',
    docIds: docs.slice(9).map(({ id }) => id),
  },
];

export const getGroupById = (id: string) =>
  groups.find((group) => group.id === id);
