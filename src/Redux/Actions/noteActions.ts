import {NoteItemAttributes} from '../../Interfaces';

export const ADD_NOTE = 'NOTE/ADD' as const;
export const addNote = (note: NoteItemAttributes, groupKey: string) => {
  return {
    type: ADD_NOTE,
    note,
    groupKey,
  };
};

export const DEL_NOTE = 'NOTE/DEL' as const;
export const delNote = (key: string, groupKey: string) => {
  return {
    type: DEL_NOTE,
    key,
    groupKey,
  };
};

export const UPDATE_NOTE = 'NOTE/UPDATE' as const;
export const updateNote = (
  key: string,
  note: NoteItemAttributes,
  groupKey: string,
) => {
  return {
    type: UPDATE_NOTE,
    key,
    note,
    groupKey,
  };
};

export const REARRANGE_NOTES = 'NOTE/REARRANGE' as const;
export const rearrangeNotes = (
  notes: NoteItemAttributes[],
  groupKey: string,
) => {
  return {
    type: REARRANGE_NOTES,
    notes,
    groupKey,
  };
};

export type NoteActions =
  | ReturnType<typeof addNote>
  | ReturnType<typeof delNote>
  | ReturnType<typeof updateNote>
  | ReturnType<typeof rearrangeNotes>;
