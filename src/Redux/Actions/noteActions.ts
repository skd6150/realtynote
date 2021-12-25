import {AnyAction} from 'redux';
import {NoteItemAttributes} from '../../Interfaces';

export const ADD_NOTE = 'NOTE/ADD' as const;
export const addNote = (note: NoteItemAttributes) => {
  return {
    type: ADD_NOTE,
    note,
  };
};

export const DEL_NOTE = 'NOTE/DEL' as const;
export const delNote = (key: string) => {
  return {
    type: DEL_NOTE,
    key,
  };
};

export const UPDATE_NOTE = 'NOTE/UPDATE' as const;
export const updateNote = (key: string, note: NoteItemAttributes) => {
  return {
    type: UPDATE_NOTE,
    key,
    note,
  };
};

export const SWAP_NOTE = 'NOTE/SWAP' as const;
export const swapNote = (notes: NoteItemAttributes[]) => {
  return {
    type: SWAP_NOTE,
    notes,
  };
};

export type NoteActions =
  | ReturnType<typeof addNote>
  | ReturnType<typeof delNote>
  | ReturnType<typeof updateNote>
  | ReturnType<typeof swapNote>;
