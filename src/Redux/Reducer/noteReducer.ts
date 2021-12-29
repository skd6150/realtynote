import produce from 'immer';
import {NoteItemAttributes} from '../../Interfaces';
import {
  ADD_NOTE,
  DEL_NOTE,
  UPDATE_NOTE,
  REARRANGE_NOTES,
  NoteActions,
} from '../Actions/noteActions';

const initialState: NoteItemAttributes[] = [];

const reducer = (state = initialState, action: NoteActions) => {
  switch (action.type) {
    case ADD_NOTE:
      return state.concat(action.note);
    case DEL_NOTE:
      return state.filter((note: NoteItemAttributes) => {
        return note.key !== action.key;
      });
    case UPDATE_NOTE:
      const idx = state.findIndex(note => note.key === action.key);
      return produce(state, draft => {
        draft.splice(idx, 1, action.note);
      });
    case REARRANGE_NOTES:
      return action.notes;
    default:
      return state;
  }
};

export default reducer;
