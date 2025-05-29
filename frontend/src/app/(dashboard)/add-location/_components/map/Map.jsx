'use client';

import 'leaflet/dist/leaflet.css';
import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { fetchLocation } from '@/app/(dashboard)/lib/data';
import axios from 'axios';
import { API_URL } from '@/lib/constant';

const Map = () => {
  const [marker, setMarker] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [allMarkers, setAllMarkers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const latitude = formData.get('latitude');
    const longitude = formData.get('longitude');
    const pointX = formData.get('pointX');
    const pointY = formData.get('pointY');
    const locationName = formData.get('location-name');
    const description = formData.get('description');

    try {
      const res = await axios.post(`${API_URL}/locations`, {
        latitude,
        longitude,
        pointX,
        pointY,
        location_name: locationName,
        description,
      });

      setLoading(false);
      setDrawerOpen(false);
      setMarker(null);

      getMarkers();

      console.log(res);
    } catch (e) {
      setError(e?.response?.data.error);
    }
  };

  const LocationClickHandler = () => {
    useMapEvents({
      click(e) {
        console.log('📍 Marker Clicked:', e);

        const newMarker = {
          lat: e.latlng.lat,
          lng: e.latlng.lng,
          layerPointX: e.layerPoint.x,
          layerPointY: e.layerPoint.y,
        };
        setMarker(newMarker);
      },
    });
    return null;
  };

  const handleMarkerClick = () => {
    setDrawerOpen(true);
  };

  const getMarkers = async () => {
    const res = await fetchLocation();
    setAllMarkers(res.locations);
  };

  useEffect(() => {
    getMarkers();
  }, []);

  return (
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

        <LocationClickHandler />

        {marker && (
          <Marker
            position={[marker.lat, marker.lng]}
            eventHandlers={{
              click: handleMarkerClick,
            }}
          />
        )}

        {allMarkers.map((loc) => (
          <Marker
            key={loc.id}
            position={[loc.latitude, loc.longitude]}
          />
        ))}

        <Drawer
          open={drawerOpen}
          onOpenChange={setDrawerOpen}
          direction='right'>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Are you absolutely sure?</DrawerTitle>
              <DrawerDescription>
                This action cannot be undone.
              </DrawerDescription>
            </DrawerHeader>

            {error && (
              <div className='bg-destructive text-white dark:bg-destructive/60  py-3 rounded-lg max-w-[364px] mx-auto'>
                <p className='text-sm text-center mx-2'>{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className='p-4'>
                {marker && (
                  <div className='space-y-4'>
                    <div className='grid w-full max-w-sm items-center gap-1.5'>
                      <Label htmlFor='latitude'>Latitude</Label>
                      <Input
                        id='latitude'
                        defaultValue={marker.lat}
                        name='latitude'
                        required
                      />
                    </div>

                    <div className='grid w-full max-w-sm items-center gap-1.5'>
                      <Label htmlFor='longitude'>Longitude</Label>
                      <Input
                        id='longitude'
                        defaultValue={marker.lng}
                        name='longitude'
                        required
                      />
                    </div>

                    <div className='grid w-full max-w-sm items-center gap-1.5'>
                      <Label htmlFor='pointX'>Layer Point X</Label>
                      <Input
                        id='pointX'
                        defaultValue={marker.layerPointX}
                        name='pointX'
                        required
                      />
                    </div>

                    <div className='grid w-full max-w-sm items-center gap-1.5'>
                      <Label htmlFor='pointY'>Layer Point Y</Label>
                      <Input
                        id='pointY'
                        defaultValue={marker.layerPointY}
                        name='pointY'
                        required
                      />
                    </div>

                    <div className='grid w-full max-w-sm items-center gap-1.5'>
                      <Label htmlFor='location-name'>Nama Lokasi</Label>
                      <Input
                        type='text'
                        id='location-name'
                        name='location-name'
                        placeholder='Location Name'
                        required
                      />
                    </div>

                    <div className='grid w-full max-w-sm items-center gap-1.5'>
                      <Label htmlFor='description'>Deskripsi</Label>
                      <Input
                        type='text'
                        id='description'
                        name='description'
                        placeholder='Description'
                        required
                      />
                    </div>
                  </div>
                )}
              </div>

              <DrawerFooter>
                <Button
                  type='submit'
                  disabled={loading}>
                  {loading ? 'Loading...' : 'Create account'}
                </Button>
              </DrawerFooter>
            </form>
          </DrawerContent>
        </Drawer>
      </MapContainer>
    </div>
  );
};
export default Map;
