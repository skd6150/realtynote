import React from 'react';
import {View, Text, StyleSheet, Pressable, Image} from 'react-native';
import {NoteItemAttributes} from '../../Interfaces';

interface PhotoProps {
  note: NoteItemAttributes;
  setCameraVisable: React.Dispatch<React.SetStateAction<boolean>>;
}

const Photo = ({note, setCameraVisable}: PhotoProps) => {
  return (
    <View style={styles.cardWrapper}>
      <View style={styles.row}>
        <Text style={styles.text16}>사진</Text>
        <Pressable
          style={styles.button}
          onPress={() => {
            setCameraVisable(true);
          }}>
          <Text style={styles.buttonText}>추가</Text>
        </Pressable>
      </View>
      <View style={styles.imageList}>
        {note.photoUri.map((uri, index) => (
          <View key={`photo-${index}`} style={styles.imageWrapper}>
            <Image style={styles.image} source={{uri}} />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginHorizontal: 20,
    marginTop: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  row: {
    alignSelf: 'stretch',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    paddingHorizontal: 6,
  },
  button: {
    width: 80,
    height: 30,
    backgroundColor: '#2196f3',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: '#FFFFFF',
  },
  imageList: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    padding: 10,
  },
  imageWrapper: {
    width: '25%',
    aspectRatio: 1,
    padding: 5,
  },
  image: {
    flex: 1,
  },
  text16: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666666',
  },
  text14: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
  },
});

export default Photo;
