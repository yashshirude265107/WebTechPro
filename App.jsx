import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ title: "", author: "", year: "", genre: "", status: "" });

  useEffect(() => {
    axios.get("http://localhost:8081/books").then(res => setBooks(res.data));
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const addBook = () => {
    axios.post("http://localhost:8081/books", form).then(() => window.location.reload());
  };

  const deleteBook = (id) => {
    axios.delete(`http://localhost:8081/books/${id}`).then(() => window.location.reload());
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>📚 Library Management System 📚</h1>

      <input placeholder="Title" name="title" onChange={handleChange} /><>  </>
      <input placeholder="Author" name="author" onChange={handleChange} /><>  </>
      <input placeholder="Year" name="year" onChange={handleChange} /><>  </>
      <input placeholder="Genre" name="genre" onChange={handleChange} /><>  </>
      <input placeholder="Status" name="status" onChange={handleChange} /><>    </>
      <button onClick={addBook}>Add Book</button>

      <h2>All Books</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th><th>Title</th><th>Author</th><th>Year</th><th>Genre</th><th>Status</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {books.map((b) => (
            <tr key={b.id}>
              <td>{b.id}</td>
              <td>{b.title}</td>
              <td>{b.author}</td>
              <td>{b.year}</td>
              <td>{b.genre}</td>
              <td>{b.status}</td>
              <td><button onClick={() => deleteBook(b.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
