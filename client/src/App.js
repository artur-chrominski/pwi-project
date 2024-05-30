import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");
  const [data, setData] = useState([]);

  const handleAddData = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://pwi-project-server.vercel.app/add-data", {
        firstName,
        lastName,
        email,
        text
      });
      setMessage(response.data);
      setFirstName("");
      setLastName("");
      setEmail("");
      setText("");
      fetchData(); // Pobierz dane po dodaniu nowego wpisu
    } catch (error) {
      console.error("Error adding data: ", error);
      setMessage("Error adding data: " + error.message);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("https://pwi-project-server.vercel.app/get-data");
      console.log("Fetched data: ", response.data); // Dodano logowanie
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleAddData}>
          <input 
            type="text" 
            value={firstName} 
            onChange={(e) => setFirstName(e.target.value)} 
            placeholder="First Name" 
          />
          <input 
            type="text" 
            value={lastName} 
            onChange={(e) => setLastName(e.target.value)} 
            placeholder="Last Name" 
          />
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Email" 
          />
          <textarea 
            value={text} 
            onChange={(e) => setText(e.target.value)} 
            placeholder="Enter some text" 
          />
          <button type="submit">Add Data</button>
        </form>
        <p>{message}</p>
        <div>
          <h2>Data from Firestore:</h2>
          <ul>
            {data.map(item => (
              <li key={item.id}>
                <p><strong>Name:</strong> {item.firstName} {item.lastName}</p>
                <p><strong>Email:</strong> {item.email}</p>
                <p><strong>Text:</strong> {item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </header>
    </div>
  );
}

export default App;
