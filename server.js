const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "dipu2221",
    database : "library_db"
});

db.connect(err => {
    if(err) console.log("DB connection error:",err);
    else console.log("Connected to mysql database!");
});

// Add book (create)
app.post('/books', (req, res) => {
    const{title, author, year, genre, status} = req.body;
    const sql = "INSERT INTO books(title, author, year, genre,status) values(?,?,?,?,?)";
    db.query(sql, [title, author, year, genre, status], (err, result) => {
        if(err) return res.json({error : err});
        res.json({message:"Book added successfully!"});
    });
});

// Read (get all books)
app.get('/books', (req, res) => {
    const sql = "select * from books";
    db.query(sql, (err, data) => {
        if(err) return res.json({error:err});
        res.json(data);
    });
});

//Update
app.put('/books/:id', (req, res) => {
  const { title, author, year, genre, status } = req.body;
  const { id } = req.params;
  const sql = "UPDATE books SET title=?, author=?, year=?, genre=?, status=? WHERE id=?";
  db.query(sql, [title, author, year, genre, status, id], (err, result) => {
    if (err) return res.json({ error: err });
    res.json({ message: "Book updated successfully!" });
  });
});


// Delete (Remove book)
app.delete('/books/:id', (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM books WHERE id=?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.json({ error: err });
    res.json({ message: "Book deleted successfully!" });
  });
});

app.listen(8081, () => console.log("Server running on port 8081"));