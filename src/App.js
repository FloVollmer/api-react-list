import React, { useState, useEffect } from 'react';

const App = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const response = await fetch('https://api.publicapis.org/entries');
      const data = await response.json();
      setEntries(data.entries);
    } catch (error) {
      console.error('Error fetching entries:', error);
    }
  };

  return (
    <div>
      <h1>Entries</h1>
      <table>
        <thead>
          <tr>
            <th>API</th>
            <th>Description</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, index) => (
            <tr key={index}>
              <td>{entry.API}</td>
              <td>{entry.Description}</td>
              <td ><a href={entry.Link}>{entry.Link}</a></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;