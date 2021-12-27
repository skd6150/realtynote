import React from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {NoteItemAttributes} from '.';

export type StackParamList = {
  Main: undefined;
  Browse: NoteItemAttributes;
  Edit: NoteItemAttributes | undefined;
};

export type MainScreenNavigationProps = NativeStackNavigationProp<
  StackParamList,
  'Main'
>;

export type BrowseScreenNavigationProps = NativeStackNavigationProp<
  StackParamList,
  'Browse'
>;

export type EditScreenNavigationProps = NativeStackNavigationProp<
  StackParamList,
  'Edit'
>;

export type BrowseScreenRouteProps = RouteProp<StackParamList, 'Browse'>;
export type EditScreenRouteProps = RouteProp<StackParamList, 'Edit'>;
