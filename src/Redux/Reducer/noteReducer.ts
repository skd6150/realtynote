import {NoteItemAttributes, RentalType, Structure} from '../../Interfaces';
import {
  ADD_NOTE,
  DEL_NOTE,
  UPDATE_NOTE,
  SWAP_NOTE,
  NoteActions,
} from '../Actions/noteActions';

const initialState: NoteItemAttributes[] = [
  {
    key: '0',
    address: '용현동 111',
    deposit: 50000000,
    floor: 3,
    map: null,
    monthlyFee: 0,
    photoUri: ['uri'],
    rentalType: RentalType.Rental,
    size: 33,
    agentName: '부동산 이름',
    agentTel: '010-1234-1234',
    evaluationFactors: [],
    managementFee: 0,
    roomStructure: Structure.OneOpen,
    memo: '',
    options: [],
  },
  {
    key: '1',
    address: '용현동 222',
    deposit: 6000000,
    floor: 3,
    map: null,
    monthlyFee: 300000,
    photoUri: ['uri'],
    rentalType: RentalType.RentalMontlyFee,
    size: 33,
    agentName: '부동산 이름',
    agentTel: '010-1234-1234',
    evaluationFactors: [],
    managementFee: 0,
    roomStructure: Structure.OneOpen,
    memo: '',
    options: [],
  },
  {
    key: '2',
    address: '용현동 333',
    deposit: 80000000,
    floor: 3,
    map: null,
    monthlyFee: 0,
    photoUri: ['uri'],
    rentalType: RentalType.Trading,
    size: 33,
    agentName: '부동산 이름',
    agentTel: '010-1234-1234',
    evaluationFactors: [],
    managementFee: 0,
    roomStructure: Structure.OneOpen,
    memo: '',
    options: [],
  },
];

const reducer = (state = initialState, action: NoteActions) => {
  switch (action.type) {
    case ADD_NOTE:
      return state.concat(action.note);
    case DEL_NOTE:
      return state.filter((note: NoteItemAttributes) => {
        note.key !== action.key;
      });
    case UPDATE_NOTE:
      const idx = state.findIndex(note => note.key === action.key);
      return state.splice(idx, 0, action.note);
    case SWAP_NOTE:
      return action.notes;
    default:
      return state;
  }
};

export default reducer;
