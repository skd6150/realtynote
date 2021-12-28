import React, {useRef} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {RNCamera} from 'react-native-camera';
import Icon from 'react-native-vector-icons/MaterialIcons';
import produce from 'immer';
import {NoteItemAttributes} from '../../Interfaces';

interface CameraModalProps {
  setCameraVisable: React.Dispatch<React.SetStateAction<boolean>>;
  setNote: React.Dispatch<React.SetStateAction<NoteItemAttributes>>;
  note: NoteItemAttributes;
}

const CameraModal = ({setCameraVisable, setNote, note}: CameraModalProps) => {
  const ref = useRef<RNCamera>(null);
  const takePhoto = async () => {
    if (ref.current) {
      const data = await ref.current.takePictureAsync({
        quality: 1,
      });
      if (data) {
        console.log(data);
        setNote(
          produce(note, draft => {
            draft.photoUri.concat(data.uri);
          }),
        );
      }
      goBack();
    }
  };
  const goBack = () => {
    setCameraVisable(false);
  };
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity style={styles.backButton} onPress={goBack}>
        <Icon name="arrow-back" size={36} color="#C4C4C4" />
      </TouchableOpacity>
      <RNCamera
        ref={ref}
        style={styles.camera}
        type={RNCamera.Constants.Type.back}
        captureAudio={false}
      />
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.button} onPress={takePhoto} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  camera: {
    alignSelf: 'stretch',
    flex: 8,
  },
  bottomBar: {
    height: 90,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    position: 'absolute',
    margin: 10,
    backgroundColor: 'transparent',
    zIndex: 999,
  },
});

export default CameraModal;
