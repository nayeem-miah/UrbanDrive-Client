import React from 'react';

interface Step {
  id: string;
  title: string;
  description: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ steps, currentStep }) => {
  return (
    <ol className="space-y-8">
      {steps.map((step, index) => (
        <li
          key={step.id}
          className={`relative flex-1 ${
            index < steps.length - 1
              ? `after:content-[''] after:w-0.5 after:h-full after:bg-${
                  index <= currentStep ? 'secondary' : 'gray-200'
                } after:inline-block after:absolute after:-bottom-12 after:left-4 lg:after:left-5`
              : ''
          }`}
        >
          <div className="flex items-center font-medium w-full">
            <span className={`w-8 h-8 ${index <= currentStep ? 'bg-secondary text-white' : 'bg-background text-primary'} border-1 border-${index <= currentStep ? 'transparent' : 'gray-200'} rounded-full flex justify-center items-center mr-3 lg:w-10 lg:h-10`}>
              {index < currentStep ? (
                <svg className="w-5 h-5 stroke-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12L9.28722 16.2923C9.62045 16.6259 9.78706 16.7927 9.99421 16.7928C10.2014 16.7929 10.3681 16.6262 10.7016 16.2929L20 7" stroke="stroke-current" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              ) : (
                index + 1
              )}
            </span>
            <div className="block">
              <h4 className={`text-lg ${index <= currentStep ? 'text-secondary' : 'text-text'}`}>{step.title}</h4>
              <span className="text-sm text-text">{step.description}</span>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
};

export default StepIndicator;
