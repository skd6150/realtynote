import React from 'react';
import {Pressable} from 'react-native';
import {NoteItemAttributes} from '../Interfaces';
import Card from './Card';

interface MotionlessCardProps {
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  item: NoteItemAttributes;
  pressCallback: () => void;
}

const MotionlessCard = ({
  setEditMode,
  item,
  pressCallback,
}: MotionlessCardProps) => {
  return (
    <Pressable
      delayLongPress={100}
      onLongPress={() => {
        setEditMode(prev => {
          return !prev;
        });
      }}
      onPress={pressCallback}>
      <Card data={item} isEditMode={false} />
    </Pressable>
  );
};

export default MotionlessCard;
