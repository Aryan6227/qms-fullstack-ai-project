// src/features/events/eventsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/events';

// Async thunk for fetching events
export const fetchEvents = createAsyncThunk('events/fetchEvents', async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

// NEW: Async thunk for creating a new event
export const addNewEvent = createAsyncThunk('events/addNewEvent', async (initialEvent) => {
  // The backend expects 'title' and 'type', we send a simplified object for now
  const response = await axios.post(API_URL, {
    title: initialEvent.event_title,
    type: initialEvent.event_type,
  });
  return response.data;
});

const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    items: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      // Reducers for fetchEvents
      .addCase(fetchEvents.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // NEW: Reducers for addNewEvent
      .addCase(addNewEvent.fulfilled, (state, action) => {
        // Add the new event returned from the API to our items array
        state.items.push(action.payload);
      });
  },
});

export default eventsSlice.reducer;