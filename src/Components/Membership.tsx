import React from 'react';
import { Link } from 'react-router-dom';

const Membership: React.FC = () => {
  return (
    <div className=" bg-white m-6 p-5">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Choose Your Membership Plan</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Basic Plan */}
          <div className="bg-base-100 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-700">Basic Plan</h2>
            <p className="text-gray-600 mb-4">Basic features for personal use</p>
            <p className="text-xl font-bold text-gray-800 mb-4">$0 / month</p>
            <ul className="list-disc list-inside mb-6 text-gray-600">
              <li>Basic car rental options</li>
              <li>Access to all locations</li>
              <li>Email support</li>
            </ul>
            <button className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600">
              Buy Now
            </button>
          </div>

          {/* Premium Plan */}
          <div className="bg-base-100 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-700">Premium Plan</h2>
            <p className="text-gray-600 mb-4">Advanced features for frequent users</p>
            <p className="text-xl font-bold text-gray-800 mb-4">$30 / month</p>
            <ul className="list-disc list-inside mb-6 text-gray-600">
              <li>All Basic features</li>
              <li>Priority customer support</li>
              <li>Exclusive deals and discounts</li>
            </ul>
            <Link to="/payment">
            <button className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600">
              Buy Now
            </button>
            </Link>
          </div>

          {/* VIP Plan */}
          <div className="bg-base-100 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-700">VIP Plan</h2>
            <p className="text-gray-600 mb-4">All-inclusive features for professionals</p>
            <p className="text-xl font-bold text-gray-800 mb-4">$100 / month</p>
            <ul className="list-disc list-inside mb-6 text-gray-600">
              <li>All Premium features</li>
              <li>Personalized rental options</li>
              <li>24/7 dedicated support</li>
            </ul>
            <button className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600">
              Buy Now
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Membership;