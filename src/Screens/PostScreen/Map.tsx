import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import NaverMapView, {Marker} from 'react-native-nmap';
import Icon from 'react-native-vector-icons/MaterialIcons';
import produce from 'immer';
import {useReverseGeocoder} from '../../Hooks';
import {NoteItemAttributes} from '../../Interfaces';

interface MapProps {
  note: NoteItemAttributes;
  setNote: React.Dispatch<React.SetStateAction<NoteItemAttributes>>;
}

const Map = ({note, setNote}: MapProps) => {
  const [center, setCenter] = useState(note.map.location);
  useEffect(() => {
    useReverseGeocoder(center).then(address => {
      setNote(
        produce(note, draft => {
          draft.map.location = center;
          draft.map.address = address.address;
        }),
      );
    });
  }, [center]);
  return (
    <View>
      <NaverMapView
        style={styles.map}
        center={{
          latitude: center.lat,
          longitude: center.lng,
          zoom: 16,
        }}
        onCameraChange={e => {
          setCenter({
            lat: e.latitude,
            lng: e.longitude,
          });
        }}></NaverMapView>
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
