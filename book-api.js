const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

let books = [];

app.use(cors());

// configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.post('/book', (req, res) => {
    const book = req.body;

    // output book to console for debugging
    console.log(book);
    books.push(book);

    res.send('Book is added to the database');
});

app.get('/books', (req, res) => {
    res.json(books);
});

app.post('/book/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    const newBook = req.body;

    //remove item from array
    for (let i = 0; i < books.length; ++i) {
        let book = books[i];

        if (book.isbn === isbn) {
            books[i] = newBook;
        }
    }

    // sending 404 when something not found is good practice
    res.send('Book is Edited');
});

app.get('/book/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    const book = books.find(b => b.isbn === isbn);

    if (book) {
        res.json(book);
    } 
    
    else {
        res.status(404).send('Book not found');
    }
});

app.delete('/book/:isbn', (req, res) => {
    const isbn = req.params.isbn;

    for (let i = 0; i < books.length; ++i) {
        let book = books[i];

        if (book.isbn === isbn) {
            books.splice(i, 1);
        }
    }

    res.send('Book is Deleted');
})

app.listen(port, () => console.log('Hello world app listening on port'));