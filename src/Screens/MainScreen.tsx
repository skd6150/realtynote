import React, {useState, useRef} from 'react';
import {View, StyleSheet, FlatList, Pressable, Text} from 'react-native';
import {
  FlatList as RNGHFlatList,
  gestureHandlerRootHOC,
} from 'react-native-gesture-handler';
import DraggableFlatList from 'react-native-draggable-flatlist';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useSelector, useDispatch} from 'react-redux';
import {DraggableCard, MotionlessCard} from '../Components';
import {NoteItemAttributes} from '../Interfaces';

interface Store {
  Note: NoteItemAttributes[];
}

const MainScreen = gestureHandlerRootHOC(() => {
  const notes = useSelector<Store, NoteItemAttributes[]>(state => state.Note);
  const [data, setData] = useState(notes);
  const ref = useRef<RNGHFlatList<NoteItemAttributes>>(null);
  const [isEditMode, setEditMode] = useState(false);
  if (isEditMode) {
    return (
      <View style={styles.wrapper}>
        <View style={styles.flatListWrapper}>
          <DraggableFlatList
            ref={ref}
            data={data}
            onDragEnd={({data}) => setData(data)}
            keyExtractor={item => item.key}
            renderItem={({item, drag, isActive}) => (
              <DraggableCard item={item} drag={drag} isActive={isActive} />
            )}
          />
        </View>
        <Pressable
          onPress={() => {
            setEditMode(false);
          }}>
          <View style={styles.delete}>
            <Icon name="delete" size={24} color="#666666" />
            <Text style={styles.deleteFont}>삭제</Text>
          </View>
        </Pressable>
      </View>
    );
  } else {
    return (
      <View style={styles.wrapper}>
        <FlatList
          data={data}
          renderItem={({item}) => (
            <MotionlessCard item={item} setEditMode={setEditMode} />
          )}
        />
      </View>
    );
  }
});

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#F4F4F4',
    flex: 1,
  },
  flatListWrapper: {
    flex: 1,
  },
  delete: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    height: 55,
    backgroundColor: '#FFFFFF',
  },
  deleteFont: {
    fontSize: 12,
  },
});

export default MainScreen;
