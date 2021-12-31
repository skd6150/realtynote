import Config from 'react-native-config';
import {Address} from '../Interfaces';

export default async function (query: string): Promise<Address[]> {
  try {
    const response = await fetch(
      `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${query}`,
      {
        method: 'GET',
        headers: {
          'X-NCP-APIGW-API-KEY-ID': Config.NMAP_ID,
          'X-NCP-APIGW-API-KEY': Config.NMAP_KEY,
        },
      },
    );
    const body = await response.json();
    return body.addresses.map((element: any): Address => {
      return {
        location: {
          lat: parseFloat(element.y),
          lng: parseFloat(element.x),
        },
        address: element.roadAddress,
      };
    });
  } catch (e) {
    console.log(e);
    throw new Error('geocoder error');
  }
}
