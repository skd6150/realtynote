import {NoteItemAttributes, RentalType} from '../Interfaces';

export default function (item: NoteItemAttributes) {
  switch (item.rentalType) {
    case RentalType.Rental:
      return `${item.rentalType} ${parseInt(item.deposit) / 10000}`;
    case RentalType.RentalMontlyFee:
      return `${item.rentalType} ${parseInt(item.deposit) / 10000}/${
        parseInt(item.monthlyFee) / 10000
      }`;
    case RentalType.Trading:
      return `${item.rentalType} ${parseInt(item.deposit) / 10000}`;
  }
}
