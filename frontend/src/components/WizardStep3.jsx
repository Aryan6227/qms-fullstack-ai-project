// src/components/WizardStep3.jsx
import React from 'react';

const WizardStep3 = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="space-y-4 animate-fadeIn">
      <div className="p-4 border rounded-md bg-white">
        <h3 className="font-semibold text-slate-700 border-b pb-2 mb-4">People & Assignment</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="initiator" className="text-sm font-medium text-slate-600 mb-1">Initiator / Reported By *</label>
            <input type="text" id="initiator" name="initiator" value={formData.initiator} onChange={handleChange} placeholder="Name of person who discovered the event" className="p-2 border rounded-md text-sm" required />
          </div>
          <div className="flex flex-col">
            <label htmlFor="event_owner" className="text-sm font-medium text-slate-600 mb-1">Event Owner *</label>
            <select id="event_owner" name="event_owner" value={formData.event_owner} onChange={handleChange} className="p-2 border rounded-md text-sm bg-white" required>
              <option value="">Assign an owner...</option>
              <option value="Alice Johnson">Alice Johnson</option>
              <option value="Bob Williams">Bob Williams</option>
              <option value="Charlie Brown">Charlie Brown</option>
            </select>
          </div>
          <div className="flex flex-col md:col-span-2">
            <label htmlFor="team_members" className="text-sm font-medium text-slate-600 mb-1">Team Members</label>
            <input type="text" id="team_members" name="team_members" value={formData.team_members} onChange={handleChange} placeholder="Comma-separated names" className="p-2 border rounded-md text-sm" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WizardStep3;