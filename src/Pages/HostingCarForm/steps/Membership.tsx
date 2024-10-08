import React from 'react';
import Select from 'react-select';
import { useFormContext } from 'react-hook-form';

// Define membership and plan options
const membershipOptions = [
  { value: 'basic', label: 'Basic' },
  { value: 'premium', label: 'Premium' },
  { value: 'vip', label: 'VIP' },
];

const planOptions = [
  { value: 'basic_coverage', label: 'Basic Coverage' },
  { value: 'standard_coverage', label: 'Standard Coverage' },
  { value: 'premium_coverage', label: 'Premium Coverage' },
];

const Membership: React.FC = () => {
  const { register, setValue, formState: { errors } } = useFormContext();

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
        />
        {errors.membership && (
          <p className="text-red-500">{errors.membership.message}</p>
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
        />
        {errors.plan && (
          <p className="text-red-500">{errors.plan.message}</p>
        )}
      </div>
    </div>
  );
};

export default Membership;
