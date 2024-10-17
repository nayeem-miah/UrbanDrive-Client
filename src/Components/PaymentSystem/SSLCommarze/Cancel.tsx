import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Cancel: React.FC = () => {
  return (
    <motion.div
      className="min-h-screen flex flex-col justify-center items-center bg-yellow-100"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="text-4xl font-bold text-yellow-600 mb-4"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Payment Canceled
      </motion.h1>
      <motion.p
        className="text-lg text-gray-700 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        You have canceled the payment. If this was a mistake, please try again.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Link
          to="/"
          className="bg-gradient-to-r from-[#3d83d3] to-[#a306fd] text-white font-bold py-2 px-4 rounded mt-4"
        >
          Return Home
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default Cancel;
