import {NoteItemAttributes} from '../../Interfaces';
import {
  ADD_NOTE,
  DEL_NOTE,
  UPDATE_NOTE,
  REARRANGE_NOTES,
  NoteActions,
} from '../Actions/noteActions';
import initialState from '../initialState';

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
      state.splice(idx, 0, action.note);
      return state;
    case REARRANGE_NOTES:
      return action.notes;
    default:
      return state;
  }
};

export default reducer;
