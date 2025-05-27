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
import {
  Circle,
  FeatureGroup,
  MapContainer,
  Polyline,
  Popup,
  TileLayer,
} from 'react-leaflet';
import { decode } from 'polyline-encoded';
import L from 'leaflet';
import { EditControl } from 'react-leaflet-draw';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  fetchDesa,
  fetchExisting,
  fetchJenisJalan,
  fetchKecamatan,
  fetchKondisi,
  fetchRegion,
} from '@/app/(dashboard)/lib/data';

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
  const [openDrawer, setOpenDrawer] = useState(false);
  const [createdLineLatLngs, setCreatedLineLatLngs] = useState([]);

  const [kabupaten, setKabupaten] = useState([]);
  const [kecamatan, setKecamatan] = useState([]);
  const [desa, setDesa] = useState([]);

  const [selectedKabupatenId, setSelectedKabupatenId] = useState(null);
  const [selectedKecamatanId, setSelectedKecamatanId] = useState(null);

  const [existing, setExisting] = useState([]);
  const [kondisi, setKondisi] = useState([]);
  const [jenisJalan, setJenisJalan] = useState([]);

  // FETCH LINE RUAS JALAN
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

  // FETCH REGION KABUPATEN
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchRegion();
        // console.log(data.data);
        setKabupaten(data?.data?.kabupaten);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // FETCH KECAMATAN
  useEffect(() => {
    const getKecamatan = async () => {
      if (!selectedKabupatenId) return;
      try {
        const response = await fetchKecamatan({
          kabupatenId: selectedKabupatenId,
        });
        setKecamatan(response.data.kecamatan); // sesuaikan dengan struktur response kamu
      } catch (error) {
        console.error('Gagal mengambil data kecamatan:', error);
      }
    };

    getKecamatan();
  }, [selectedKabupatenId]);

  // FETCH DESA
  useEffect(() => {
    const getDesa = async () => {
      if (!selectedKecamatanId) return;
      try {
        const response = await fetchDesa({
          kecamatanId: selectedKecamatanId,
        });
        setDesa(response.data.desa); // Sesuaikan struktur response kamu
      } catch (error) {
        console.error('Gagal mengambil data desa:', error);
      }
    };

    getDesa();
  }, [selectedKecamatanId]);

  // FETCH EXISTING
  useEffect(() => {
    const getDesa = async () => {
      try {
        const response = await fetchExisting();
        setExisting(response?.data?.eksisting);
        // console.log(response);
      } catch (error) {
        console.error('Gagal mengambil data desa:', error);
      }
    };

    getDesa();
  }, []);

  // FETCH KONDISI
  useEffect(() => {
    const getDesa = async () => {
      try {
        const response = await fetchKondisi();
        setKondisi(response?.data?.eksisting);
        // console.log(response);
      } catch (error) {
        console.error('Gagal mengambil data desa:', error);
      }
    };

    getDesa();
  }, []);

  // FETCH JENIS JALAN
  useEffect(() => {
    const getDesa = async () => {
      try {
        const response = await fetchJenisJalan();
        setJenisJalan(response?.data?.eksisting);
        // console.log(response);
      } catch (error) {
        console.error('Gagal mengambil data desa:', error);
      }
    };

    getDesa();
  }, []);

  const _created = (e) => {
    const latlngs = e.layer.getLatLngs();

    console.log('Polyline created:', latlngs);

    setCreatedLineLatLngs(latlngs);
    setOpenDrawer(true); // Buka drawer
  };

  // console.log(existing);

  return (
    <>
      <div className='rounded-lg flex w-full overflow-hidden relative'>
        <div className='absolute top-2 right-16 z-[9]'>
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

          <FeatureGroup>
            <EditControl
              onCreated={_created}
              position='topright'
              draw={{
                rectangle: false,
                circle: false,
                circlemarker: false,
                marker: false,
                polygon: false,
              }}
            />
            <Circle
              center={[51.51, -0.06]}
              radius={200}
            />
          </FeatureGroup>

          {ruasJalan.map((ruas, i) => (
            <Polyline
              key={i}
              positions={[ruas.pathsDecoded]}
              color='blue'
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

          <Drawer
            direction='right'
            open={openDrawer}
            onOpenChange={setOpenDrawer}>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                <DrawerDescription>
                  This action cannot be undone.
                </DrawerDescription>
              </DrawerHeader>

              {/* {error && (
              <div className='bg-destructive text-white dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 p-3 rounded-lg'>
                <p className='text-sm text-center'>{error}</p>
              </div>
            )} */}

              <form>
                <div className='p-4'>
                  <div className='space-y-4'>
                    <div className='grid w-full max-w-sm items-center gap-1.5'>
                      <Label htmlFor='nama_ruas'>Nama Ruas</Label>
                      <Input
                        id='nama_ruas'
                        name='nama_ruas'
                        required
                      />
                    </div>

                    <div className='grid w-full max-w-sm items-center gap-1.5'>
                      <Label htmlFor='desa_id'>Kabupaten</Label>

                      <Select
                        onValueChange={(val) => {
                          const selected = kabupaten.find(
                            (item) => item.kabupaten === val
                          );
                          if (selected) setSelectedKabupatenId(selected.id);
                        }}>
                        <SelectTrigger className='w-full'>
                          <SelectValue placeholder='Pilih kabupaten' />
                        </SelectTrigger>
                        <SelectContent>
                          {kabupaten.map((item) => (
                            <SelectItem
                              key={item.id}
                              value={item.kabupaten}>
                              {item.kabupaten}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className='grid w-full max-w-sm items-center gap-1.5'>
                      <Label htmlFor='desa_id'>Kecamatan</Label>

                      <Select
                        onValueChange={(val) => {
                          setSelectedKecamatanId(Number(val)); // pastikan ID disimpan
                        }}>
                        <SelectTrigger className='w-full'>
                          <SelectValue placeholder='Pilih kecamatan' />
                        </SelectTrigger>
                        <SelectContent>
                          {kecamatan.map((item) => (
                            <SelectItem
                              key={item.id}
                              value={item.id.toString()}>
                              {item.value}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className='grid w-full max-w-sm items-center gap-1.5'>
                      <Label htmlFor='desa_id'>Desa</Label>

                      <Select>
                        <SelectTrigger className='w-full'>
                          <SelectValue placeholder='Pilih desa' />
                        </SelectTrigger>
                        <SelectContent>
                          {desa.map((item) => (
                            <SelectItem
                              key={item.id}
                              value={item.id.toString()}>
                              {item.value}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className='grid w-full max-w-sm items-center gap-1.5'>
                      <Label htmlFor='panjang'>Panjang</Label>
                      <Input
                        id='panjang'
                        // defaultValue={marker.layerpanjang}
                        name='panjang'
                        required
                      />
                    </div>

                    <div className='grid w-full max-w-sm items-center gap-1.5'>
                      <Label htmlFor='lebar'>Lebar</Label>
                      <Input
                        type='text'
                        id='lebar'
                        name='lebar'
                        placeholder='Location Name'
                        required
                      />
                    </div>

                    <div className='grid w-full max-w-sm items-center gap-1.5'>
                      <Label htmlFor='existing_id'>Existing</Label>

                      <Select>
                        <SelectTrigger className='w-full'>
                          <SelectValue placeholder='Pilih desa' />
                        </SelectTrigger>
                        <SelectContent>
                          {existing.map((item) => (
                            <SelectItem
                              key={item.id}
                              value={item.id.toString()}>
                              {item.eksisting}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className='grid w-full max-w-sm items-center gap-1.5'>
                      <Label htmlFor='kondisi_id'>Kondisi</Label>
                      <Select>
                        <SelectTrigger className='w-full'>
                          <SelectValue placeholder='Pilih desa' />
                        </SelectTrigger>
                        <SelectContent>
                          {kondisi.map((item) => (
                            <SelectItem
                              key={item.id}
                              value={item.id.toString()}>
                              {item.kondisi}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className='grid w-full max-w-sm items-center gap-1.5'>
                      <Label htmlFor='jenisJalan_id'>Jenis Jalan</Label>
                      <Select>
                        <SelectTrigger className='w-full'>
                          <SelectValue placeholder='Pilih desa' />
                        </SelectTrigger>
                        <SelectContent>
                          {jenisJalan.map((item) => (
                            <SelectItem
                              key={item.id}
                              value={item.id.toString()}>
                              {item.jenisjalan}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className='grid w-full max-w-sm items-center gap-1.5'>
                      <Label htmlFor='keterangan'>Keterangan</Label>
                      <Input
                        id='keterangan'
                        name='keterangan'
                        required
                      />
                    </div>
                  </div>
                </div>

                <DrawerFooter>
                  <Button type='submit'></Button>
                </DrawerFooter>
              </form>
            </DrawerContent>
          </Drawer>
        </MapContainer>
      </div>
    </>
  );
};
export default Map;
