// src/components/WizardStep5.jsx
import React from 'react';

const WizardStep5 = ({ formData }) => {
  // Helper to make field names more readable
  const fieldLabels = {
    event_type: 'Event Type',
    event_title: 'Event Title',
    event_description: 'Description',
    severity: 'Severity',
    priority: 'Priority',
    occurrence_date: 'Occurrence Date',
    occurrence_time: 'Occurrence Time',
    department: 'Department',
    location: 'Location / Equipment',
    initiator: 'Initiator',
    event_owner: 'Event Owner',
    team_members: 'Team Members',
    immediate_actions: 'Immediate Actions Taken'
  };

  return (
    <div className="space-y-4 animate-fadeIn">
      <div className="p-4 border rounded-md bg-white">
        <h3 className="font-semibold text-slate-700 border-b pb-2 mb-4">Review & Submit</h3>
        <p className="text-sm text-slate-500 mb-4">Please review all entered information for accuracy before logging the new event record.</p>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-sm">
          {Object.entries(formData).map(([key, value]) => (
            fieldLabels[key] && (
              <div key={key} className="p-2 rounded bg-slate-50/50">
                <dt className="font-semibold text-slate-600">{fieldLabels[key]}</dt>
                <dd className="text-slate-800 whitespace-pre-wrap">{value || 'N/A'}</dd>
              </div>
            )
          ))}
        </dl>
      </div>
    </div>
  );
};

export default WizardStep5;