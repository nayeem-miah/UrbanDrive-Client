import { motion } from 'framer-motion';

const steps = [
  { title: 'Basic Car Information', description: 'Completed' },
  { title: 'Rental Details', description: 'Completed' },
  { title: 'Location and Pickup Information', description: 'Pending' },
  { title: 'Host Information', description: 'Pending' },
  { title: 'Membership and Plan', description: 'Pending' },
  { title: 'Additional Information', description: 'Pending' },
];

const StepIndicator = ({ currentStep }: { currentStep: number }) => {
  return (
    <div className="flex items-start max-md:flex-col gap-y-6 gap-x-3 max-w-screen-lg mx-auto px-4 font-sans">
      {steps.map((step, index) => (
        <div key={index} className="w-full">
          <motion.div
            className="w-full h-1 rounded-xl"
            initial={{ backgroundColor: '#D1D5DB' }}
            animate={{
              backgroundColor: index < currentStep ? '#10B981' : '#D1D5DB'
            }}
            transition={{ duration: 0.5 }}
          />
          <div className="mt-2 mr-4 flex">
            {index+1 < currentStep ? (
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                className="shrink-0 fill-green-500"
                viewBox="0 0 24 24"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <path d="M9.7 11.3c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l3 3c.2.2.4.3.7.3s.5-.1.7-.3l7-8c.3-.5.3-1.1-.2-1.4-.4-.3-1-.3-1.3.1L12 13.5z" />
                <path d="M21 11c-.6 0-1 .4-1 1 0 4.4-3.6 8-8 8s-8-3.6-8-8c0-2.1.8-4.1 2.3-5.6C7.8 4.8 9.8 4 12 4c.6 0 1.3.1 1.9.2.5.2 1.1-.1 1.3-.7s-.2-1-.7-1.2h-.1c-.8-.2-1.6-.3-2.4-.3C6.5 2 2 6.5 2 12.1c0 2.6 1.1 5.2 2.9 7 1.9 1.9 4.4 2.9 7 2.9 5.5 0 10-4.5 10-10 .1-.6-.4-1-.9-1z" />
              </motion.svg>
            ) : null}
            <div className={index +1 < currentStep ? "ml-2" : ""}>
              <motion.h6
                className={`text-base font-bold ${
                  index+1 < currentStep ? 'text-green-500' : 'text-gray-400'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {step.title}
              </motion.h6>
              <motion.p
                className={`text-xs ${
                  index+1 < currentStep ? 'text-green-500' : 'text-gray-400'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.1 }}
              >
                {index+1 < currentStep ? 'Completed' : 'Pending'}
              </motion.p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;