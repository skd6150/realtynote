import {Address} from '.';

export enum RentalType {
  Trading = '매매',
  RentalMontlyFee = '월세',
  Rental = '전세',
}

export enum Direction {
  None = '측정안함',
  North = '북향',
  East = '동향',
  South = '남향',
  West = '서향',
  NorthEast = '동북향',
  SouthEast = '동남향',
  NorthWest = '북서향',
  SouthWest = '남서향',
}

export enum Structure {
  OneOpen = '오픈형 원룸',
  OneDiv = '분리형 원룸',
  Loft = '복층형 원룸',
  Two = '투룸',
  Three = '쓰리룸',
  Four = '포룸+',
}

interface Option {
  name: string;
  available: boolean;
}

export class EvaluationFactor {
  name: string;
  evaluations: string[];
  idx: number;

  constructor(name: string, evaluatoins: string[], idx = 0) {
    this.name = name;
    this.evaluations = evaluatoins;
    this.idx = idx;
  }
}

export interface NoteItemAttributes {
  key: string;
  map: Address; // 네이버 지도 api
  rentalType: RentalType; // 임대조건
  deposit: string; // 보증금 or 매매가
  monthlyFee: string; // 월세
  managementFee: string; // 관리비
  photoUri: string[]; // 사진 URI
  roofFloor: EvaluationFactor; // 전체층
  floor: EvaluationFactor; // 해당층
  roomStructure: EvaluationFactor; // 방 개수
  size: string; // 전용면적 (평)
  direction?: Direction; // 방향
  options: Option[]; // 옵션
  realtorName: string; // 공인중개사 상호명
  realtorTel: string; // 공인중개사 연락처
  memo: string; // 메모
  sturctureEvaluationFactors: EvaluationFactor[]; // 구조평가요소
  environmentEvaluationFactors: EvaluationFactor[]; // 환경평가요소
}
