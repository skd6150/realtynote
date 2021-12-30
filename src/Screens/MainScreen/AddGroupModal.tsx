import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable, TextInput} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Toast from 'react-native-toast-message';
import {addGroup} from '../../Redux/Actions/groupActions';
import {Group} from '../../Interfaces';

interface Store {
  Group: Group[];
}

interface AddGroupModalProps {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddGroupModal = ({setVisible}: AddGroupModalProps) => {
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const groups = useSelector<Store, Group[]>(state => state.Group);
  return (
    <View style={styles.background}>
      <View style={styles.wrapper}>
        <Text style={[styles.text16, styles.margin]}>그룹 추가</Text>
        <View style={[styles.textInputWrapper, styles.margin, styles.row]}>
          <Text>그룹이름 : </Text>
          <TextInput
            style={styles.textInput}
            value={name}
            placeholder="그룹 이름"
            onChangeText={text => setName(text)}
          />
        </View>
        <View style={styles.row}>
          <Pressable
            style={[styles.button, styles.cancelButton]}
            onPress={() => setVisible(false)}>
            <Text style={styles.textWhite}>취소</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.editButton]}
            onPress={() => {
              if (groups.length >= 5) {
                Toast.show({
                  type: 'error',
                  text1: '더이상 그룹을 만들 수 없습니다.',
                });
              } else {
                dispatch(addGroup(name));
              }
              setVisible(false);
            }}>
            <Text style={styles.textWhite}>추가</Text>
          </Pressable>
        </View>
      </View>
    </View>
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
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    height: 30,
    flex: 7,
    marginHorizontal: 15,
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
  },
  button: {
    flex: 3,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 10,
  },
  cancelButton: {
    backgroundColor: '#ffc107',
  },
  editButton: {
    backgroundColor: '#2196f3',
  },
  margin: {
    marginVertical: 5,
  },
  text16: {
    fontSize: 16,
  },
  textWhite: {
    color: '#FFFFFF',
  },
});

export default AddGroupModal;
