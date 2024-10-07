import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import './map.css';

interface MapProps {
    position: LatLngExpression; // [number, number]
    isp: string;
    location: string;
};

const MapComponent: React.FC<MapProps> = ({ position, isp, location }) => {
    const map = useMap();
  
    useEffect(() => {
      if (map) {
        map.flyTo(position, 6); // Use `flyTo` for smooth map transitions
      }
    }, [position, map]);
  
    return (
      <>
        <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
        <Popup>
            {isp} <br /> {location}
        </Popup>
        </Marker>
      </>
    );
};

const Map: React.FC<MapProps> = (props) => {
    const {position} = props;

    return (
    <MapContainer center={position} zoom={6} className='map-container'>
        <MapComponent {...props} />
    </MapContainer>
    );
};

export default Map;