import React, {useState} from 'react';
import {View, StyleSheet, Text, Pressable} from 'react-native';
import {EvaluationFactor} from '../Interfaces';

interface DropDwonProps {
  evaluations: string[];
  index: number;
  valueChangeHandler?: (value: number) => void;
}

const ToggleButton = ({
  evaluations,
  index,
  valueChangeHandler,
}: DropDwonProps) => {
  const [idx, setIdx] = useState(index);
  return (
    <Pressable
      style={idx === 1 ? [styles.picker, styles.positive] : styles.picker}
      onPress={() => {
        if (valueChangeHandler) {
          valueChangeHandler(idx === 1 ? 0 : 1);
        }
        setIdx(idx === 1 ? 0 : 1);
      }}>
      {idx === 1 && (
        <Text style={[styles.text, styles.positiveText]}>{evaluations[0]}</Text>
      )}
      {idx !== 1 && <Text style={styles.text}>{evaluations[1]}</Text>}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  picker: {
    height: 30,
    borderWidth: 1,
    borderColor: '#DDE1E5',
    borderRadius: 10,
    backgroundColor: '#FBFBFB',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  positive: {
    backgroundColor: '#2196f3',
  },
  text: {
    color: '#000000',
    fontSize: 14,
  },
  positiveText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
});

export default ToggleButton;
