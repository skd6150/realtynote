import React, {useState, useEffect, useLayoutEffect} from 'react';
import {View, StyleSheet, FlatList, Pressable, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import {MotionlessCard} from '../Components';
import {NoteItemAttributes, MainScreenNavigationProps} from '../Interfaces';

interface Store {
  Note: NoteItemAttributes[];
}

type MainScreenProps = {
  navigation: MainScreenNavigationProps;
};

const MainScreen = ({navigation}: MainScreenProps) => {
  const notes = useSelector<Store, NoteItemAttributes[]>(state => state.Note);
  const [data, setData] = useState<NoteItemAttributes[]>([]);
  useEffect(() => {
    setData(notes);
  }, [notes]);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: '',
    });
  });
  return (
    <View style={styles.wrapper}>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <MotionlessCard
            item={item}
            longPressCallback={() => navigation.navigate('Edit')}
            pressCallback={() => navigation.navigate('Browse', item)}
          />
        )}
      />
      <Pressable
        style={styles.floatingButton}
        onPress={() => {
          navigation.navigate('Post');
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
