import React from 'react';

const BookAutoRental: React.FC = () => {
  return (
    <div>
      <div className='mx-auto justify-center items-center'>
        <h3 className='text-center lg:mt-24'>RENT NOW </h3>
        <h2 className='text-center mt-4 text-3xl font-extrabold font-lato '>Book Auto Rental </h2>
        
      </div>
      <div className='flex gap-6 mt-6 mb-6 bg-[#292626] p-8 rounded-full'>
        <select 
                    className="select select-bordered w-full max-w-xs"
                   // Handle change
                >
                    <option disabled value="">Choose Car Types </option>
                    <option value="electronics">Economy Cars </option>
                    <option value="wearables">Luxurey Cars</option>
                    <option value="Home Appliances">Sport Cars</option>
                    <option value="Home Appliances">Sedan</option>
                </select>
        <select 
                    className="select select-bordered w-full max-w-xs"
                   // Handle change
                >
                    <option disabled value="">Pick Up Locations</option>
                    <option value="electronics">Uttora </option>
                    <option value="wearables">Mripur-1</option>
                    <option value="Home Appliances">Saver</option>
                    <option value="Home Appliances">Ajimpur</option>
                    <option value="Home Appliances">Mirpur-2</option>
                </select>

                <input 
            id="pickup-date"
            type="date"
            className="mt-1 block w-full max-w-xs border border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm placeholder:"
            placeholder=''
          />
          <select 
                    className="select select-bordered w-full max-w-xs"
                   // Handle change
                >
                    <option disabled value="">Drop Off Locations</option>
                    <option value="electronics">Uttora </option>
                    <option value="wearables">Mripur-1</option>
                    <option value="Home Appliances">Saver</option>
                    <option value="Home Appliances">Ajimpur</option>
                    <option value="Home Appliances">Mirpur-2</option>
                </select>
                <input 
            id="pickup-date"
            type="date"
            className="mt-1 block w-full max-w-xs border border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm placeholder:"
            placeholder='Return Date'
          />


        </div>
    </div>
  );
};

export default BookAutoRental;