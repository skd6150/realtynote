import {PermissionsAndroid} from 'react-native';
import Geolocation, {GeoPosition} from 'react-native-geolocation-service';
import {Location} from '../Interfaces';

const requestPermission = async () => {
  try {
    return await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
  } catch (e) {
    console.error(e);
  }
};

export default async function (): Promise<Location | null> {
  await requestPermission();
  const option = {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000};
  const getLocation = () =>
    new Promise<GeoPosition>((res, err) =>
      Geolocation.getCurrentPosition(res, err, option),
    );
  try {
    const data = await getLocation();
    return {
      lat: data.coords.latitude,
      lng: data.coords.longitude,
    };
  } catch (e) {
    return null;
  }
}
