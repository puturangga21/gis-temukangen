'use client';

import 'leaflet/dist/leaflet.css';
import React, { useActionState, useEffect, useState } from 'react';
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
import { addLocation } from '@/app/(dashboard)/add-location/lib/action';
import { useFormStatus } from 'react-dom';
import { fetchLocation } from '@/app/(dashboard)/lib/data';

const initialFormState = {
  error: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type='submit'
      disabled={pending}>
      {pending ? 'Loading...' : 'Create account'}
    </Button>
  );
}

const Map = () => {
  const [marker, setMarker] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [allMarkers, setAllMarkers] = useState([]);

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
    setAllMarkers(res.data);
  };

  const [state, formAction] = useActionState(addLocation, initialFormState);

  useEffect(() => {
    if (state?.error === '') {
      setDrawerOpen(false);
      setMarker(null);
      getMarkers();
    }
  }, [state]);

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

            {state?.error !== '' && (
              <div className='bg-destructive mx-4 text-white dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 p-3 rounded-lg'>
                <p className='text-sm text-center'>{state?.error}</p>
              </div>
            )}

            <form action={formAction}>
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
                <SubmitButton />
              </DrawerFooter>
            </form>
          </DrawerContent>
        </Drawer>
      </MapContainer>
    </div>
  );
};
export default Map;
