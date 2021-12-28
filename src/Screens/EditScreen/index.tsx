import React, {useState} from 'react';
import {View, Text, ScrollView, Modal} from 'react-native';
import {useInitialNote} from '../../Hooks';
import Address from './Address';
import RentalType from './RentalType';
import Photo from './Photo';
import CameraModal from './CameraModal';
import Structure from './Structure';
import Environment from './Environment';
import Realtor from './Realtor';
import Memo from './Memo';
import {
  EditScreenNavigationProps,
  EditScreenRouteProps,
} from '../../Interfaces';

type EditScreenProps = {
  navigation: EditScreenNavigationProps;
  route: EditScreenRouteProps;
};

const EditScreen = ({navigation, route}: EditScreenProps) => {
  const [note, setNote] = useState(useInitialNote());
  const [cameraVisable, setCameraVisable] = useState(false);
  return (
    <ScrollView nestedScrollEnabled={true}>
      <Modal visible={cameraVisable} animationType="slide">
        <CameraModal
          setCameraVisable={setCameraVisable}
          setNote={setNote}
          note={note}
        />
      </Modal>
      <View
        style={{
          alignSelf: 'stretch',
          height: 240,
          backgroundColor: '#C4C4C4',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text>지도</Text>
      </View>
      <Address note={note} />
      <RentalType note={note} setNote={setNote} />
      <Photo note={note} setCameraVisable={setCameraVisable} />
      <Structure note={note} setNote={setNote} />
      <Environment note={note} setNote={setNote} />
      <Realtor note={note} setNote={setNote} />
      <Memo note={note} setNote={setNote} />
    </ScrollView>
  );
};

export default EditScreen;
