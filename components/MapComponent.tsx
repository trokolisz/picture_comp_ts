'use client';

import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';

interface Score {
  [judge: string]: number;
}

interface Photo {
  description: string;
  latitude: number;
  longitude: number;
  scores: Score;
  timestamp?: string;
  title: string;
  name: string;
  uploaded_by: string;
  url: string;
}

const DEFAULT_CENTER: [number, number] = [47.25, 17.83];

const MapComponent: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get('/api/locations');
        const competitionData = response.data.competition;

        const photosArray: Photo[] = [];
        for (const competitionKey in competitionData) {
          const competition = competitionData[competitionKey];
          for (const teamKey in competition.teams) {
            const team = competition.teams[teamKey];
            for (const photoKey in team.photos) {
              const photo = team.photos[photoKey];
              photosArray.push({
                name: photoKey,
                title: photo.title,
                description: photo.description,
                latitude: photo.latitude,
                longitude: photo.longitude,
                scores: photo.scores,
                timestamp: photo.timestamp,
                uploaded_by: photo.uploaded_by,
                url: photo.url,
              });
            }
          }
        }

        setPhotos(photosArray);
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    };

    fetchPhotos();
  }, []);

  const getCenter = (locations: Photo[]): [number, number] => {
    if (locations.length === 0) {
      return DEFAULT_CENTER;
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

  const center = getCenter(photos);

  return (
    <MapContainer
      center={center}
      zoom={6}
      style={{ height: '500px' }}
      whenCreated={(map) => {
        if (!mapRef.current) {
          mapRef.current = map;
        }
      }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {photos.map((photo, index) => (
        <Marker key={index} position={[photo.latitude, photo.longitude]}>
          <Popup>
            <strong>{photo.title}</strong><br />
            {photo.description}<br />
            Uploaded by: {photo.uploaded_by}<br />
            <img src={photo.url} alt={photo.title} style={{ width: '100px', height: 'auto' }} /><br />
            Latitude: {photo.latitude}, Longitude: {photo.longitude}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
