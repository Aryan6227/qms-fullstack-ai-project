// src/components/WizardStep4.jsx
import React from 'react';

const WizardStep4 = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="space-y-4 animate-fadeIn">
      <div className="p-4 border rounded-md bg-white">
        <h3 className="font-semibold text-slate-700 border-b pb-2 mb-4">Attachments & Evidence</h3>
        <div className="flex flex-col">
          <label htmlFor="attachments" className="text-sm font-medium text-slate-600 mb-1">Upload Documents</label>
          <input type="file" id="attachments" name="attachments" className="text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100" />
          <p className="text-xs text-slate-400 mt-1">Upload any supporting photos, logs, or documents.</p>
        </div>
      </div>
      <div className="p-4 border rounded-md bg-white">
        <h3 className="font-semibold text-slate-700 border-b pb-2 mb-4">Immediate Actions Taken</h3>
        <div className="flex flex-col">
          <label htmlFor="immediate_actions" className="text-sm font-medium text-slate-600 mb-1">Describe any immediate actions performed</label>
          <textarea id="immediate_actions" name="immediate_actions" rows="4" value={formData.immediate_actions} onChange={handleChange} placeholder="e.g., Production on Line 3 was halted. Batch X was quarantined." className="p-2 border rounded-md text-sm"></textarea>
        </div>
      </div>
    </div>
  );
};

export default WizardStep4;