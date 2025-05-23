import React from 'react';
import {GoogleMap, LoadScript, Marker} from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '400px'
};

const center = {
    lat: -33.9375,
    lng: 18.4750
};

export const GoogleMaps = ()  => {
        return (
            <LoadScript googleMapsApiKey="https://storage.googleapis.com/maps-solutions-s8ydi494hh/locator-plus/n367/locator-plus.html">
                <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
                    <Marker position={center} />
                </GoogleMap>
            </LoadScript>
        );
    };
