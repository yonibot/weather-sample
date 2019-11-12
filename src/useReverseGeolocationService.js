import { useState } from 'react';
import keys from './keys';

 const apiKey = keys.opencagedata;

const fetchCity = async (lat, lon) => {
    const cityRequest = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${apiKey}`)
    const cityJson = await cityRequest.json();
    const [result] = cityJson.results;
    const { components: { city,  town } } = result;
    return city || town;
}

const useReverseGeolocationService = (lat, long) => {
    const [city, setCity] = useState();

    const getCity = async (lat, long) => {
        const myCity = await fetchCity(lat, long)
        setCity(myCity);
    }

    return [ city, getCity ];
}

export { useReverseGeolocationService };
