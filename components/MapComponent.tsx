"use client";

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { ref, onValue } from 'firebase/database';
import { database } from '../FirebaseConfig';

const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), { ssr: false });

interface Location {
  latitude: number;
  longitude: number;
  title: string;
}

const MapComponent = () => {
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    const photosRef = ref(database, 'competition');
    const unsubscribe = onValue(photosRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const locationsData = Object.values(data)
          .flatMap((competition: any) =>
            Object.values(competition.teams || {}).flatMap((team: any) =>
              Object.values(team.photos || {}).map((photo: any) => ({
                latitude: parseFloat(photo.latitude),
                longitude: parseFloat(photo.longitude),
                title: photo.title,
              }))
            )
          );
        setLocations(locationsData);
      }
    });

    return () => unsubscribe();
  }, []);

  const getCenter = (locations: Location[]): [number, number] => {
    if (locations.length === 0) {
      return [47.25, 17.83];
    }
    const total = locations.reduce(
      (acc, loc) => {
        acc.lat += loc.latitude;
        acc.lng += loc.longitude;
        return acc;
      },
      { lat: 0, lng: 0 }
    );

    return [total.lat / locations.length, total.lng / locations.length];
  };

  const center = getCenter(locations);

  return (
    <MapContainer center={center} zoom={6} style={{ height: '500px' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {locations.map((location, index) => (
        <Marker key={index} position={[location.latitude, location.longitude]}>
          <Popup>
            {location.title}<br />
            Latitude: {location.latitude}, Longitude: {location.longitude}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
