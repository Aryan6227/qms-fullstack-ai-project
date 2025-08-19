// src/pages/EventListPage.jsx

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEvents } from '../features/events/eventsSlice';
import EventsTable from '../components/EventsTable';
import AIAssistant from '../components/AIAssistant'; // 1. Import the new component

const EventListPage = ({ onNavigateToCreate }) => {
  const dispatch = useDispatch();
  const [showFilters, setShowFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [eventIdFilter, setEventIdFilter] = useState('');
  const [titleFilter, setTitleFilter] = useState('');
  const [initiatorFilter, setInitiatorFilter] = useState('');
  const [severityFilter, setSeverityFilter] = useState('All');

  const events = useSelector((state) => state.events.items);
  const eventStatus = useSelector((state) => state.events.status);
  const error = useSelector((state) => state.events.error);

  useEffect(() => {
    if (eventStatus === 'idle' || events.length === 0) {
      dispatch(fetchEvents());
    }
  }, [eventStatus, dispatch, events.length]);

  const filteredEvents = events.filter(event => {
    return (
      (statusFilter === 'All' || event.status === statusFilter) &&
      (typeFilter === 'All' || event.type === typeFilter) &&
      (severityFilter === 'All' || event.severity === severityFilter) &&
      (event.id.toLowerCase().includes(eventIdFilter.toLowerCase())) &&
      (event.title.toLowerCase().includes(titleFilter.toLowerCase())) &&
      (event.initiator.toLowerCase().includes(initiatorFilter.toLowerCase()))
    );
  });

  let content;
  if (eventStatus === 'loading') content = <div>Loading...</div>;
  else if (eventStatus === 'succeeded') content = <EventsTable events={filteredEvents} />;
  else if (eventStatus === 'failed') content = <div>{error}</div>;

  // 2. Adjust the main layout to include the sidebar
  return (
    <div className="flex h-screen overflow-hidden">
      <main className="flex-grow p-6 bg-slate-50 flex flex-col">
        <div className="flex justify-between items-center mb-6 flex-shrink-0">
          <h1 className="text-2xl font-semibold text-slate-800">Event Management</h1>
          <div>
            <button onClick={() => setShowFilters(!showFilters)} className="inline-flex items-center justify-center px-4 py-2 border border-slate-300 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 mr-3">
              Filters
            </button>
            <button onClick={onNavigateToCreate} className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
              Log New Event
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="p-4 bg-slate-100 border border-slate-200 rounded-lg mb-6 animate-fadeIn flex-shrink-0">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <div className="flex flex-col"><label htmlFor="eventIdFilter" className="text-sm font-medium text-slate-600 mb-1">Event ID</label><input type="text" id="eventIdFilter" value={eventIdFilter} onChange={(e) => setEventIdFilter(e.target.value)} className="p-2 border rounded-md text-sm" /></div>
              <div className="flex flex-col"><label htmlFor="titleFilter" className="text-sm font-medium text-slate-600 mb-1">Title</label><input type="text" id="titleFilter" value={titleFilter} onChange={(e) => setTitleFilter(e.target.value)} className="p-2 border rounded-md text-sm" /></div>
              <div className="flex flex-col"><label htmlFor="typeFilter" className="text-sm font-medium text-slate-600 mb-1">Type</label><select id="typeFilter" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="p-2 border rounded-md text-sm bg-white"><option>All</option><option>Deviation</option><option>CAPA</option><option>Change Control</option><option>Audit Finding</option></select></div>
              <div className="flex flex-col"><label htmlFor="statusFilter" className="text-sm font-medium text-slate-600 mb-1">Status</label><select id="statusFilter" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="p-2 border rounded-md text-sm bg-white"><option>All</option><option>In Progress</option><option>Planned</option><option>Closed</option></select></div>
              <div className="flex flex-col"><label htmlFor="initiatorFilter" className="text-sm font-medium text-slate-600 mb-1">Initiator</label><input type="text" id="initiatorFilter" value={initiatorFilter} onChange={(e) => setInitiatorFilter(e.target.value)} className="p-2 border rounded-md text-sm" /></div>
              <div className="flex flex-col"><label htmlFor="severityFilter" className="text-sm font-medium text-slate-600 mb-1">Severity</label><select id="severityFilter" value={severityFilter} onChange={(e) => setSeverityFilter(e.target.value)} className="p-2 border rounded-md text-sm bg-white"><option>All</option><option>High</option><option>Medium</option><option>Low</option></select></div>
            </div>
          </div>
        )}

        <div className="bg-white p-6 rounded-lg shadow-sm flex-grow overflow-y-auto">
          {content}
        </div>
      </main>
      <AIAssistant />
    </div>
  );
};

export default EventListPage;