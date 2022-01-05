import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import NaverMapView, {Coord} from 'react-native-nmap';
import Icon from 'react-native-vector-icons/MaterialIcons';
import produce from 'immer';
import {useReverseGeocoder} from '../../Hooks';
import {NoteItemAttributes, Location} from '../../Interfaces';

interface MapProps {
  note: NoteItemAttributes;
  setNote: React.Dispatch<React.SetStateAction<NoteItemAttributes>>;
}

interface MapChangeEvent {
  latitude: number;
  longitude: number;
  zoom: number;
  contentsRegion: [Coord, Coord, Coord, Coord, Coord];
  coveringRegion: [Coord, Coord, Coord, Coord, Coord];
}

const Map = ({note, setNote}: MapProps) => {
  const makeCameraChangeHandler = () => {
    var initialized = false;
    return (e: MapChangeEvent) => {
      if (!initialized) {
        initialized = true;
        return;
      }
      const newLocation = {
        lat: e.latitude,
        lng: e.longitude,
      };
      useReverseGeocoder({
        location: newLocation,
        address: note.map.address,
      }).then(newAddress => {
        setNote(
          produce(note, draft => {
            draft.map.location = newLocation;
            draft.map.address = newAddress.address;
          }),
        );
      });
    };
  };
  const cameraChangeHandler = makeCameraChangeHandler();
  return (
    <View>
      <NaverMapView
        style={styles.map}
        center={{
          latitude: note.map.location.lat,
          longitude: note.map.location.lng,
        }}
        onCameraChange={cameraChangeHandler}
      />
      <View style={styles.centerMarkerWrapper}>
        <Icon name="my-location" size={32} color="#e91e63" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    position: 'relative',
    alignSelf: 'stretch',
    height: 240,
    backgroundColor: '#C4C4C4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerMarkerWrapper: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Map;
