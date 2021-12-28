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

interface RealtorProps {
  note: NoteItemAttributes;
  setNote: React.Dispatch<React.SetStateAction<NoteItemAttributes>>;
}

const Realtor = ({note, setNote}: RealtorProps) => {
  return (
    <KeyboardAvoidingView style={styles.cardWrapper} behavior="height">
      <View style={styles.row}>
        <Text style={styles.text16}>공인중개사</Text>
      </View>
      <View style={styles.row}>
        <Text style={[styles.label, styles.text14]}>상호명</Text>
        <View style={[styles.content, styles.textInputWrapper]}>
          <TextInput
            style={styles.textInput}
            value={note.realtorName}
            onChangeText={text => {
              setNote(
                produce(note, draft => {
                  draft.realtorName = text;
                }),
              );
            }}
          />
        </View>
      </View>
      <View style={styles.row}>
        <Text style={[styles.label, styles.text14]}>연락처</Text>
        <View style={[styles.content, styles.textInputWrapper]}>
          <TextInput
            style={styles.textInput}
            value={note.realtorTel}
            keyboardType="numeric"
            onChangeText={text => {
              text = text
                .replace(/[^0-9]/g, '')
                .split('')
                .map((n, idx) => {
                  if (idx === 3 || idx === 7) return '-' + n;
                  return n;
                })
                .join('');
              setNote(
                produce(note, draft => {
                  draft.realtorTel = text;
                }),
              );
            }}
          />
        </View>
      </View>
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

export default Realtor;
