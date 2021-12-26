import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {NoteItemAttributes} from '.';

export type StackParamList = {
  Main: undefined;
  Note: NoteItemAttributes | undefined;
};

export type MainScreenNavigationProps = NativeStackNavigationProp<
  StackParamList,
  'Main'
>;

export type NoteScreenNavigationProps = NativeStackNavigationProp<
  StackParamList,
  'Note'
>;

export type NoteScreenRouteProps = RouteProp<StackParamList, 'Note'>;
