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
  const [error, setError] = useState<string>('');
  const apiKey = process.env.API_KEY;
  const apiURL = process.env.API_URL;

  const handleSearch = async (word: string) => {
      try {
        setError('');
        const response = await fetch(`${apiURL}?apiKey=${apiKey}&ipAddress=${word}&domain=${word}`);
        const data = await response.json();
        setIpData({
          ip: data.ip,
          location: `${data.location.city}, ${data.location.region}, ${data.location.country} ${data.location.postalCode}`,
          timezone: `UTC ${data.location.timezone}`,
          isp: data.isp,
          lat: data.location.lat,
          lng: data.location.lng
        });
      } catch (error: any) {
        const errorText = String(error);
        console.log('Error:', errorText);
        setError(String(errorText));
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
  const errorContainer = (
    <div className='error-container'>
      <p>{error}</p>
    </div>
  );

  return (
    <header>
      <h1 id='title'>IP Address Tracker</h1>
      <Search placeholder="Search for any IP address or domain" onSearch={(word) => handleSearch(word)} />
      {error ? errorContainer : infoContainer}
    </header>
  )
};

export default Header;
