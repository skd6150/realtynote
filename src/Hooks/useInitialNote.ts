import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import {
  NoteItemAttributes,
  RentalType,
  Structure,
  Direction,
  EvaluationFactor,
} from '../Interfaces';

export default function () {
  const result: NoteItemAttributes = {
    key: uuidv4(),
    address: '',
    map: null,
    rentalType: RentalType.Trading,
    deposit: 0,
    monthlyFee: 0,
    managementFee: 0,
    photoUri: [],
    roofFloor: new EvaluationFactor(
      '전체층',
      [...Array(40).keys()].map(f => `${f + 1}층`),
    ),
    floor: new EvaluationFactor(
      '해당층',
      ['반지하', '옥탑방'].concat([...Array(40).keys()].map(f => `${f + 1}층`)),
    ),
    roomStructure: new EvaluationFactor('구조', Object.values(Structure)),
    size: 5,
    options: [
      {name: '에어컨', available: false},
      {name: '냉장고', available: false},
      {name: '세탁기', available: false},
      {name: '가스레인지', available: false},
      {name: '인덕션', available: false},
      {name: '전자레인지', available: false},
      {name: '책상', available: false},
      {name: '책장', available: false},
      {name: '침대', available: false},
      {name: '옷장', available: false},
      {name: '신발장', available: false},
      {name: '싱크대', available: false},
    ],
    memo: '',
    realtorName: '',
    realtorTel: '',
    sturctureEvaluationFactors: [
      new EvaluationFactor('엘레베이터', ['있음', '없음']),
      new EvaluationFactor('주차', ['가능', '불가']),
      new EvaluationFactor('방향', Object.values(Direction)),
      new EvaluationFactor('채광', ['양호', '미흡']),
    ],
    environmentEvaluationFactors: [
      new EvaluationFactor('수압', ['양호', '미흡']),
      new EvaluationFactor('해충유무', ['양호', '미흡']),
      new EvaluationFactor('누수', ['양호', '미흡']),
      new EvaluationFactor('인테리어', ['양호', '미흡']),
      new EvaluationFactor('방음', ['양호', '미흡']),
      new EvaluationFactor('방범', ['양호', '미흡']),
    ],
  };
  return result;
}
