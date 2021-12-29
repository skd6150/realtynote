import React from 'react';
import {Pressable} from 'react-native';
import {NoteItemAttributes} from '../Interfaces';
import Card from './Card';

interface MotionlessCardProps {
  item: NoteItemAttributes;
  pressCallback: () => void;
  longPressCallback: () => void;
}

const MotionlessCard = ({
  longPressCallback,
  item,
  pressCallback,
}: MotionlessCardProps) => {
  return (
    <Pressable
      delayLongPress={100}
      onLongPress={longPressCallback}
      onPress={pressCallback}>
      <Card data={item} isEditMode={false} />
    </Pressable>
  );
};

export default MotionlessCard;
