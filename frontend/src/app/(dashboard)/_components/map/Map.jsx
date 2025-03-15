import 'leaflet/dist/leaflet.css';
import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { fetchLocation } from '@/app/(dashboard)/lib/data';

const Map = () => {
  const [allMarkers, setAllMarkers] = useState([]);

  useEffect(() => {
    const getMarkers = async () => {
      const res = await fetchLocation();
      setAllMarkers(res.data);
    };

    getMarkers();
  }, []);

  return (
    <>
      <div className='rounded-lg flex w-full overflow-hidden relative'>
        <MapContainer
          center={[-8.8035, 115.1762]}
          zoom={16}
          scrollWheelZoom={false}
          className='flex-1 h-[760px] relative'>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />

          {allMarkers.map((loc) => (
            <Marker
              key={loc.id}
              position={[loc.latitude, loc.longitude]}
            />
          ))}
        </MapContainer>
      </div>
    </>
  );
};
export default Map;
