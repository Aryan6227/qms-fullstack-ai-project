// src/components/WizardStep2.jsx
import React from 'react';

const WizardStep2 = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="space-y-4 animate-fadeIn">
      <div className="p-4 border rounded-md bg-white">
        <h3 className="font-semibold text-slate-700 border-b pb-2 mb-4">Event Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="occurrence_date" className="text-sm font-medium text-slate-600 mb-1">Occurrence Date *</label>
            <input type="date" id="occurrence_date" name="occurrence_date" value={formData.occurrence_date} onChange={handleChange} className="p-2 border rounded-md text-sm" required />
          </div>
          <div className="flex flex-col">
            <label htmlFor="occurrence_time" className="text-sm font-medium text-slate-600 mb-1">Occurrence Time</label>
            <input type="time" id="occurrence_time" name="occurrence_time" value={formData.occurrence_time} onChange={handleChange} className="p-2 border rounded-md text-sm" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="department" className="text-sm font-medium text-slate-600 mb-1">Department *</label>
            <select id="department" name="department" value={formData.department} onChange={handleChange} className="p-2 border rounded-md text-sm bg-white" required>
              <option value="">Select Department...</option>
              <option value="Manufacturing">Manufacturing</option>
              <option value="Quality Control">Quality Control</option>
              <option value="Quality Assurance">Quality Assurance</option>
              <option value="Warehouse">Warehouse</option>
              <option value="Engineering">Engineering</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="location" className="text-sm font-medium text-slate-600 mb-1">Location / Equipment ID</label>
            <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} placeholder="e.g., Manufacturing Line 3 / R-101" className="p-2 border rounded-md text-sm" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WizardStep2;