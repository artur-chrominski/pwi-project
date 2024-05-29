import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [inputValue, setInputValue] = useState("");
  const [message, setMessage] = useState("");

  const handleAddData = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://pwi-project-server.vercel.app//add-data", { data: inputValue });
      setMessage(response.data);
      setInputValue("");
    } catch (error) {
      setMessage("Error adding data: " + error.message);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleAddData}>
          <input 
            type="text" 
            value={inputValue} 
            onChange={(e) => setInputValue(e.target.value)} 
            placeholder="Enter some text" 
          />
          <button type="submit">Add Data</button>
        </form>
        <p>{message}</p>
      </header>
    </div>
  );
}

export default App;
