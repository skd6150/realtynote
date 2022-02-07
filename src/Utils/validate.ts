import Toast from 'react-native-toast-message';
import {NoteItemAttributes, RentalType} from '../Interfaces';

export default function (note: NoteItemAttributes): boolean {
  if (note.deposit === '') {
    Toast.show({
      type: 'error',
      text1: `${
        note.rentalType === RentalType.Trading ? '매매가' : '보증금'
      }을 입력해주세요.`,
    });
    return false;
  }
  if (
    note.rentalType === RentalType.RentalMontlyFee &&
    note.monthlyFee === ''
  ) {
    Toast.show({
      type: 'error',
      text1: '월세를 입력해주세요.',
    });
    return false;
  }
  if (note.size === '') {
    Toast.show({
      type: 'error',
      text1: '전용면적을 입력해주세요.',
    });
    return false;
  }
  if (note.roofFloor.idx !== 0 && note.roofFloor.idx + 1 < note.floor.idx) {
    Toast.show({
      type: 'error',
      text1: '전체층이 해당층보다 작습니다.',
    });
    return false;
  }

  return true;
}
