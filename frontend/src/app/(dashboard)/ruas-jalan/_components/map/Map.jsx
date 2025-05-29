'use client';

import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { MapContainer, Polyline, Popup, TileLayer } from 'react-leaflet';
import { decode } from 'polyline-encoded';

const listTiles = [
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
];

const Map = () => {
  const [ruasJalan, setRuasJalan] = useState([]);
  const [selectedTile, setSelectedTile] = useState(listTiles[0]);

  useEffect(() => {
    const fetchRuasJalan = async () => {
      try {
        const authToken = localStorage.getItem('gis_token');

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_GIS_API_URL}/api/ruasjalan`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        const decodedRuas = response.data.ruasjalan.map((ruas) => ({
          ...ruas,
          pathsDecoded: L.Polyline.fromEncoded(ruas.paths).getLatLngs(),
        }));

        setRuasJalan(decodedRuas);
      } catch (error) {
        console.error('Error fetching ruas jalan data:', error);
      }
    };

    fetchRuasJalan();
  }, []);

  return (
    <>
      <div className='rounded-lg flex w-full overflow-hidden relative'>
        <div className='absolute top-4 right-4 z-[999999]'>
          <Select
            defaultValue={selectedTile.name}
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
          zoom={10}
          scrollWheelZoom={false}
          className='flex-1 h-[760px]'>
          <TileLayer
            url={selectedTile.url}
            attribution={selectedTile.attribution}
          />

          {ruasJalan.map((ruas, i) => (
            <Polyline
              key={i}
              positions={ruas.pathsDecoded}
              color='orange'
              weight={3}>
              <Popup>
                <div className='text-sm'>
                  <span className='font-semibold'>{ruas.nama_ruas}</span>
                  <p>Panjang: {ruas.panjang} m</p>
                  <p>Keterangan: {ruas.keterangan}</p>
                </div>
              </Popup>
            </Polyline>
          ))}
        </MapContainer>
      </div>
    </>
  );
};
export default Map;
