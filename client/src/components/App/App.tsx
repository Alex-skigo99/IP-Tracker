import { useState } from 'react';
import Header from '../Header/Header'
import './App.css'
import Map from '../Map/Map';
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';


// Fixing the Icon Issue: Leaflet’s default marker icons need special handling because Vite bundles images differently from Webpack.
const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

export type IpDataType = {
  ip: string;
  location: string;
  timezone: string;
  isp: string;
  lat: number;
  lng: number;
};

function App() {
  const sampleIpData: IpDataType = {
    ip: '192.212.174.101',
    location: 'Brooklyn, NY 10001',
    timezone: 'UTC -05:00',
    isp: 'SpaceX Starlink',
    lat: 40.71427,
    lng: -74.00597
  };
  const [ipData, setIpData] = useState(sampleIpData);

  return (
    <>
      <Header ipData={ipData} setIpData={setIpData} />
      <Map position={[ipData.lat, ipData.lng]} isp={ipData.isp} location={ipData.location} />
    </>
  )
};

export default App
