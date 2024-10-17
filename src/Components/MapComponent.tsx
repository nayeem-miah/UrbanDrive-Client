// import React, { useEffect } from 'react';
// import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';
// import markerIcon from 'leaflet/dist/images/marker-icon.png';
// import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
// import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// // Fix Leaflet icon issue
// const fixLeafletIcons = () => {
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   delete (L.Icon.Default.prototype as any)._getIconUrl;
//   L.Icon.Default.mergeOptions({
//     iconRetinaUrl: markerIcon2x,
//     iconUrl: markerIcon,
//     shadowUrl: markerShadow,
//   });
// };

// interface Car {
//     id: number;
//     image:string,
//     model:string,
//     price: number;
//     location: {
//         coordinates: [number, number]; // [lng, lat]
//     };
// }

// interface MapComponentProps {
//     cars?: Car[]; // Optional to avoid undefined errors
//     userLocation?: { lat: number; lng: number } | null; 
// }
// const RecentMapLocation = ({ userLocation }: { userLocation?: { lat: number; lng: number } | null }) => {
//     const map = useMap();

//     useEffect(() => {
//         if (userLocation) {
//             // Set view to user's location with a zoom level of 13
//             map.setView([userLocation.lat, userLocation.lng], 13, { animate: true });
//         }
//     }, [userLocation, map]);

//     return null;
// };
// const MapEventHandler = ({ cars }: { cars: Car[] }) => {
//     const map = useMap();

//     useMapEvents({
//         click: () => {
//             // If there are cars, fit the map bounds to include all car markers
//             if (cars.length > 0) {
//                 const bounds = L.latLngBounds(
//                     cars.map(car => L.latLng(car.location.coordinates[1], car.location.coordinates[0]))
//                 );
//                 map.fitBounds(bounds);
//             }
//         }
//     });

//     return null;
// }

// const MapComponent: React.FC<MapComponentProps> = ({ cars = [], userLocation }) => { // Default to empty array
//     // const [selectedCar, setSelectedCar] = useState<Car | null>(null);
    
    


//    useEffect(() => {
//     fixLeafletIcons(); // Fix Leaflet icons on component mount

// }, [cars]);



//     return (
//         <MapContainer
//         center={userLocation ? [userLocation.lat, userLocation.lng] :  [23.8103, 90.4125]} // Default location if userLocation is invalid
//             zoom={13}
//             scrollWheelZoom={false}
//             style={{ height: "100%", width: "100%" }}
//         >
//             <TileLayer
//                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                 attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//             />
//              <RecentMapLocation userLocation={userLocation} />
//              <MapEventHandler cars={cars} />
//              {userLocation && (
//         <Marker position={[userLocation.lat, userLocation.lng]}>
//           <Popup>You are here!</Popup>
//         </Marker>
//       )}
//       {Array.isArray(cars) && cars.length > 0 ? (
//                         cars.map((car) => (
//                             <Marker key={car.id} position={[car.location.coordinates[1], car.location.coordinates[0]]}>
//                                 <Popup>
//                                   <img className='w-full h-[70px]' src={car.image} alt="" />
//                                   <p>Model: {car.model}</p>
//                                   <p>Price: ${car.price}</p>
//                                 </Popup>
//                             </Marker>
//                         ))
//                     ) : (
//                         <p>No cars available</p> // Show this message if no cars are available
//                     )}
//         </MapContainer>
//     );
// };

// export default MapComponent;



import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Leaflet আইকন সমস্যা সমাধান
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
  image: string;
  model: string;
  price: number;
  location: {
    coordinates: [number, number]; // [lng, lat]
  };
}

interface MapComponentProps {
  cars?: Car[]; // অবরোধ এড়াতে অপশনাল
  userLocation?: { lat: number; lng: number } | null;
}

const RecentMapLocation = ({ userLocation }: { userLocation?: { lat: number; lng: number } | null }) => {
  const map = useMap();

  useEffect(() => {
    if (userLocation) {
      // ব্যবহারকারীর অবস্থানে 13 জুম স্তর দিয়ে সেট করুন
      map.setView([userLocation.lat, userLocation.lng], 13, { animate: true });
    }
  }, [userLocation, map]);

  return null;
};

const MapEventHandler = ({ cars }: { cars: Car[] }) => {
  const map = useMap();

  useMapEvents({
    click: () => {
      // যদি গাড়ি থাকে তবে কার মার্কারগুলি অন্তর্ভুক্ত করতে মানচিত্রের সীমানা ফিট করুন
      if (cars.length > 0) {
        const bounds = L.latLngBounds(
          cars
            .filter((car) => car.location && car.location.coordinates) // বৈধ গাড়ি ফিল্টার করুন
            .map((car) => L.latLng(car.location.coordinates[1], car.location.coordinates[0]))
        );
        map.fitBounds(bounds);
      }
    },
  });

  return null;
};

const MapComponent: React.FC<MapComponentProps> = ({ cars = [], userLocation }) => {
  useEffect(() => {
    fixLeafletIcons(); // কম্পোনেন্ট মাউন্ট হওয়ার সময় Leaflet আইকন সমাধান করুন
  }, [cars]);

  return (
    <MapContainer
      center={userLocation ?[userLocation.lat, userLocation.lng]: [23.8103, 90.4125] } // ব্যবহারকারীর অবস্থান অনুপস্থিত হলে ডিফল্ট অবস্থান
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <RecentMapLocation userLocation={userLocation} />
      <MapEventHandler cars={cars} />

      {userLocation && (
        <Marker position={[userLocation.lat, userLocation.lng]}>
          <Popup>You are here!</Popup>
        </Marker>
      )}

      {Array.isArray(cars) && cars.length > 0 ? (
        cars
          .filter((car) => car.location && car.location.coordinates) // বৈধ গাড়ির তথ্য নিশ্চিত করুন
          .map((car) => (
            <Marker key={car.id} position={[car.location.coordinates[1], car.location.coordinates[0]]}>
              <Popup>
                <img className="w-full h-[70px]" src={car.image} alt="" />
                <p>Model: {car.model}</p>
                <p>Price: ${car.price}</p>
              </Popup>
            </Marker>
          ))
      ) : (
        <p>কোন গাড়ি উপলব্ধ নেই</p> // গাড়ি না থাকলে এই বার্তা দেখান
      )}
    </MapContainer>
  );
};

export default MapComponent;
