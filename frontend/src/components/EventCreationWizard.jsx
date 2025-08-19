// src/components/EventCreationWizard.jsx

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewEvent } from '../features/events/eventsSlice';

import WizardStep1 from './WizardStep1';
import WizardStep2 from './WizardStep2';
import WizardStep3 from './WizardStep3';
import WizardStep4 from './WizardStep4';
import WizardStep5 from './WizardStep5'; // Import Step 5

const EventCreationWizard = ({ onSubmissionSuccess }) => {
  const dispatch = useDispatch(); // Get the dispatch function
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    event_type: '', event_title: 'Test Event from React', event_description: '', severity: 'Medium', priority: 'Medium',
    occurrence_date: '2025-08-20', occurrence_time: '', department: 'Quality Control', location: '',
    initiator: 'React App', event_owner: '', team_members: '',
    immediate_actions: '',
  });

  const totalSteps = 5;

  const handleNext = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            dispatch(addNewEvent(formData)).unwrap();
            alert('Event successfully submitted!');
            onSubmissionSuccess(); // <<< ADD THIS LINE
        } catch (err) {
            alert('Failed to submit event: ' + err.message);
        }
    };

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold text-slate-700 mb-4">Log New QMS Event</h2>

      <div className="bg-slate-50 p-4 border rounded-lg shadow-sm min-h-[400px]">
        {currentStep === 1 && <WizardStep1 formData={formData} setFormData={setFormData} />}
        {currentStep === 2 && <WizardStep2 formData={formData} setFormData={setFormData} />}
        {currentStep === 3 && <WizardStep3 formData={formData} setFormData={setFormData} />}
        {currentStep === 4 && <WizardStep4 formData={formData} setFormData={setFormData} />}
        {currentStep === 5 && <WizardStep5 formData={formData} />}
      </div>

      <div className="mt-6 flex justify-between">
        <button 
          onClick={handlePrev} 
          disabled={currentStep === 1}
          className="px-4 py-2 bg-slate-200 text-slate-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        {currentStep < totalSteps ? (
          <button 
            onClick={handleNext} 
            className="px-4 py-2 bg-indigo-600 text-white rounded-md"
          >
            Next
          </button>
        ) : (
          <button 
            onClick={handleSubmit} 
            className="px-4 py-2 bg-green-600 text-white rounded-md"
          >
            Log New Event
          </button>
        )}
      </div>
    </div>
  );
};

export default EventCreationWizard;