import React from 'react';
import { useFormContext } from 'react-hook-form';

const HostInformation: React.FC = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <>
      <div className="mb-4">
        <label htmlFor="hostName" className="block font-semibold mb-2">Host Name</label>
        <input
          id="hostName"
          className="w-full border border-gray-300 rounded p-2"
          {...register('host.name', { required: 'Host name is required' })}
        />
        {errors.host && 'name' in errors.host && typeof errors.host.name?.message === 'string' && (
          <p className="text-red-500">{errors.host.name.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="hostEmail" className="block font-semibold mb-2">Host Email</label>
        <input
          id="hostEmail"
          type="email"
          className="w-full border border-gray-300 rounded p-2"
          {...register('host.email', { required: 'Host email is required' })}
        />
        {errors.host && 'email' in errors.host && typeof errors.host.email?.message === 'string' && (
          <p className="text-red-500">{errors.host.email.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="carImage" className="block font-semibold mb-2">Car Image Upload</label>
        <input
          id="carImage"
          type="file"
          accept="image/*"
          className="w-full border border-gray-300 rounded p-2"
          {...register('carImage', { required: 'Car image is required' })}
        />
        {errors.carImage && typeof errors.carImage.message === 'string' && (
          <p className="text-red-500">{errors.carImage.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="uploadCarImages" className="block font-semibold mb-2">Upload Car Images</label>
        <input
          id="uploadCarImages"
          type="file"
          accept="image/*"
          multiple
          className="w-full border border-gray-300 rounded p-2"
          {...register('carImages', { required: 'At least one car image is required' })}
        />
        {errors.carImages && typeof errors.carImages.message === 'string' && (
          <p className="text-red-500">{errors.carImages.message}</p>
        )}
      </div>
    </>
  );
};

export default HostInformation;
