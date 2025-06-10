import React, { useState, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import '../../Styles/GoogleMaps.css';

// Map container style
const containerStyle = {
  width: '100%',
  height: '100%'
};

// Sippin' Pretty location (Cape Town coordinates)
const center = {
  lat: -33.9375,
  lng: 18.4750
};

// Custom map styling for a professional look
const mapStyles = [
  {
    featureType: "all",
    elementType: "geometry.fill",
    stylers: [{ weight: "2.00" }]
  },
  {
    featureType: "all",
    elementType: "geometry.stroke",
    stylers: [{ color: "#9c9c9c" }]
  },
  {
    featureType: "all",
    elementType: "labels.text",
    stylers: [{ visibility: "on" }]
  },
  {
    featureType: "landscape",
    elementType: "all",
    stylers: [{ color: "#f2f2f2" }]
  },
  {
    featureType: "landscape",
    elementType: "geometry.fill",
    stylers: [{ color: "#ffffff" }]
  },
  {
    featureType: "landscape.man_made",
    elementType: "geometry.fill",
    stylers: [{ color: "#ffffff" }]
  },
  {
    featureType: "poi",
    elementType: "all",
    stylers: [{ visibility: "off" }]
  },
  {
    featureType: "road",
    elementType: "all",
    stylers: [{ saturation: -100 }, { lightness: 45 }]
  },
  {
    featureType: "road",
    elementType: "geometry.fill",
    stylers: [{ color: "#eeeeee" }]
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#7b7b7b" }]
  },
  {
    featureType: "road",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#ffffff" }]
  },
  {
    featureType: "road.highway",
    elementType: "all",
    stylers: [{ visibility: "simplified" }]
  },
  {
    featureType: "road.arterial",
    elementType: "labels.icon",
    stylers: [{ visibility: "off" }]
  },
  {
    featureType: "transit",
    elementType: "all",
    stylers: [{ visibility: "off" }]
  },
  {
    featureType: "water",
    elementType: "all",
    stylers: [{ color: "#cc4068" }, { visibility: "on" }]
  },
  {
    featureType: "water",
    elementType: "geometry.fill",
    stylers: [{ color: "#d4a1ba" }]
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#070707" }]
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#ffffff" }]
  }
];

// Map options
const mapOptions = {
  styles: mapStyles,
  disableDefaultUI: false,
  zoomControl: true,
  mapTypeControl: false,
  scaleControl: true,
  streetViewControl: false,
  rotateControl: false,
  fullscreenControl: true,
  gestureHandling: 'cooperative'
};

export const GoogleMaps = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showInfoWindow, setShowInfoWindow] = useState(false);

  const onLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const onMarkerClick = () => {
    setShowInfoWindow(!showInfoWindow);
  };

  const getDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${center.lat},${center.lng}&destination_place_id=ChIJOwg_06VPwokRYv534QaPC8g`;
    window.open(url, '_blank');
  };

  return (
    <div className="google-maps-container">
      <div className="map-wrapper">
        <div className="map-header">
          <h3 className="map-title">Visit Our Café</h3>
          <p className="map-subtitle">Find us in the heart of Cape Town</p>
        </div>

        <div className="map-container">
          <LoadScript
            googleMapsApiKey="AIzaSyBdI76O85kIAY8r64pxwmwRk9ocwQC5fF4"
            onLoad={onLoad}
          >
            {isLoaded ? (
              <GoogleMap
                mapContainerClassName="google-map"
                center={center}
                zoom={15}
                options={mapOptions}
              >
                <Marker
                  position={center}
                  onClick={onMarkerClick}
                  title="Sippin' Pretty Café"
                />

                {showInfoWindow && (
                  <InfoWindow
                    position={center}
                    onCloseClick={() => setShowInfoWindow(false)}
                  >
                    <div style={{
                      padding: '8px',
                      fontFamily: 'Poppins, sans-serif',
                      color: '#5e412f'
                    }}>
                      <h4 style={{ margin: '0 0 8px 0', color: '#cc4068' }}>
                        Sippin' Pretty
                      </h4>
                      <p style={{ margin: '0 0 4px 0', fontSize: '14px' }}>
                        123 Pretty Street
                      </p>
                      <p style={{ margin: '0', fontSize: '14px' }}>
                        Mowbray, Cape Town, 7700
                      </p>
                    </div>
                  </InfoWindow>
                )}
              </GoogleMap>
            ) : (
              <div className="map-loading">
                <div className="loading-spinner"></div>
                Loading map...
              </div>
            )}
          </LoadScript>
        </div>

        <div className="map-info">
          <p className="map-address">
            📍 123 Pretty Street,   Mowbray, Cape Town, 7700<br />
            ☎️ 021 694 1960 | 📧 sippinpretty07@gmail.com
          </p>
          <button className="map-directions-btn" onClick={getDirections}>
            <i className="fas fa-directions"></i>
            Get Directions
          </button>
        </div>
      </div>
    </div>
  );
};
