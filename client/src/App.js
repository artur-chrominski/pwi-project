import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [inputValue, setInputValue] = useState({ name: '', email: '', comment: '' });
  const [message, setMessage] = useState("");
  const [comments, setComments] = useState([]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://pwi-project-server.vercel.app/api/add-comment", inputValue);
      setMessage(response.data);
      setInputValue({ name: '', email: '', comment: '' });
      fetchComments();
    } catch (error) {
      setMessage("Error adding comment: " + error.message);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get("https://pwi-project-server.vercel.app/api/comments");
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleAddComment}>
          <input 
            type="text" 
            value={inputValue.name} 
            onChange={(e) => setInputValue({ ...inputValue, name: e.target.value })} 
            placeholder="Enter your name" 
          />
          <input 
            type="email" 
            value={inputValue.email} 
            onChange={(e) => setInputValue({ ...inputValue, email: e.target.value })} 
            placeholder="Enter your email" 
          />
          <textarea
            value={inputValue.comment} 
            onChange={(e) => setInputValue({ ...inputValue, comment: e.target.value })} 
            placeholder="Enter your comment"
          />
          <button type="submit">Add Comment</button>
        </form>
        <p>{message}</p>
        <ul>
          {comments.map((item) => (
            <li key={item.id}>
              <p><strong>{item.name}</strong> ({item.email})</p>
              <p>{item.comment}</p>
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
