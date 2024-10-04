import { useState } from 'react';
import './header.css';
import Search from './Search';

const Header = () => {
  const sampleIpData = {
    ip: '192.212.174.101',
    location: 'Brooklyn, NY 10001',
    timezone: 'UTC -05:00',
    isp: 'SpaceX Starlink',
    lat: 40.71427,
    lng: -74.00597
  };
  const [ipData, setIpData] = useState(sampleIpData);
  const apiKey = process.env.VITE_API_KEY;

  const handleSearch = async (word: string) => {
      try {
        const response = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${word}&domain=${word}`);
        const data = await response.json();
        console.log('Data:', data);
        setIpData({
          ip: data.ip,
          location: `${data.location.city}, ${data.location.region}, ${data.location.country} ${data.location.postalCode}`,
          timezone: `UTC ${data.location.timezone}`,
          isp: data.isp,
          lat: data.location.lat,
          lng: data.location.lng
        });
      } catch (error) {
        console.log('Error:', error);
      }
  };

  const infoContainer = (
    <div className='info-container'>
    <div className='info-box'>
      <h6>IP ADDRESS</h6>
      <p>{ipData.ip}</p>
    </div>
    <div className='info-box'>
      <h6>LOCATION</h6>
      <p>{ipData.location}</p>
    </div>
    <div className='info-box'>
      <h6>TIMEZONE</h6>
      <p>{ipData.timezone}</p>
    </div>
    <div className='info-box'>
      <h6>ISP</h6>
      <p>{ipData.isp}</p>
    </div>
  </div>
  );

  return (
    <header>
      <h1 id='title'>IP Address Tracker</h1>
      <Search onSearch={(word) => handleSearch(word)} />
      {infoContainer}
    </header>
  )
};

export default Header;
