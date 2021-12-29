import React from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {NoteItemAttributes} from '.';

export type StackParamList = {
  Main: undefined;
  Browse: NoteItemAttributes;
  Post: NoteItemAttributes | undefined;
};

export type MainScreenNavigationProps = NativeStackNavigationProp<
  StackParamList,
  'Main'
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
