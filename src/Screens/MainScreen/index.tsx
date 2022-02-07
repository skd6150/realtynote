import React, {useState, useEffect, useLayoutEffect} from 'react';
import {View, StyleSheet, FlatList, Pressable, Modal} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import {MotionlessCard} from '../../Components';
import {
  Group,
  NoteItemAttributes,
  MainScreenNavigationProps,
} from '../../Interfaces';
import GroupPicker from './GroupPicker';
import GroupEditModal from './GroupEditModal';
import GroupAddModal from './GroupAddModal';

import {getInitialNote} from '../../Utils';

interface Store {
  Group: Group[];
}

type MainScreenProps = {
  navigation: MainScreenNavigationProps;
};

const MainScreen = ({navigation}: MainScreenProps) => {
  const groups = useSelector<Store, Group[]>(state => state.Group);
  const [activeGroupIdx, setActiveGroupIdx] = useState(0);
  const [notes, setNotes] = useState<NoteItemAttributes[]>([]);
  const [groupPickerVisible, setGroupPickerVisible] = useState(false);
  const [editModalActive, setEditModalActive] = useState<number | boolean>(
    false,
  );
  const [addModalVisible, setAddModalVisible] = useState(false);

  const editGroupHandler = (idx: number) => {
    setEditModalActive(idx);
    setGroupPickerVisible(false);
  };

  const addGroupHandler = () => {
    setAddModalVisible(true);
    setGroupPickerVisible(false);
  };

  useEffect(() => {
    if (groups.length === 0) setNotes([]);
    else setNotes(groups[activeGroupIdx].list);
  }, [groups, activeGroupIdx]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <GroupPicker
          visible={groupPickerVisible}
          setVisible={setGroupPickerVisible}
          groups={groups}
          index={activeGroupIdx}
          changeGroupHandler={idx => setActiveGroupIdx(idx)}
          editGroupHandler={editGroupHandler}
          addGroupHandler={addGroupHandler}
        />
      ),
      title: '',
    });
  });
  return (
    <View style={styles.wrapper}>
      <Modal
        visible={editModalActive !== false}
        transparent={true}
        onRequestClose={() => setEditModalActive(false)}>
        <GroupEditModal
          group={groups[editModalActive as number]}
          setVisible={setEditModalActive}
          activeGroupKey={groups[activeGroupIdx].key}
          setActiveGroupIdx={setActiveGroupIdx}
        />
      </Modal>
      <Modal
        visible={addModalVisible}
        transparent={true}
        onRequestClose={() => setAddModalVisible(false)}>
        <GroupAddModal setVisible={setAddModalVisible} />
      </Modal>
      <FlatList
        data={notes}
        renderItem={({item}) => (
          <MotionlessCard
            item={item}
            longPressCallback={() =>
              navigation.navigate('Edit', {
                groupKey: groups[activeGroupIdx].key,
              })
            }
            pressCallback={() =>
              navigation.navigate('Browse', {
                note: item,
                groupKey: groups[activeGroupIdx].key,
              })
            }
          />
        )}
      />
      <Pressable
        style={styles.floatingButton}
        onPress={() => {
          getInitialNote().then(note => {
            navigation.navigate('Post', {
              note,
              groupKey: groups[activeGroupIdx].key,
              isNew: true,
            });
          });
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
