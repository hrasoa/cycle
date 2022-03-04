import { v4 as uuidv4 } from 'uuid';
import { groups } from './groups';

export const boards = [
  {
    id: uuidv4(),
    icon: '🦊',
    label: 'Feedback 2.0',
    groupIds: groups.slice(1).map(({ id }) => id),
  },
  {
    id: uuidv4(),
    icon: '🎨',
    label: 'Design',
    groupIds: groups.map(({ id }) => id),
  },
];

export const getBoardById = (id: string) =>
  boards.find((board) => board.id === id);
