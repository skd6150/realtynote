import React, {useState, useRef, useLayoutEffect, useEffect} from 'react';
import {View, StyleSheet, Pressable, Text} from 'react-native';
import {
  FlatList as RNGHFlatList,
  gestureHandlerRootHOC,
} from 'react-native-gesture-handler';
import DraggableFlatList from 'react-native-draggable-flatlist';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useSelector, useDispatch} from 'react-redux';
import {HeaderRight, DraggableCard} from '../Components';
import {NoteItemAttributes, EditScreenNavigationProps} from '../Interfaces';
import {rearrangeNotes, delNote} from '../Redux/Actions/noteActions';

interface Store {
  Note: NoteItemAttributes[];
}

type EditScreenProps = {
  navigation: EditScreenNavigationProps;
};

const EditScreen = gestureHandlerRootHOC(({navigation}: EditScreenProps) => {
  const notes = useSelector<Store, NoteItemAttributes[]>(state => state.Note);
  const [data, setData] = useState<NoteItemAttributes[]>(notes);
  const ref = useRef<RNGHFlatList<NoteItemAttributes>>(null);
  const dispatch = useDispatch();
  const checked = notes.map(note => {
    return {
      key: note.key,
      checked: false,
    };
  });
  const checkCallback = (key: string) => (value: boolean) => {
    const idx = checked.findIndex(note => note.key === key);
    checked[idx].checked = value;
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderRight
          label="저장"
          callback={() => {
            navigation.goBack();
          }}
        />
      ),
      headerLeft: () => React.Fragment,
    });
  });
  return (
    <View style={styles.wrapper}>
      <View style={styles.flatListWrapper}>
        <DraggableFlatList
          ref={ref}
          data={data}
          onDragEnd={({data}) => setData(data)}
          keyExtractor={item => item.key}
          renderItem={({item, drag, isActive}) => (
            <DraggableCard
              item={item}
              drag={drag}
              isActive={isActive}
              checkCallback={checkCallback(item.key)}
            />
          )}
        />
      </View>
      <Pressable
        onPress={() => {
          dispatch(rearrangeNotes(data));
          checked
            .filter(note => note.checked === true)
            .forEach(note => {
              dispatch(delNote(note.key));
            });
          navigation.goBack();
        }}>
        <View style={styles.delete}>
          <Icon name="delete" size={24} color="#FFFFFF" />
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
    backgroundColor: '#dc3546',
  },
  deleteFont: {
    fontSize: 12,
    color: '#FFFFFF',
  },
});

export default EditScreen;
