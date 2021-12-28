import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import produce from 'immer';
import {EvaluationPicker, ToggleButton} from '../../Components';
import {NoteItemAttributes} from '../../Interfaces';

interface EnvironmentProps {
  note: NoteItemAttributes;
  setNote: React.Dispatch<React.SetStateAction<NoteItemAttributes>>;
}
const Environment = ({note, setNote}: EnvironmentProps) => {
  const valueChangeHandler = (index: number) => (value: number) => {
    setNote(
      produce(note, draft => {
        draft.environmentEvaluationFactors[index].idx = value;
      }),
    );
  };
  const optionChangeHandler = (index: number) => () => {
    setNote(
      produce(note, draft => {
        draft.options[index].available = !note.options[index].available;
      }),
    );
  };
  return (
    <View style={styles.cardWrapper}>
      <View style={styles.row}>
        <Text style={styles.text16}>옵션/환경</Text>
      </View>

      <Text style={[styles.text14, styles.label]}>옵션</Text>
      <View style={styles.optionList}>
        {note.options.map((factor, index) => {
          return (
            <View
              key={`environmentEvaluationFactors-${index}`}
              style={styles.optionWrapper}>
              <ToggleButton
                evaluations={[factor.name, factor.name]}
                index={factor.available ? 1 : 0}
                valueChangeHandler={optionChangeHandler(index)}
              />
            </View>
          );
        })}
      </View>

      <View style={styles.evaluationPickerList}>
        {note.environmentEvaluationFactors.map((factor, index) => {
          return (
            <View
              key={`environmentEvaluationFactors-${index}`}
              style={styles.evaluationPickerWrapper}>
              <EvaluationPicker
                evaluationFactor={factor}
                valueChangeHandler={valueChangeHandler(index)}
              />
            </View>
          );
        })}
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
    // alignItems: 'center',
  },
  row: {
    alignSelf: 'stretch',
    alignItems: 'center',
    flexDirection: 'row',
    margin: 10,
    paddingHorizontal: 6,
    marginBottom: 20,
  },
  evaluationPickerList: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  optionList: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    paddingHorizontal: 8,
    marginBottom: 20,
  },
  evaluationPickerWrapper: {
    width: '50%',
    padding: 10,
  },
  optionWrapper: {
    width: '33%',
    padding: 2,
  },
  label: {
    marginLeft: 10,
  },
  text16: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666666',
  },
  text14: {
    fontSize: 14,
    color: '#000000',
  },
});

export default Environment;
