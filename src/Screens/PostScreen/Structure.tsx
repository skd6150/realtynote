import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import produce from 'immer';
import {EvaluationPicker} from '../../Components';
import {NoteItemAttributes} from '../../Interfaces';

const coef = 3.30579;
const regex: RegExp = /d*[.]\d{3}$/;

interface StructureProps {
  note: NoteItemAttributes;
  setNote: React.Dispatch<React.SetStateAction<NoteItemAttributes>>;
}
const Structure = ({note, setNote}: StructureProps) => {
  const [pyung, setPyung] = useState(note.size);
  const [squareMeter, setSquareMeter] = useState(
    note.size ? (parseFloat(pyung) * coef).toFixed(2) : '',
  );
  useEffect(() => {
    setNote(
      produce(note, draft => {
        draft.size = pyung;
      }),
    );
  }, [pyung]);
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
      <Text style={[styles.title, styles.text16]}>구조/면적</Text>

      <View style={styles.evaluationPickerList}>
        <View style={styles.evaluationPickerWrapper}>
          <Text style={styles.label}>전용면적(평)</Text>
          <View style={styles.row}>
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              value={pyung}
              placeholder="0"
              placeholderTextColor={'#000000'}
              onChangeText={text => {
                if (text[0] == '0' || regex.test(text)) return;
                setPyung(text);
                setSquareMeter((parseFloat(text) * coef).toFixed(2));
              }}
            />
            <Text style={styles.text14}>평</Text>
          </View>
        </View>
        <View style={styles.evaluationPickerWrapper}>
          <Text style={styles.label}>{`전용면적(m\xB2)`}</Text>
          <View style={styles.row}>
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              value={squareMeter}
              placeholder="0"
              placeholderTextColor={'#000000'}
              onChangeText={text => {
                if (text[0] == '0' || regex.test(text)) return;
                setSquareMeter(text);
                setPyung((parseFloat(text) / coef).toFixed(2));
              }}
            />
            <Text style={styles.text14}>{`m\xB2`}</Text>
          </View>
        </View>
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
    zIndex: 2,
  },
  title: {
    margin: 10,
    paddingHorizontal: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
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
  textInput: {
    height: 30,
    flex: 1,
    marginRight: 5,
    paddingVertical: 0,
    paddingHorizontal: 10,
    textAlign: 'right',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#DDE1E5',
    backgroundColor: '#FBFBFB',
  },
  label: {
    color: '#000000',
    marginBottom: 2,
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
