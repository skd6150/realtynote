import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import DropDown from './DropDown';
import ToggleButton from './ToggleButton';
import {EvaluationFactor, NoteItemAttributes} from '../Interfaces';

interface EvaluationFactorProps {
  evaluationFactor: EvaluationFactor;
  valueChangeHandler?: (value: number) => void;
}

const EvaluationPicker = ({
  evaluationFactor,
  valueChangeHandler,
}: EvaluationFactorProps) => {
  return (
    <View>
      <Text style={styles.text}>{evaluationFactor.name}</Text>
      {evaluationFactor.evaluations.length <= 2 && (
        <ToggleButton
          evaluations={evaluationFactor.evaluations}
          index={evaluationFactor.idx}
          valueChangeHandler={valueChangeHandler}
        />
      )}
      {evaluationFactor.evaluations.length > 2 && (
        <DropDown
          evaluations={evaluationFactor.evaluations}
          index={evaluationFactor.idx}
          valueChangeHandler={valueChangeHandler}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#000000',
    marginBottom: 2,
  },
});

export default EvaluationPicker;
