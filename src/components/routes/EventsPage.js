import React, { Component } from 'react';
import EventList from '../events/VirtualizedEventsList';

class EventsPage extends Component {
  state = {  }
  render() {
    return (
      <div>
        <h1>Events Page</h1>
        <EventList />
      </div>
    );
  }
}

export default EventsPage;