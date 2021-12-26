import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {NoteItemAttributes} from '.';

export type StackParamList = {
  Main: undefined;
  Browse: NoteItemAttributes;
};

export type MainScreenNavigationProps = NativeStackNavigationProp<
  StackParamList,
  'Main'
>;

export type BrowseScreenNavigationProps = NativeStackNavigationProp<
  StackParamList,
  'Browse'
>;

export type BrowseScreenRouteProps = RouteProp<StackParamList, 'Browse'>;
