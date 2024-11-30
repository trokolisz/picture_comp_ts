import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import L from 'leaflet';
import 'leaflet.markercluster';

const defaultMarkerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

interface Photo {
  latitude: number;
  longitude: number;
  url: string;
  title: string;
  description: string;
}

const MarkerCluster = ({ markers }: { markers: Photo[] }) => {
  const map = useMap();

  useEffect(() => {
    const markerClusterGroup = L.markerClusterGroup();

    markers.forEach((marker) => {
      if (marker.latitude !== undefined && marker.longitude !== undefined) {
        const leafletMarker = L.marker([marker.latitude, marker.longitude], { icon: defaultMarkerIcon })
          .bindPopup(`
            <div>
              <img src="${marker.url}" alt="${marker.title}" style="width:100px;height:auto;" />
              <p><strong>${marker.title}</strong></p>
              <p>${marker.description}</p>
              <p>Koordináta: (${marker.latitude.toFixed(5)}, ${marker.longitude.toFixed(5)})</p>
            </div>
          `);
        markerClusterGroup.addLayer(leafletMarker);
      } else {
        console.warn(`Invalid coordinates for marker: ${marker.title}`);
      }
    });

    map.addLayer(markerClusterGroup);

    return () => {
      map.removeLayer(markerClusterGroup);
    };
  }, [map, markers]);

  return null;
};
const MapComponentGoogle = () => {
  const [locations, setLocations] = useState<Photo[]>([]);

  useEffect(() => {
    const fetchLocations = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/competitions`);
        const data = await response.json();

        if (data.competitions) {
          const locationsData: Photo[] = [];

          Object.values(data.competitions).forEach((competition: any) => {
            if (competition.teams) {
              Object.values(competition.teams).forEach((team: any) => {
                if (team.photos) {
                  Object.values(team.photos).forEach((photo: any) => {
                    if (photo.latitude && photo.longitude) {
                      locationsData.push({
                        latitude: photo.latitude,
                        longitude: photo.longitude,
                        url: photo.url,
                        title: photo.title,
                        description: photo.description,
                      });
                    }
                  });
                }
              });
            }
          });

          setLocations(locationsData);
        } else {
          console.error('Nem sikerült a lekérés');
        }
    };

    fetchLocations();
  }, []);

  return (
    <MapContainer
      center={[47.4969, 19.0422]}
      zoom={8}
      style={{ width: '100%', height: '500px' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MarkerCluster markers={locations} />
    </MapContainer>
  );
};

export default MapComponentGoogle;
