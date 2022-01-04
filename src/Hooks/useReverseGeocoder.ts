import Config from 'react-native-config';
import {Location, Address} from '../Interfaces';

export default async function ({location, address}: Address): Promise<Address> {
  try {
    const response = await fetch(
      `https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?coords=${location.lng},${location.lat}&output=json&orders=roadaddr`,
      {
        method: 'GET',
        headers: {
          'X-NCP-APIGW-API-KEY-ID': Config.NMAP_ID,
          'X-NCP-APIGW-API-KEY': Config.NMAP_KEY,
        },
      },
    );
    const body = await response.json();
    if (body.results.length === 0) {
      return {
        location: {
          lat: location.lat,
          lng: location.lng,
        },
        address,
      };
    }
    const area = [1, 2, 3, 4].map(idx => {
      return body.results[0].region[`area${idx}`].name;
    });
    const land = ['name', 'number1', 'number2'].map(idx => {
      return body.results[0].land[idx];
    });
    const new_address = area.join(' ') + land.join(' ');
    return {
      location: {
        lat: location.lat,
        lng: location.lng,
      },
      address: new_address,
    };
  } catch (e) {
    console.error(e);
    throw new Error('reverse geocoder error');
  }
}
