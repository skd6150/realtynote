import React from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';

interface HeaderButtonProps {
  label: string;
  callback?: (prop: any) => any;
}

const HeaderButton = ({label, callback}: HeaderButtonProps) => {
  return (
    <Pressable onPress={callback}>
      <Text style={{fontSize: 16, color: '#000000', margin: 10}}>{label}</Text>
    </Pressable>
  );
};

export default HeaderButton;
