// src/components/EventsTable.jsx

import React from 'react';

const EventsTable = ({ events }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-slate-50">
            <th className="p-3 text-left font-semibold text-slate-600">Event ID</th>
            <th className="p-3 text-left font-semibold text-slate-600">Title</th>
            <th className="p-3 text-left font-semibold text-slate-600">Type</th>
            <th className="p-3 text-left font-semibold text-slate-600">Status</th>
            <th className="p-3 text-left font-semibold text-slate-600">Due Date</th>
            <th className="p-3 text-left font-semibold text-slate-600">Initiator</th>
            <th className="p-3 text-left font-semibold text-slate-600">Severity</th>
            <th className="p-3 text-left font-semibold text-slate-600">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {events.map((event) => (
            <tr key={event.id} className="hover:bg-slate-50">
              <td className="p-3 text-indigo-600 font-medium cursor-pointer">{event.id}</td>
              <td className="p-3 text-slate-700">{event.title}</td>
              <td className="p-3 text-slate-700">{event.type}</td>
              <td className="p-3">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    event.status === 'In Progress' ? 'bg-amber-100 text-amber-800' :
                    event.status === 'Planned' ? 'bg-sky-100 text-sky-800' :
                    'bg-emerald-100 text-emerald-800'
                  }`}>
                  {event.status}
                </span>
              </td>
              <td className="p-3 text-slate-700">{event.dueDate}</td>
              <td className="p-3 text-slate-700">{event.initiator}</td>
              <td className="p-3 text-slate-700">{event.severity}</td>
              <td className="p-3 text-slate-500">...</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventsTable;