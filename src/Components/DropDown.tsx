import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {EvaluationFactor} from '../Interfaces';

interface DropDwonProps {
  evaluations: string[];
  index: number;
  valueChangeHandler?: (value: number) => void;
}

const DropDown = ({evaluations, index, valueChangeHandler}: DropDwonProps) => {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(index);
  const [items, setItems] = useState(
    evaluations.map((factor, idx) => {
      return {
        label: factor,
        value: idx,
      };
    }),
  );
  useEffect(() => {
    if (valueChangeHandler) {
      valueChangeHandler(idx);
    }
  }, [idx]);
  return (
    <DropDownPicker
      listMode="SCROLLVIEW"
      scrollViewProps={{
        nestedScrollEnabled: true,
      }}
      props={{
        activeOpacity: 1,
      }}
      open={open}
      value={idx}
      items={items}
      setOpen={setOpen}
      setValue={idx => {
        setIdx(idx);
      }}
      setItems={setItems}
      style={styles.picker}
      dropDownContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  picker: {
    height: 30,
    borderWidth: 1,
    borderColor: '#DDE1E5',
    borderRadius: 10,
    backgroundColor: '#FBFBFB',
  },
  container: {
    backgroundColor: '#FBFBFB',
    borderColor: '#DDE1E5',
    borderRadius: 10,
    zIndex: 9999,
  },
});

export default DropDown;
