import React, {useState, useLayoutEffect, useEffect} from 'react';
import {View, Text, ScrollView, Modal} from 'react-native';
import {useDispatch} from 'react-redux';
import {useValidate} from '../../Hooks';
import {HeaderRight} from '../../Components';
import {addNote, updateNote} from '../../Redux/Actions/noteActions';
import Map from './Map';
import Address from './Address';
import RentalType from './RentalType';
import Photo from './Photo';
import CameraModal from './CameraModal';
import Structure from './Structure';
import Environment from './Environment';
import Realtor from './Realtor';
import Memo from './Memo';
import {
  PostScreenNavigationProps,
  PostScreenRouteProps,
} from '../../Interfaces';

type PostScreenProps = {
  navigation: PostScreenNavigationProps;
  route: PostScreenRouteProps;
};

const PostScreen = ({navigation, route}: PostScreenProps) => {
  const [note, setNote] = useState(route.params.note);
  const [cameraVisable, setCameraVisable] = useState(false);
  const dispatch = useDispatch();
  const save = () => {
    if (useValidate(note)) {
      if (route.params.isNew) {
        dispatch(addNote(note, route.params.groupKey));
      } else {
        dispatch(updateNote(note.key, note, route.params.groupKey));
      }
      navigation.popToTop();
    }
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderRight label="저장" callback={save} />,
      title: '',
    });
  });
  return (
    <ScrollView nestedScrollEnabled={true}>
      <Modal visible={cameraVisable} animationType="slide">
        <CameraModal
          setCameraVisable={setCameraVisable}
          setNote={setNote}
          note={note}
        />
      </Modal>
      <Map note={note} setNote={setNote} />
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

export default PostScreen;
