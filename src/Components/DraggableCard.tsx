import React from 'react';
import {Pressable} from 'react-native';
import Animated from 'react-native-reanimated';
import {RenderItemParams} from 'react-native-draggable-flatlist';
import {NoteItemAttributes} from '../Interfaces';
import Card from './Card';

const DraggableCard = ({item, drag}: RenderItemParams<NoteItemAttributes>) => {
  return (
    <Pressable delayLongPress={100} onLongPress={drag}>
      <Animated.View>
        <Card data={item} isEditMode={true} />
      </Animated.View>
    </Pressable>
  );
};

export default DraggableCard;
