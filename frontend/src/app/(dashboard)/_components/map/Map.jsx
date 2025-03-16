import 'leaflet/dist/leaflet.css';
import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { fetchLocation } from '@/app/(dashboard)/lib/data';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const listTiles = [
  {
    name: 'Esri NatGeo',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}',
    attribution:
      'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
  },
  {
    name: 'Open Street Map',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
  {
    name: 'Esri World Imagery',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution:
      'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
  },
  {
    name: 'CartoDB Positron',
    url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    attribution:
      '&copy; <a href="https://carto.com/">CARTO</a> | © OpenStreetMap contributors',
  },
  {
    name: 'CartoDB Dark Matter',
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    attribution:
      '&copy; <a href="https://carto.com/">CARTO</a> | © OpenStreetMap contributors',
  },
  {
    name: 'Stamen Toner',
    url: 'https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png',
    attribution:
      'Map tiles by <a href="https://stamen.com">Stamen Design</a>, © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
  },
  {
    name: 'Stamen Terrain',
    url: 'https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png',
    attribution:
      'Map tiles by <a href="https://stamen.com">Stamen Design</a>, © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
  },
  {
    name: 'Stamen Watercolor',
    url: 'https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg',
    attribution:
      'Map tiles by <a href="https://stamen.com">Stamen Design</a>, © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
  },
  {
    name: 'Thunderforest Outdoors',
    url: 'https://{s}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=YOUR_API_KEY',
    attribution:
      'Maps © <a href="https://www.thunderforest.com/">Thunderforest</a>, Data © OpenStreetMap contributors',
  },
  {
    name: 'Jawg Streets',
    url: 'https://{s}.tile.jawg.io/jawg-streets/{z}/{x}/{y}{r}.png?access-token=YOUR_ACCESS_TOKEN',
    attribution:
      '© <a href="https://www.jawg.io/">Jawg</a> Maps & data © OpenStreetMap contributors',
  },
];

const Map = () => {
  const [allMarkers, setAllMarkers] = useState([]);
  const [selectedTile, setSelectedTile] = useState(listTiles[1]);

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
        <div className='absolute top-4 right-4 z-[999999]'>
          <Select
            onValueChange={(val) => {
              const tile = listTiles.find((t) => t.name === val);
              if (tile) setSelectedTile(tile);
            }}>
            <SelectTrigger className='w-[180px] dark:bg-white dark:text-primary-foreground dark:hover:bg-primary'>
              <SelectValue placeholder='Theme' />
            </SelectTrigger>
            <SelectContent className='dark:bg-white dark:text-primary-foreground'>
              {listTiles.map((tile, index) => (
                <SelectItem
                  className='dark:hover:bg-primary dark:focus:bg-primary dark:focus:text-primary-foreground'
                  key={index}
                  value={tile.name}>
                  {tile.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <MapContainer
          center={[-8.8035, 115.1762]}
          zoom={16}
          scrollWheelZoom={false}
          className='flex-1 h-[760px]'>
          <TileLayer
            url={selectedTile.url}
            attribution={selectedTile.attribution}
          />

          {allMarkers.map((loc) => (
            <Marker
              key={loc.id}
              position={[loc.latitude, loc.longitude]}>
              <Popup>
                <div className='text-sm'>
                  <div className='flex flex-col'>
                    <span className='font-semibold text-lg'>
                      {loc.location_name}
                    </span>
                    <span className='text-base'>{loc.description}</span>
                  </div>

                  <hr className='my-2 bg-gray-300' />

                  <div>
                    <span className='font-medium'>Latitude:</span>{' '}
                    {loc.latitude}
                  </div>
                  <div>
                    <span className='font-medium'>Longitude:</span>{' '}
                    {loc.longitude}
                  </div>
                  <div>
                    <span className='font-medium'>Layer Point:</span> X:{' '}
                    {loc.pointX}, Y: {loc.pointY}
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </>
  );
};
export default Map;
