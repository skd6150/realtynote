import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {NoteItemAttributes} from '.';

interface PostParams {
  note: NoteItemAttributes;
  groupKey: string;
  isNew: boolean;
}

export type StackParamList = {
  Main: undefined;
  Edit: {
    groupKey: string;
  };
  Browse: {
    note: NoteItemAttributes;
    groupKey: string;
  };
  Post: PostParams;
};

export type MainScreenNavigationProps = NativeStackNavigationProp<
  StackParamList,
  'Main'
>;

export type EditScreenNavigationProps = NativeStackNavigationProp<
  StackParamList,
  'Edit'
>;

export type BrowseScreenNavigationProps = NativeStackNavigationProp<
  StackParamList,
  'Browse'
>;

export type PostScreenNavigationProps = NativeStackNavigationProp<
  StackParamList,
  'Post'
>;

export type BrowseScreenRouteProps = RouteProp<StackParamList, 'Browse'>;
export type PostScreenRouteProps = RouteProp<StackParamList, 'Post'>;
export type EditScreenRouteProps = RouteProp<StackParamList, 'Edit'>;
