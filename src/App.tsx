import { useState } from 'react';
import './App.css';
import axios from 'axios';

interface EventType {
  title: string;
  date: string;
  time: string;
  location: string;
}

function App() {
  const [url, setUrl] = useState('');
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFetchEvents = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3001/events?url=${encodeURIComponent(url)}`);
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToGoogleCalendar = (event: EventType) => {
    // Logic to add events to Google Calendar
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
    <h1 className="text-3xl font-bold text-blue-600 mb-4">
      Create Custom Calendar Based on URL
    </h1>
    <div className="mb-4">
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="border p-2 rounded-md text-red-500"
        placeholder="Enter URL"
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 ml-2"
        onClick={handleFetchEvents}
      >
        Fetch Events
      </button>
    </div>
    <div>
      {events.map((event, index) => (
        <div
          key={index}
          className="flex flex-col border p-4 mb-2 w-80"
        >
          <h2 className="font-bold text-lg mb-2">{event.title}</h2>
          <p>Date: {event.date}</p>
          <p>Time: {event.time}</p>
          <p>Location: {event.location}</p>
          <button
            className="bg-green-600 text-white px-4 py-1 mt-2"
            onClick={() => handleAddToGoogleCalendar(event)}
          >
            Add to Google Calendar
          </button>
        </div>
      ))}
    </div>
  </div>
  )
}

export default App
