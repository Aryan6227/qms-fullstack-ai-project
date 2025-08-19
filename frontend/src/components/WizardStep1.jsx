// src/components/WizardStep1.jsx

import React from 'react';

const WizardStep1 = ({ formData, setFormData }) => {
  // This function updates the state in the parent component
  // every time the user types in an input field.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="space-y-4 animate-fadeIn">
      {/* Event Identification Section */}
      <div className="p-4 border rounded-md bg-white">
        <h3 className="font-semibold text-slate-700 border-b pb-2 mb-4">Event Identification</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Event Title */}
          <div className="flex flex-col">
            <label htmlFor="event_title" className="text-sm font-medium text-slate-600 mb-1">Event Title *</label>
            <input
              type="text"
              id="event_title"
              name="event_title"
              value={formData.event_title}
              onChange={handleChange}
              placeholder="e.g., Annual GMP Audit of Facility X"
              className="p-2 border rounded-md text-sm"
              required
            />
          </div>
          {/* Event Type */}
          <div className="flex flex-col">
            <label htmlFor="event_type" className="text-sm font-medium text-slate-600 mb-1">Event Type *</label>
            <select
              id="event_type"
              name="event_type"
              value={formData.event_type}
              onChange={handleChange}
              className="p-2 border rounded-md text-sm bg-white"
              required
            >
              <option value="">Select Type...</option>
              <option value="Deviation">Deviation</option>
              <option value="CAPA">CAPA (Corrective and Preventive Action)</option>
              <option value="Change Control">Change Control</option>
              <option value="Audit Finding">Audit Finding</option>
              <option value="Lab Investigation">Lab Investigation</option>
            </select>
          </div>
        </div>
      </div>

      {/* Description and Impact Section */}
      <div className="p-4 border rounded-md bg-white">
        <h3 className="font-semibold text-slate-700 border-b pb-2 mb-4">Description & Impact</h3>
         {/* Event Description */}
        <div className="flex flex-col mb-4">
            <label htmlFor="event_description" className="text-sm font-medium text-slate-600 mb-1">Event Description *</label>
            <textarea
              id="event_description"
              name="event_description"
              value={formData.event_description}
              onChange={handleChange}
              rows="4"
              placeholder="Describe the event in detail. What happened, where, and when?"
              className="p-2 border rounded-md text-sm"
              required
            ></textarea>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           {/* Severity */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-slate-600 mb-1">Severity *</label>
            <div className="flex space-x-4 pt-1">
              <label className="flex items-center"><input type="radio" name="severity" value="Low" onChange={handleChange} checked={formData.severity === 'Low'} className="mr-1"/> Low</label>
              <label className="flex items-center"><input type="radio" name="severity" value="Medium" onChange={handleChange} checked={formData.severity === 'Medium'} className="mr-1"/> Medium</label>
              <label className="flex items-center"><input type="radio" name="severity" value="High" onChange={handleChange} checked={formData.severity === 'High'} className="mr-1"/> High</label>
            </div>
          </div>
          {/* Priority */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-slate-600 mb-1">Priority *</label>
            <div className="flex space-x-4 pt-1">
              <label className="flex items-center"><input type="radio" name="priority" value="Low" onChange={handleChange} checked={formData.priority === 'Low'} className="mr-1"/> Low</label>
              <label className="flex items-center"><input type="radio" name="priority" value="Medium" onChange={handleChange} checked={formData.priority === 'Medium'} className="mr-1"/> Medium</label>
              <label className="flex items-center"><input type="radio" name="priority" value="High" onChange={handleChange} checked={formData.priority === 'High'} className="mr-1"/> High</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WizardStep1;