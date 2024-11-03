/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Select from 'react-select';
import { useFormContext } from 'react-hook-form';

// Define membership and plan options
const membershipOptions = [
  { value: 'Standard', label: 'Standard' },
  { value: 'Premium', label: 'Premium' },
  { value: 'Elite', label: 'Elite' }
];

const planOptions = [
  { value: 'Basic_Coverage', label: 'Basic Coverage' },
  { value: 'Standard_Coverage', label: 'Standard Coverage' },
  { value: 'Comprehensive', label: 'Comprehensive Coverage' }
];

const Membership: React.FC = () => {
  const { setValue, formState: { errors } } = useFormContext();

  const handleMembershipChange = (selectedOption: any) => {
    setValue('membership', selectedOption ? selectedOption.value : '');
  };

  const handlePlanChange = (selectedOption: any) => {
    setValue('plan', selectedOption ? selectedOption.value : '');
  };

  return (
    <div>
      {/* Membership Type */}
      <div className="mb-4">
        <label className="block font-semibold mb-2">Membership Type</label>
        <Select
          options={membershipOptions}
          onChange={handleMembershipChange}
          classNamePrefix="select"
          placeholder="Select Membership"
          isClearable
          styles={{
            control: (provided, { isFocused }) => ({
              ...provided,  
              border: `1px solid ${isFocused ? '#4f46e5' : '#d1d5db'}`, 
              borderRadius: '0.5rem', 
              backgroundColor: '#f9fafb',
              boxShadow: isFocused ? '0 0 0 1px rgba(79, 70, 229, 0.5)' : '0 1px 2px rgba(0, 0, 0, 0.1)', 
              transition: 'border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out',
              transform: isFocused ? 'translateY(-0.25rem)' : 'translateY(0)', 
            }),
            menu: (provided) => ({
              ...provided,
              zIndex: 9999, 
            }),
          }}
        />
        {errors.membership && (
          <p className="text-red-500">{typeof errors.membership.message === 'string' ? errors.membership.message : ''}</p>
        )}
      </div>

      {/* Plan Type */}
      <div className="mb-4">
        <label className="block font-semibold mb-2">Plan Type</label>
        <Select
          options={planOptions}
          onChange={handlePlanChange}
          classNamePrefix="select"
          placeholder="Select Plan"
          isClearable
          styles={{
            control: (provided, { isFocused }) => ({
              ...provided,  
              border: `1px solid ${isFocused ? '#4f46e5' : '#d1d5db'}`, 
              borderRadius: '0.5rem', 
              backgroundColor: '#f9fafb',
              boxShadow: isFocused ? '0 0 0 1px rgba(79, 70, 229, 0.5)' : '0 1px 2px rgba(0, 0, 0, 0.1)', 
              transition: 'border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out',
              transform: isFocused ? 'translateY(-0.25rem)' : 'translateY(0)', 
            }),
            menu: (provided) => ({
              ...provided,
              zIndex: 9999, 
            }),
          }}
        />
        {errors.plan && (
          <p className="text-red-500">{typeof errors.plan.message === 'string' ? errors.plan.message : ''}</p>
        )}
      </div>
    </div>
  );
};

export default Membership;
