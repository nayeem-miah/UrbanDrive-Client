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
    <ol className="overflow-hidden space-y-8">
      {steps.map((step, index) => (
        <li key={step.id} className={`relative flex-1 ${
          index < steps.length - 1 ? 'after:content-[\'\'] after:w-0.5 after:h-full after:bg-indigo-600 after:inline-block after:absolute after:-bottom-11 after:left-1/2' : ''
        } ${index > currentStep ? 'after:bg-gray-200' : ''}`}>
          <div className="flex items-center justify-center gap-8 w-full max-w-sm">
            <div className={`flex items-center gap-3.5 p-3.5 rounded-xl relative z-10 border w-full ${
              index === currentStep ? 'bg-indigo-50 border-indigo-600' : 'bg-gray-50 border-gray-50'
            }`}>
              <div className={`rounded-lg flex items-center justify-center ${
                index === currentStep ? 'bg-indigo-600' : 'bg-gray-200'
              }`}>
                <span className={`p-3 ${index === currentStep ? 'text-white' : 'text-gray-600'}`}>
                  {/* SVG icon here */}
                </span>
              </div>
              <div className="flex items-start rounded-md justify-center flex-col">
                <h6 className="text-base font-semibold text-black mb-0.5">{step.title}</h6>
                <p className="text-xs font-normal text-gray-500">{step.description}</p>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
};

export default StepIndicator;