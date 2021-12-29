import React, {useState, useRef} from 'react';
import {View, StyleSheet, Pressable, Text} from 'react-native';
import {
  FlatList as RNGHFlatList,
  gestureHandlerRootHOC,
} from 'react-native-gesture-handler';
import DraggableFlatList from 'react-native-draggable-flatlist';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import {DraggableCard} from '../Components';
import {NoteItemAttributes, EditScreenNavigationProps} from '../Interfaces';

interface Store {
  Note: NoteItemAttributes[];
}

type EditScreenProps = {
  navigation: EditScreenNavigationProps;
};

const EditScreen = gestureHandlerRootHOC(({navigation}: EditScreenProps) => {
  const notes = useSelector<Store, NoteItemAttributes[]>(state => state.Note);
  const [data, setData] = useState(notes);
  const ref = useRef<RNGHFlatList<NoteItemAttributes>>(null);
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
          navigation.goBack();
        }}>
        <View style={styles.delete}>
          <Icon name="delete" size={24} color="#666666" />
          <Text style={styles.deleteFont}>삭제</Text>
        </View>
      </Pressable>
    </View>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#F4F4F4',
    flex: 1,
  },
  flatListWrapper: {
    flex: 1,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#2196f3',
    justifyContent: 'center',
    alignItems: 'center',
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

export default EditScreen;
