import produce from 'immer';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import {Group} from '../../Interfaces';
import {
  ADD_NOTE,
  DEL_NOTE,
  UPDATE_NOTE,
  REARRANGE_NOTES,
  NoteActions,
} from '../Actions/noteActions';
import {
  ADD_GROUP,
  DEL_GROUP,
  RENAME_GROUP,
  GroupActions,
} from '../Actions/groupActions';

const initialState: Group[] = [
  {key: uuidv4(), name: '그룹 1', list: []},
  {key: uuidv4(), name: '그룹 2', list: []},
];

const reducer = (state = initialState, action: NoteActions | GroupActions) => {
  const groupIdx =
    action.type === ADD_GROUP
      ? -1
      : state.findIndex(group => group.key === action.groupKey);

  switch (action.type) {
    case ADD_GROUP:
      return state.concat({key: uuidv4(), name: action.name, list: []});
    case DEL_GROUP:
      return state.filter(group => {
        return group.key !== action.groupKey;
      });
    case RENAME_GROUP:
      return produce(state, draft => {
        draft[groupIdx].name = action.name;
      });
    case ADD_NOTE:
      return produce(state, draft => {
        draft[groupIdx].list = draft[groupIdx].list.concat(action.note);
      });
    case DEL_NOTE:
      return produce(state, draft => {
        draft[groupIdx].list = draft[groupIdx].list.filter(note => {
          return note.key !== action.key;
        });
      });
    case UPDATE_NOTE:
      const noteIdx = state[groupIdx].list.findIndex(
        note => note.key === action.key,
      );
      return produce(state, draft => {
        draft[groupIdx].list.splice(noteIdx, 1, action.note);
      });
    case REARRANGE_NOTES:
      return produce(state, draft => {
        draft[groupIdx].list = action.notes;
      });
    default:
      return state;
  }
};

export default reducer;
