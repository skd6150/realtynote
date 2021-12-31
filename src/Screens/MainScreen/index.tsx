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
import EditGroupModal from './EditGroupModal';
import AddGroupModal from './AddGroupModal';

import {useInitialNote} from '../../Hooks';

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
  const [menuVisible, setMenuVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(-1);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const changeGroupHandler = (idx: number) => {
    setEditModalVisible(idx);
    setMenuVisible(false);
  };
  const addGroupHandler = () => {
    setAddModalVisible(true);
    setMenuVisible(false);
  };
  useEffect(() => {
    if (groups.length === 0) setNotes([]);
    else setNotes(groups[groupIdx].list);
  }, [groups, groupIdx]);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <GroupPicker
          visible={menuVisible}
          setVisible={setMenuVisible}
          groups={groups}
          index={groupIdx}
          changeGroupHandler={idx => setGroupIdx(idx)}
          editGroupHandler={changeGroupHandler}
          addGroupHandler={addGroupHandler}
        />
      ),
      title: '',
    });
  });
  return (
    <View style={styles.wrapper}>
      <Modal
        visible={editModalVisible !== -1}
        transparent={true}
        onRequestClose={() => setEditModalVisible(-1)}>
        <EditGroupModal
          group={groups[editModalVisible]}
          setVisible={setEditModalVisible}
        />
      </Modal>
      <Modal
        visible={addModalVisible}
        transparent={true}
        onRequestClose={() => setAddModalVisible(false)}>
        <AddGroupModal setVisible={setAddModalVisible} />
      </Modal>
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
          useInitialNote().then(note => {
            navigation.navigate('Post', {
              note,
              groupKey: groups[groupIdx].key,
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
