'use client';

import 'leaflet/dist/leaflet.css';
import React, { useState } from 'react';
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const Map = () => {
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const LocationClickHandler = () => {
    useMapEvents({
      click(e) {
        const newMarker = {
          lat: e.latlng.lat,
          lng: e.latlng.lng,
        };
        setMarkers((prev) => [...prev, newMarker]);
      },
    });
    return null;
  };

  const handleMarkerClick = (index) => {
    setSelectedMarker(markers[index]);
    setDialogOpen(true);
  };

  return (
    <div className='rounded-lg flex w-full overflow-hidden relative'>
      <MapContainer
        center={[-8.8035, 115.1762]}
        zoom={16}
        scrollWheelZoom={false}
        className='flex-1 h-dvh relative'>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />

        <LocationClickHandler />

        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={[marker.lat, marker.lng]}
            eventHandlers={{
              click: () => handleMarkerClick(index),
            }}
          />
        ))}

        <Dialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Informasi Marker</DialogTitle>
            </DialogHeader>
            {selectedMarker && (
              <div className='space-y-2'>
                <p>
                  <strong>Latitude:</strong> {selectedMarker.lat}
                </p>
                <p>
                  <strong>Longitude:</strong> {selectedMarker.lng}
                </p>
                {/* Tambahkan input form atau aksi lainnya di sini jika mau */}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </MapContainer>
    </div>
  );
};
export default Map;
