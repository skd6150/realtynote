import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {NoteItemAttributes} from '../../Interfaces';

interface AddressProps {
  note: NoteItemAttributes;
}

const Address = ({note}: AddressProps) => {
  return (
    <View style={styles.cardWrapper}>
      <View style={styles.row}>
        <Text style={[styles.label, styles.text16]}>주소</Text>
        <Text style={[styles.content, styles.text14]}>{note.address}</Text>
      </View>
    </View>
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

export default Address;
