import React, {useState} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {NoteItemAttributes, RentalType} from '../Interfaces';

interface CardProps {
  data: NoteItemAttributes;
  isEditMode: boolean;
}

const Card: React.FC<CardProps> = (props: CardProps) => {
  const [checked, setChecked] = useState(false);

  const StringfyRentalType = (item: NoteItemAttributes) => {
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
  };

  return (
    <View style={styles.cardWrapper}>
      {props.isEditMode && (
        <View style={styles.buttonWrapper}>
          <RadioButton
            value="delete"
            status={checked ? 'checked' : 'unchecked'}
            color="#2196f3"
            onPress={() =>
              setChecked(prev => {
                return !prev;
              })
            }
          />
        </View>
      )}
      <View style={styles.noImage} />
      <View style={styles.textWrapper}>
        <Text style={styles.text18}>{StringfyRentalType(props.data)}</Text>
        <Text style={styles.text14}>{props.data.address}</Text>
        <Text style={styles.text14}>
          {props.data.floor}층 {props.data.size}평
        </Text>
        <Text style={styles.text14}>{props.data.roomStructure}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    flexDirection: 'row',
    height: 120,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginVertical: 12,
    borderRadius: 10,
  },
  noImage: {
    width: 90,
    height: 90,
    backgroundColor: '#C4C4C4',
    borderRadius: 10,
    margin: 15,
  },
  textWrapper: {
    flexDirection: 'column',
    padding: 15,
  },
  buttonWrapper: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 10,
  },
  text18: {
    fontSize: 18,
    color: '#000000',
    fontWeight: '600',
    marginBottom: 5,
  },
  text14: {
    color: '#000000',
    fontSize: 14,
  },
});

export default Card;
