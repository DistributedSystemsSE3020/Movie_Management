import React from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '300px',
};
  
const center = {
    lat: 6.916181,
    lng: 79.972342
};

function GoogleMaps() {

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
         googleMapsApiKey: process.env.GOOGLE_MAP
    })

    const [map, setMap] = React.useState(null)

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    return isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
            <Marker position={{ lat:6.916181, lng: 79.972342 }}>Sara Hotels</Marker>
            onLoad={map => {
                const bounds = new window.google.maps.LatLngBounds();
                map.fitBounds(bounds);
            }}

            onUnmount={map => {
            // do your stuff before map is unmounted
            }}

          <></>
        </GoogleMap>
    ) : <></>

  }
  
  export default React.memo(GoogleMaps)
