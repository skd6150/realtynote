import Config from 'react-native-config';
import {Location, Address} from '../Interfaces';

export default async function ({lat, lng}: Location): Promise<Address> {
  try {
    const response = await fetch(
      `https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?coords=${lng},${lat}&output=json&orders=roadaddr`,
      {
        method: 'GET',
        headers: {
          'X-NCP-APIGW-API-KEY-ID': Config.NMAP_ID,
          'X-NCP-APIGW-API-KEY': Config.NMAP_KEY,
        },
      },
    );
    const body = await response.json();
    const area = [2, 3, 4].map(idx => {
      return body.results[0].region[`area${idx}`].name;
    });
    const land = ['name', 'number1', 'number2'].map(idx => {
      return body.results[0].land[idx];
    });
    const address = area.join(' ') + land.join(' ');
    return {
      location: {
        lat,
        lng,
      },
      address,
    };
  } catch (e) {
    console.error(e);
    throw new Error('reverse geocoder error');
  }
}
