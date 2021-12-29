import React from 'react';
import {Pressable} from 'react-native';
import Animated from 'react-native-reanimated';
import {RenderItemParams} from 'react-native-draggable-flatlist';
import {NoteItemAttributes} from '../Interfaces';
import Card from './Card';

type DraggableCardProps = {
  checkCallback?: (props: any) => any;
} & RenderItemParams<NoteItemAttributes>;

const DraggableCard = ({item, drag, checkCallback}: DraggableCardProps) => {
  return (
    <Pressable delayLongPress={100} onLongPress={drag}>
      <Animated.View>
        <Card data={item} isEditMode={true} checkCallback={checkCallback} />
      </Animated.View>
    </Pressable>
  );
};

export default DraggableCard;
