import React, {useState, useEffect, useLayoutEffect} from 'react';
import {View, StyleSheet, FlatList, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import {MotionlessCard} from '../Components';
import {
  Group,
  NoteItemAttributes,
  MainScreenNavigationProps,
} from '../Interfaces';

interface Store {
  Group: Group[];
}

type MainScreenProps = {
  navigation: MainScreenNavigationProps;
};

const MainScreen = ({navigation}: MainScreenProps) => {
  const groups = useSelector<Store, Group[]>(state => state.Group);
  const [groupIdx, setGroupIdx] = useState(0);
  const [notes, setNotes] = useState<NoteItemAttributes[]>([]);
  useEffect(() => {
    setNotes(groups[groupIdx].list);
  }, [groups]);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: '',
    });
  });
  return (
    <View style={styles.wrapper}>
      <FlatList
        data={notes}
        renderItem={({item}) => (
          <MotionlessCard
            item={item}
            longPressCallback={() =>
              navigation.navigate('Edit', {groupKey: groups[groupIdx].key})
            }
            pressCallback={() =>
              navigation.navigate('Browse', {
                ...item,
                groupKey: groups[groupIdx].key,
              })
            }
          />
        )}
      />
      <Pressable
        style={styles.floatingButton}
        onPress={() => {
          navigation.navigate('Post', {groupKey: groups[groupIdx].key});
        }}>
        <Icon name="add" size={36} color="#FFFFFF" />
      </Pressable>
    </View>
  );
};

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

export default MainScreen;
