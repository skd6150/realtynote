import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import produce from 'immer';
import Toast from 'react-native-toast-message';
import {NoteItemAttributes, Address} from '../../Interfaces';
import {geocoder} from '../../Utils';

interface AddressModalProps {
  setAddressModalVisable: React.Dispatch<React.SetStateAction<boolean>>;
  setNote: React.Dispatch<React.SetStateAction<NoteItemAttributes>>;
  note: NoteItemAttributes;
}

interface ListItemProps {
  item: Address;
  callback: (address: Address) => void;
}

const ListItem = ({item, callback}: ListItemProps) => {
  return (
    <Pressable style={styles.listItemWrapper} onPress={() => callback(item)}>
      <Icon name="place" size={16} />
      <Text style={styles.ListItemText}>{item.address}</Text>
    </Pressable>
  );
};

const ListSeparator = () => {
  return <View style={styles.separator} />;
};

const AddressModal = ({
  setAddressModalVisable,
  setNote,
  note,
}: AddressModalProps) => {
  const [address, setAddress] = useState('');
  const [list, setList] = useState<Address[]>([]);
  const search = async () => {
    const searchResult = await geocoder(address);
    if (searchResult.length === 0)
      Toast.show({type: 'error', text1: '검색된 결과가 없습니다.'});
    else setList(searchResult);
  };
  const changeAddress = (address: Address) => {
    setNote(
      produce(note, draft => {
        draft.map = address;
      }),
    );
    setAddressModalVisable(false);
  };
  return (
    <KeyboardAvoidingView style={styles.background} behavior="height">
      <View style={styles.wrapper}>
        <Text style={[styles.text16, styles.margin]}>주소 검색</Text>
        <View style={styles.row}>
          <TextInput
            style={styles.textInput}
            value={address}
            placeholder="주소"
            onChangeText={text => setAddress(text)}
          />
          <Pressable
            style={[styles.button, styles.searchButton]}
            onPress={() => search()}>
            <Text style={styles.textWhite}>검색</Text>
          </Pressable>
        </View>
        <FlatList
          data={list}
          renderItem={({item}) => (
            <ListItem item={item} callback={changeAddress} />
          )}
          ItemSeparatorComponent={ListSeparator}
          style={styles.flatlist}
        />
        <Pressable
          style={[styles.button, styles.cancelButton]}
          onPress={() => setAddressModalVisable(false)}>
          <Text style={styles.textWhite}>취소</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    width: '80%',
    height: '60%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  flatlist: {
    flex: 8,
    alignSelf: 'stretch',
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  listItemWrapper: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  ListItemText: {
    flex: 1,
    marginHorizontal: 5,
  },
  separator: {
    alignSelf: 'stretch',
    height: 1,
    backgroundColor: '#DDE1E5',
    margin: 10,
  },
  textInput: {
    flex: 4,
    marginHorizontal: 5,
    paddingVertical: 0,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#DDE1E5',
    backgroundColor: '#FBFBFB',
  },
  textInputWrapper: {
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    height: 40,
  },
  button: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    borderRadius: 10,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#ffc107',
  },
  searchButton: {
    flex: 1,
    backgroundColor: '#2196f3',
  },
  margin: {
    marginTop: 5,
    marginBottom: 15,
  },
  text16: {
    fontSize: 16,
  },
  textWhite: {
    color: '#FFFFFF',
  },
});

export default AddressModal;
