import React, {Dispatch} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {NoteItemAttributes} from '../Interfaces';
import Card from './Card';

interface MotionlessCardProps {
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  item: NoteItemAttributes;
}

const MotionlessCard = ({setEditMode, item}: MotionlessCardProps) => {
  return (
    <Pressable
      delayLongPress={100}
      onLongPress={() => {
        setEditMode(prev => {
          return !prev;
        });
      }}>
      <Card data={item} isEditMode={false} />
    </Pressable>
  );
};

export default MotionlessCard;
