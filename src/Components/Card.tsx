import React, {useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {RadioButton} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {stringfyRentalType} from '../Utils';
import {NoteItemAttributes} from '../Interfaces';

interface CardProps {
  data: NoteItemAttributes;
  isEditMode: boolean;
  checkCallback?: (props: any) => any;
}

const Card: React.FC<CardProps> = ({
  data,
  isEditMode,
  checkCallback,
}: CardProps) => {
  const [checked, setChecked] = useState(false);

  return (
    <View style={styles.cardWrapper}>
      {isEditMode && (
        <View style={styles.buttonWrapper}>
          <RadioButton
            value="delete"
            status={checked ? 'checked' : 'unchecked'}
            color="#2196f3"
            onPress={() => {
              if (checkCallback) checkCallback(!checked);
              setChecked(prev => {
                return !prev;
              });
            }}
          />
        </View>
      )}
      {data.photoUri.length == 0 ? (
        <View style={styles.noImage}>
          <Icon name="image-not-supported" size={32} color={'#666666'} />
        </View>
      ) : (
        <Image source={{uri: data.photoUri[0]}} style={styles.image} />
      )}
      <View style={styles.textWrapper}>
        <View>
          <Text style={styles.text18}>{stringfyRentalType(data)}</Text>
          <Text style={[styles.text14, styles.address]}>
            {data.map.address}
          </Text>
        </View>
        <Text style={styles.text14}>
          {data.floor.evaluations[data.floor.idx]} {data.size}평{' '}
          {data.roomStructure.evaluations[data.roomStructure.idx]}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    flexDirection: 'row',
    height: 120,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginVertical: 12,
    borderRadius: 10,
  },
  noImage: {
    width: 90,
    height: 90,
    backgroundColor: '#C4C4C4',
    borderRadius: 10,
    margin: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  address: {
    maxHeight: 40,
    overflow: 'hidden',
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 10,
    margin: 15,
  },
  textWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    margin: 15,
    paddingVertical: 2,
  },
  buttonWrapper: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 10,
  },
  text18: {
    fontSize: 18,
    color: '#000000',
    fontWeight: '600',
    marginBottom: 5,
  },
  text14: {
    color: '#000000',
    fontSize: 14,
  },
});

export default Card;
