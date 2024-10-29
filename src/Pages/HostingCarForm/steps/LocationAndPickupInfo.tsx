/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Select from 'react-select';
import debounce from 'lodash/debounce';

interface Location {
  display_name: string;
  lat: string;
  lon: string;
}

const LocationAndPickupInfo: React.FC = () => {
  const { register, setValue,  formState: { errors } } = useFormContext();
  const [suggestions, setSuggestions] = useState<Location[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchLocation = debounce(async (query: string) => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query
        )}&limit=5`
      );
      const data = await response.json();
      setSuggestions(data);
      setShowSuggestions(true);
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  }, 500);

  const handleLocationSelect = (location: Location) => {
    setValue('locationAndPickupInfo.city', location.display_name);
    setValue('locationAndPickupInfo.coordinates', {
      lat: parseFloat(location.lat),
      lng: parseFloat(location.lon),
    });
    console.log('Selected coordinates:', {
      lat: parseFloat(location.lat),
      lng: parseFloat(location.lon)
    });
    setSuggestions([]);
    setShowSuggestions(false);
  };

  // const timeOptions = Array.from({ length: 24 }, (_, i) => {
  //   const hour = i % 12 === 0 ? 12 : i % 12; 
  //   const period = i < 12 ? 'AM' : 'PM';
  //   return { value: `${i}:00`, label: `${hour}:00 ${period}` };
  // });

  const timeOptions = [
    { value: '9:00 AM', label: '9:00 AM' },
    { value: '10:00 AM', label: '10:00 AM' },
    { value: '11:00 AM', label: '11:00 AM' },
    { value: '12:00 PM', label: '12:00 PM' },
    { value: '1:00 PM', label: '1:00 PM' },
    { value: '2:00 PM', label: '2:00 PM' },
    { value: '3:00 PM', label: '3:00 PM' },
    { value: '4:00 PM', label: '4:00 PM' },
    { value: '5:00 PM', label: '5:00 PM' },
    { value: '6:00 PM', label: '6:00 PM' },
    { value: '7:00 PM', label: '7:00 PM' },
  ];

  const handleStartTimeChange = (selectedOption: any) => {
    setValue('locationAndPickupInfo.openingHours.start', selectedOption?.value);
  };

  const handleEndTimeChange = (selectedOption: any) => {
    setValue('locationAndPickupInfo.openingHours.end', selectedOption?.value);
  };

  return (
    <>
      <div className="mb-4 relative">
        <label htmlFor="city" className="block font-semibold mb-2">City</label>
        <input
          className="text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-indigo-300 hover:shadow-lg hover:border-indigo-300 bg-gray-100"
          {...register('locationAndPickupInfo.city', { required: 'City is required' })}
          onChange={(e) => searchLocation(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
        />
        
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute z-10 w-full bg-white mt-1 rounded-lg shadow-lg border border-gray-200">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleLocationSelect(suggestion)}
              >
                {suggestion.display_name}
              </div>
            ))}
          </div>
        )}

        {errors.locationAndPickupInfo && 'city' in errors.locationAndPickupInfo && 
          typeof errors.locationAndPickupInfo.city?.message === 'string' && (
          <p className="text-red-500">{errors.locationAndPickupInfo.city.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="pickupPoint" className="block font-semibold mb-2">Pickup Point</label>
        <input
          className="text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-indigo-300 hover:shadow-lg hover:border-indigo-300 bg-gray-100"
          {...register('locationAndPickupInfo.pickupPoint', { required: 'Pickup point is required' })}
        />
        {errors.locationAndPickupInfo && 'pickupPoint' in errors.locationAndPickupInfo && typeof errors.locationAndPickupInfo.pickupPoint?.message === 'string' && (
          <p className="text-red-500">{errors.locationAndPickupInfo.pickupPoint.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-2">Opening Hours</label>
        <div className="flex gap-4">
          <Select
            options={timeOptions}
            onChange={handleStartTimeChange}
            placeholder="Start Time"
            className="flex-1"
            styles={{
              control: (provided, { isFocused }) => ({
                ...provided,
                border: `1px solid ${isFocused ? '#4f46e5' : '#d1d5db'}`,
                borderRadius: '0.5rem',
                backgroundColor: '#f9fafb',
                boxShadow: isFocused ? '0 0 0 1px rgba(79, 70, 229, 0.5)' : '0 1px 2px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
              }),
            }}
          />
          
          <span className="self-center">to</span>
          
          <Select
            options={timeOptions}
            onChange={handleEndTimeChange}
            placeholder="End Time"
            className="flex-1"
            styles={{
              control: (provided, { isFocused }) => ({
                ...provided,
                border: `1px solid ${isFocused ? '#4f46e5' : '#d1d5db'}`,
                borderRadius: '0.5rem',
                backgroundColor: '#f9fafb',
                boxShadow: isFocused ? '0 0 0 1px rgba(79, 70, 229, 0.5)' : '0 1px 2px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
              }),
            }}
          />
        </div>
      </div>
    </>
  );
};

export default LocationAndPickupInfo;

