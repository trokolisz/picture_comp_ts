"use client";

import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";
import 'leaflet/dist/leaflet.css'; 

const MapComponent = () => {
 const [locations, setLocations] = useState<{ latitude: number, longitude: number, title: string }[]>([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get("/api/locations");
        if (response.data.success) {
          const locationsData = response.data.data.map((item: any) => ({
            latitude: parseFloat(item.latitude),
            longitude: parseFloat(item.longitude),
            title: item.title,
          }));
          setLocations(locationsData);
        }
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, []);

  const getCenter = (locations: { latitude: number, longitude: number }[]): [number, number] => {
    if (locations.length === 0) {
      return [47.25, 17.83]; 
    }
    const total = locations.reduce((acc, loc) => {
      acc.lat += loc.latitude;
      acc.lng += loc.longitude;
      return acc;
    }, { lat: 0, lng: 0 });

    return [total.lat / locations.length, total.lng / locations.length];
  };

  const center = getCenter(locations);

  return (
    <MapContainer center={center} zoom={6} style={{ height: "500px" }}>
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
