import { v4 as uuidv4 } from 'uuid';
import { Tag } from '../../../types';

export const cyc321ID = uuidv4();
export const cyc322ID = uuidv4();
export const designID = uuidv4();
export const sprint4ID = uuidv4();
export const sprint5ID = uuidv4();
export const highPrioID = uuidv4();
export const newFeaturesID = uuidv4();

export const tags: Tag[] = [
  {
    id: cyc321ID,
    label: '#CYC-321',
  },
  {
    id: cyc322ID,
    label: '#CYC-322',
  },
  {
    id: designID,
    label: 'Design',
    variant: 'Blue',
  },
  {
    id: sprint4ID,
    label: 'Sprint 4',
    variant: 'Purple',
  },
  {
    id: sprint5ID,
    label: 'Sprint 5',
    variant: 'Green',
  },
  {
    id: highPrioID,
    label: 'High Priority 🔥',
    variant: 'Orange',
  },
  {
    id: newFeaturesID,
    label: 'New features: Implemente the new doc editor features',
    variant: 'BlueGreen',
  },
];
