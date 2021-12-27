import {
  NoteItemAttributes,
  RentalType,
  Structure,
  EvaluationFactor,
} from '../Interfaces';

export default function () {
  const result: NoteItemAttributes = {
    key: '0',
    address: '',
    map: null,
    rentalType: RentalType.Trading,
    deposit: 0,
    monthlyFee: 0,
    managementFee: 0,
    photoUri: [],
    floor: 1,
    roomStructure: Structure.OneOpen,
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
    sturctureEvaluationFactors: [
      new EvaluationFactor('엘레베이터', ['있음', '없음']),
      new EvaluationFactor('주차', ['가능', '불가']),
      new EvaluationFactor('방향', ['북향', '동향', '남향', '서향']),
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
