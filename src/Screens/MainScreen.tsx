import React, {useState, useRef} from 'react';
import {View, StyleSheet, FlatList, Pressable} from 'react-native';
import {
  FlatList as RNGHFlatList,
  gestureHandlerRootHOC,
} from 'react-native-gesture-handler';
import DraggableFlatList from 'react-native-draggable-flatlist';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {DraggableCard, MotionlessCard} from '../Components';
import {NoteItemAttributes} from '../Interfaces';

import {Structure, RentalType} from '../Interfaces';
function getData(): NoteItemAttributes[] {
  return [...Array(5)].map((d, index) => {
    return {
      key: JSON.stringify(index),
      address: '용현동 123',
      deposit: 40000000,
      floor: 3,
      map: null,
      monthlyFee: 300000,
      numberOfRoom: 1,
      photoUri: ['uri'],
      rentalType: RentalType.RentalMontlyFee,
      size: 33,
      agentName: '부동산 이름',
      agentTel: '010-1234-1234',
      evaluationFactors: [],
      managementFee: 0,
      roomStructure: Structure.OneOpen,
      memo: '',
      options: [],
    };
  });
}

const MainScreen = gestureHandlerRootHOC(() => {
  const [data, setData] = useState(getData());
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
});

export default MainScreen;
