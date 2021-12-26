import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {NoteScreenNavigationProps, NoteScreenRouteProps} from '../Interfaces';

type NoteScreenProps = {
  route: NoteScreenRouteProps;
  navigation: NoteScreenNavigationProps;
};

const NoteScreen = ({route, navigation}: NoteScreenProps) => {
  const [item, setItem] = useState(route.params);
  console.log(route.params);
  return (
    <View>
      <Text>note screen</Text>
      {item !== undefined && <Text>{item.address}</Text>}
    </View>
  );
};

export default NoteScreen;
