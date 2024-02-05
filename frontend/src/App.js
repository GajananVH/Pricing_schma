import React, { useState } from 'react';
import './App.css';

function App() {
  const [distance, setDistance] = useState(0);
  const [time, setTime] = useState(0);
  const [waitingTime, setWaitingTime] = useState(0);
  const [price, setPrice] = useState(null);

  const calculatePrice = async () => {
    try {
      const response = await fetch('http://localhost:3001/calculatePrice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "distance": distance,
          "time": time,
          "waitingTime": waitingTime, 
          "dayOfWeek": "Tue",
        }),
      });

      if (!response.ok) {
        console.log("No response")
        throw new Error(`Request failed with status: ${response.status}`);
      }

      const data = await response.json();
      setPrice(data.price);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div>
      <h1>Pricing Module</h1>
      <label>
        Distance (in km):
        <input type="number" value={distance} onChange={(e) => setDistance(e.target.value)} />
      </label>
      <br />
      <label>
        Time (in hours):
        <input type="number" value={time} onChange={(e) => setTime(e.target.value)} />
      </label>
      <br />
      <label>
        Waiting Time (in minutes):
        <input type="number" value={waitingTime} onChange={(e) => setWaitingTime(e.target.value)} />
      </label>
      <br />
      <button onClick={calculatePrice}>Calculate Price</button>
      {price !== null && <p>Total Price: {price}</p>}
    </div>
  );
}

export default App;
