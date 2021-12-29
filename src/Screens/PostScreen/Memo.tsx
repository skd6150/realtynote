import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import produce from 'immer';
import {NoteItemAttributes} from '../../Interfaces';

interface MemoProps {
  note: NoteItemAttributes;
  setNote: React.Dispatch<React.SetStateAction<NoteItemAttributes>>;
}

const Memo = ({note, setNote}: MemoProps) => {
  return (
    <KeyboardAvoidingView style={styles.cardWrapper} behavior="height">
      <View style={styles.row}>
        <Text style={styles.text16}>메모</Text>
      </View>
      <View style={[styles.textInputWrapper]}>
        <TextInput
          style={styles.textInput}
          value={note.memo}
          multiline={true}
          onChangeText={text => {
            setNote(
              produce(note, draft => {
                draft.memo = text;
              }),
            );
          }}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingTop: 8,
    paddingBottom: 20,
    marginHorizontal: 20,
    marginTop: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  row: {
    alignSelf: 'stretch',
    alignItems: 'center',
    flexDirection: 'row',
    margin: 10,
    paddingHorizontal: 6,
  },
  textInput: {
    minHeight: 120,
    flex: 1,
    marginHorizontal: 15,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#DDE1E5',
    backgroundColor: '#FBFBFB',
    textAlignVertical: 'top',
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
});

export default Memo;
