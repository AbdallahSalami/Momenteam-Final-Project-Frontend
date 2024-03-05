import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

import EventComponent from '../../components/event/eventComponent.tsx'; // Adjust the import path as necessary
import './EventsPage.css'
interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  location:string;
  status: string;
  image: string; // Add the 'image' property
 
}

const EventPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [userEvents, setUserEvents] = useState<Event[]>([]);

  const token: string | null = sessionStorage.getItem('token');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/events');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Event[] = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    const fetchUserEvents = async (userId: number) => {
      try {
        const response = await fetch(`http://localhost:8000/api/users/${userId}/with-events`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: {events: Event[]} = await response.json();
        setUserEvents(data.events);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    
    fetchEvents();
    if (token) fetchUserEvents(Number(jwtDecode(token).sub)) 
  }, [token]);
 
  return (
    <div className='mainEventPage'>

      <div className='titleMainEventPage'>
        <h1>Events</h1>
      </div>
      <div className='mainEventComponent'>
      {/* {events.map((event) =>
 new Date(event.date) < today ? (
    <EventComponent key={event.id} event={event} userEvents={userEvents} />
 ) : null
)} */}
      {events.map((event) =>
    <EventComponent key={event.id} event={event} userEvents={userEvents} />)}

      </div>
      
    </div>
  );
};  

export default EventPage;
