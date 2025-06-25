import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ title: '', content: '' });

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const res = await axios.get('http://localhost:5000/notes');
    setNotes(res.data);
  };

  const addNote = async () => {
    if (!form.title || !form.content) return;
    await axios.post('http://localhost:5000/notes', form);
    setForm({ title: '', content: '' });
    fetchNotes();
  };

  const deleteNote = async (id) => {
    await axios.delete(`http://localhost:5000/notes/${id}`);
    fetchNotes();
  };

  return (
  <div className="app-container">
    <h2>📝 Let's Note It!</h2>

    <input
      type="text"
      placeholder="Title"
      value={form.title}
      onChange={(e) => setForm({ ...form, title: e.target.value })}
    />
    <textarea
      placeholder="Content"
      value={form.content}
      onChange={(e) => setForm({ ...form, content: e.target.value })}
    />
    <button onClick={addNote}>Add Note</button>

    <div>
      {notes.map((note) => (
        <div className="note" key={note._id}>
          <div>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
          </div>
          <button onClick={() => deleteNote(note._id)}>Delete</button>
        </div>
      ))}
    </div>
  </div>
);
}
export default App;
