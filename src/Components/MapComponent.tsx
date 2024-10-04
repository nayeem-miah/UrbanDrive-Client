import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix Leaflet icon issue
const fixLeafletIcons = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
  });
};

interface Car {
    id: number;
    image:string,
    model:string,
    price: number;
    location: {
        coordinates: [number, number]; // [lng, lat]
    };
}

interface MapComponentProps {
    cars?: Car[]; // Optional to avoid undefined errors
    userLocation?: { lat: number; lng: number } | null; 
}

const MapComponent: React.FC<MapComponentProps> = ({ cars = [], userLocation }) => { // Default to empty array
    // const [selectedCar, setSelectedCar] = useState<Car | null>(null);
    


   useEffect(() => {
    fixLeafletIcons(); // Fix Leaflet icons on component mount

}, [cars]);



    return (
        <MapContainer
        center={userLocation ? [userLocation.lat, userLocation.lng] :  [23.8103, 90.4125]} // Default location if userLocation is invalid
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%" }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
             {userLocation && (
        <Marker position={[userLocation.lat, userLocation.lng]}>
          <Popup>You are here!</Popup>
        </Marker>
      )}
      {Array.isArray(cars) && cars.length > 0 ? (
                        cars.map((car) => (
                            <Marker key={car.id} position={[car.location.coordinates[1], car.location.coordinates[0]]}>
                                <Popup>
                                  <img className='w-full h-[70px]' src={car.image} alt="" />
                                  <p>Model: {car.model}</p>
                                  <p>Price: ${car.price}</p>
                                </Popup>
                            </Marker>
                        ))
                    ) : (
                        <p>No cars available</p> // Show this message if no cars are available
                    )}
        </MapContainer>
    );
};

export default MapComponent;
