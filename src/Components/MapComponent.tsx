// 

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'; // Import Leaflet components
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS
import L from 'leaflet'; // Import Leaflet library
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix Leaflet icon issue
const fixLeafletIcons = () => {
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: markerIcon2x,
      iconUrl: markerIcon,
      shadowUrl: markerShadow,
    });
};

interface MapComponentProps {
  cars: any[]; 
  userLocation: { lat: number, lng: number }; 
}

const MapComponent: React.FC<MapComponentProps> = ({ cars, userLocation }) => {
  useEffect(() => {
    fixLeafletIcons(); // Fix Leaflet icons on component mount
  }, []);

  return (
    <MapContainer center={userLocation} zoom={13} style={{ height: "100%", width: "100%" }}>
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    />
    {/* Marker for user's location */}
    <Marker position={userLocation}>
      <Popup>
        You are here.
      </Popup>
    </Marker>
    {/* Optionally, add markers for available cars */}
    {/* {cars.map(car => (
      <Marker key={car._id} position={car.location}> // Adjust based on your car data
        <Popup>
          {car.name}
        </Popup>
      </Marker>
    ))} */}
  </MapContainer>
  );
};

export default MapComponent;
