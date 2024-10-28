import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
// import markerIcon from 'leaflet/dist/images/marker-icon.png';
// import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
// import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { LuMapPin, LuNavigation } from 'react-icons/lu';

interface UserLocation {
  lat: number;
  lng: number;
}

interface Car {
  id: string;
  location: {
    coordinates: [number, number];
  };
  image: string;
  model: string;
  price: number;
}

interface RecentMapLocationProps {
  userLocation: UserLocation | null;
}

const RecentMapLocation: React.FC<RecentMapLocationProps> = ({ userLocation }) => {
  const map = useMap();
  useEffect(() => {
    if (userLocation) {
      map.setView([userLocation.lat, userLocation.lng], 13, { animate: true });
    }
  }, [userLocation, map]);
  return null;
};

interface MapEventHandlerProps {
  cars: Car[];
}

const MapEventHandler: React.FC<MapEventHandlerProps> = ({ cars }) => {
  const map = useMap();
  useMapEvents({
    click: () => {
      if (cars.length > 0) {
        const bounds = L.latLngBounds(
          cars
            .filter((car) => car.location && car.location.coordinates)
            .map((car) => L.latLng(car.location.coordinates[1], car.location.coordinates[0]))
        );
        map.fitBounds(bounds);
      }
    },
  });
  return null;
};

interface MapComponentProps {
  cars?: Car[];
  userLocation: UserLocation | null;
}

const MapComponent: React.FC<MapComponentProps> = ({ cars = [], userLocation }) => {
  // useEffect(() => {
  //   fixLeafletIcons();
  // }, [cars]);

  return (
    <div className="relative h-full w-full">
      {/* Legend Overlay */}
      <div className="absolute top-4 right-4 z-[1000] bg-white rounded-lg shadow-lg p-4">
        <div className="flex items-center space-x-2 mb-3 text-primary font-semibold">
          <LuNavigation className="w-5 h-5" />
          <span>Map Guide</span>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex items-center space-x-2 text-blue-600">
            <LuMapPin className="w-4 h-4" />
            <span>Your Location</span>
          </div>
          <div className="flex items-center space-x-2 text-red-500">
            <div className="w-4 h-4">🚗</div>
            <span>Available Cars</span>
          </div>
        </div>
      </div>

      {/* Main Map Container */}
      <MapContainer
        center={userLocation ? [userLocation.lat, userLocation.lng] : [23.8103, 90.4125]}
        zoom={13}
        scrollWheelZoom={false}
        className="h-full w-full rounded-xl shadow-2xl"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <RecentMapLocation userLocation={userLocation} />
        <MapEventHandler cars={cars} />

        {userLocation && (
          <Marker position={[userLocation.lat, userLocation.lng]}>
            <Popup className="rounded-lg overflow-hidden">
              <div className="p-2 bg-blue-50">
                <p className="font-semibold text-blue-600">📍 Your Location</p>
              </div>
            </Popup>
          </Marker>
        )}

        {Array.isArray(cars) && cars.length > 0 ? (
          cars
            .filter((car) => car.location && car.location.coordinates)
            .map((car) => (
              <Marker 
                key={car.id} 
                position={[car.location.coordinates[1], car.location.coordinates[0]]}
              >
                <Popup className="rounded-lg overflow-hidden">
                  <div className="max-w-xs">
                    <div className="relative">
                      <img 
                        className="w-full h-32 object-cover" 
                        src={car.image} 
                        alt={car.model}
                      />
                      <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                        <span className="font-bold text-green-600">${car.price}</span>
                        <span className="text-sm text-gray-600">/day</span>
                      </div>
                    </div>
                    <div className="p-3 bg-white">
                      <h3 className="font-semibold text-lg text-gray-800 mb-1">{car.model}</h3>
                      <div className="flex items-center space-x-2">
                        <LuMapPin className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">Available for pickup</span>
                      </div>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))
        ) : (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[1000] bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg">
            <div className="flex items-center space-x-2 text-gray-600">
              <span className="text-xl">🚫</span>
              <span>No vehicles available in this area</span>
            </div>
          </div>
        )}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
