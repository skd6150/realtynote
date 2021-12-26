import {NoteItemAttributes, RentalType} from '../Interfaces';

export default function (item: NoteItemAttributes) {
  switch (item.rentalType) {
    case RentalType.Rental:
      return `${item.rentalType} ${item.deposit / 10000}`;
    case RentalType.RentalMontlyFee:
      return `${item.rentalType} ${item.deposit / 10000}/${
        item.monthlyFee / 10000
      }`;
    case RentalType.Trading:
      return `${item.rentalType} ${item.deposit / 10000}`;
  }
}
