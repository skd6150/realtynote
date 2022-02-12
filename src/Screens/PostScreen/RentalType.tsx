import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import produce from 'immer';
import {RentalType as IRentalType, NoteItemAttributes} from '../../Interfaces';
import {usePriceTextInput} from '../../Hooks';

interface RentalTypeProps {
  note: NoteItemAttributes;
  setNote: React.Dispatch<React.SetStateAction<NoteItemAttributes>>;
}

const RentalType = ({note, setNote}: RentalTypeProps) => {
  const segControlValues = [
    IRentalType.Trading,
    IRentalType.Rental,
    IRentalType.RentalMontlyFee,
  ];
  const [rentalType, setRentalType] = useState(note.rentalType);
  const [deposit, depositHandler] = usePriceTextInput('');
  const [monthlyFee, monthlyFeeHandler] = usePriceTextInput('');
  const [managementFee, managementFeeHandler] = usePriceTextInput('');
  useEffect(() => {
    setNote(
      produce(note, draft => {
        draft.deposit = deposit;
      }),
    );
  }, [deposit]);
  useEffect(() => {
    setNote(
      produce(note, draft => {
        draft.monthlyFee = monthlyFee;
      }),
    );
  }, [monthlyFee]);
  useEffect(() => {
    setNote(
      produce(note, draft => {
        draft.managementFee = managementFee;
      }),
    );
  }, [managementFee]);
  return (
    <KeyboardAvoidingView style={styles.cardWrapper} behavior="height">
      <View style={styles.row}>
        <Text style={[styles.label, styles.text16]}>임대조건</Text>
        <SegmentedControl
          style={styles.content}
          values={segControlValues}
          selectedIndex={segControlValues.findIndex(
            value => value === rentalType,
          )}
          onChange={event => {
            setRentalType(
              segControlValues[event.nativeEvent.selectedSegmentIndex],
            );
            setNote(
              produce(note, draft => {
                switch (event.nativeEvent.selectedSegmentIndex) {
                  case 0:
                    draft.rentalType = IRentalType.Trading;
                    break;
                  case 1:
                    draft.rentalType = IRentalType.Rental;
                    break;
                  case 2:
                    draft.rentalType = IRentalType.RentalMontlyFee;
                    break;
                }
              }),
            );
          }}
        />
      </View>
      <View style={styles.row}>
        {rentalType === IRentalType.Trading && (
          <Text style={[styles.label, styles.text14]}>매매가</Text>
        )}
        {rentalType !== IRentalType.Trading && (
          <Text style={[styles.label, styles.text14]}>보증금</Text>
        )}
        <View style={[styles.content, styles.textInputWrapper]}>
          <TextInput
            style={styles.textInput}
            keyboardType="numeric"
            value={note.deposit}
            placeholder="0"
            placeholderTextColor={'#000000'}
            onChangeText={depositHandler}
          />
          <View>
            <Text style={styles.text14}>원</Text>
          </View>
        </View>
      </View>
      {rentalType === IRentalType.RentalMontlyFee && (
        <View style={styles.row}>
          <Text style={[styles.label, styles.text14]}>월세</Text>
          <View style={[styles.content, styles.textInputWrapper]}>
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              value={note.monthlyFee}
              placeholder="0"
              placeholderTextColor={'#000000'}
              onChangeText={monthlyFeeHandler}
            />
            <View>
              <Text style={styles.text14}>원</Text>
            </View>
          </View>
        </View>
      )}
      {rentalType !== IRentalType.Trading && (
        <View style={styles.row}>
          <Text style={[styles.label, styles.text14]}>관리비</Text>
          <View style={[styles.content, styles.textInputWrapper]}>
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              value={note.managementFee}
              placeholder="0"
              placeholderTextColor={'#000000'}
              onChangeText={managementFeeHandler}
            />
            <View>
              <Text style={styles.text14}>원</Text>
            </View>
          </View>
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginHorizontal: 20,
    marginTop: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  row: {
    alignSelf: 'stretch',
    alignItems: 'center',
    flexDirection: 'row',
    margin: 10,
    paddingHorizontal: 6,
  },
  label: {
    flex: 3,
  },
  content: {
    flex: 7,
  },
  textInput: {
    height: 30,
    flex: 1,
    marginHorizontal: 15,
    paddingVertical: 0,
    paddingHorizontal: 10,
    textAlign: 'right',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#DDE1E5',
    backgroundColor: '#FBFBFB',
  },
  textInputWrapper: {
    alignSelf: 'stretch',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  text16: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666666',
  },
  text14: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
  },
});

export default RentalType;
