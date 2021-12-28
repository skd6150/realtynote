import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import produce from 'immer';
import {EvaluationPicker} from '../../Components';
import {NoteItemAttributes} from '../../Interfaces';

interface StructureProps {
  note: NoteItemAttributes;
  setNote: React.Dispatch<React.SetStateAction<NoteItemAttributes>>;
}
const Structure = ({note, setNote}: StructureProps) => {
  const valueChangeHandler = (index: number) => (value: number) => {
    setNote(
      produce(note, draft => {
        draft.sturctureEvaluationFactors[index].idx = value;
      }),
    );
  };
  const rootFloorChangeHandler = (value: number) => {
    setNote(
      produce(note, draft => {
        draft.roofFloor.idx = value;
      }),
    );
  };
  const floorChangeHandler = (value: number) => {
    setNote(
      produce(note, draft => {
        draft.floor.idx = value;
      }),
    );
  };
  const roomStructureChangeHandler = (value: number) => {
    setNote(
      produce(note, draft => {
        draft.roomStructure.idx = value;
      }),
    );
  };
  return (
    <View style={styles.cardWrapper}>
      <View style={styles.row}>
        <Text style={styles.text16}>구조/면적</Text>
      </View>

      <View style={styles.evaluationPickerList}>
        <View style={styles.evaluationPickerWrapper}>
          <EvaluationPicker
            evaluationFactor={note.roofFloor}
            valueChangeHandler={rootFloorChangeHandler}
          />
        </View>
        <View style={styles.evaluationPickerWrapper}>
          <EvaluationPicker
            evaluationFactor={note.floor}
            valueChangeHandler={floorChangeHandler}
          />
        </View>
        <View style={styles.evaluationPickerWrapper}>
          <EvaluationPicker
            evaluationFactor={note.roomStructure}
            valueChangeHandler={roomStructureChangeHandler}
          />
        </View>
      </View>

      <View style={styles.evaluationPickerList}>
        {note.sturctureEvaluationFactors.map((factor, index) => {
          return (
            <View
              key={`sturctureEvaluationFactors-${index}`}
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
    alignItems: 'center',
    zIndex: 2,
  },
  row: {
    alignSelf: 'stretch',
    alignItems: 'center',
    flexDirection: 'row',
    margin: 10,
    paddingHorizontal: 6,
  },
  evaluationPickerList: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  evaluationPickerWrapper: {
    width: '50%',
    padding: 10,
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

export default Structure;
