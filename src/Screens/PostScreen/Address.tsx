import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {NoteItemAttributes} from '../../Interfaces';

interface AddressProps {
  setAddressModalVisable: React.Dispatch<React.SetStateAction<boolean>>;
  note: NoteItemAttributes;
}

const Address = ({note, setAddressModalVisable}: AddressProps) => {
  return (
    <View style={styles.cardWrapper}>
      <View style={styles.row}>
        <Text style={[styles.label, styles.text16]}>주소</Text>
        <Pressable
          style={styles.content}
          onPress={() => {
            setAddressModalVisable(true);
          }}>
          <Text style={styles.text14}>
            {`${note.map.address} `}
            <Icon name="search" style={styles.search} />
          </Text>
        </Pressable>
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
  search: {
    fontSize: 12,
    marginLeft: 5,
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
