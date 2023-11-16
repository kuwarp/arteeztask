const express = require('express');
const bodyParser = require('body-parser');
const database= require('./src/DB/config')
const app = express();
const PORT = process.env.PORT || 3000;
const Auth=require('./src/Api/userApi')
const Library= require('./src/Api/libraryApi')
database.connect()

app.use(bodyParser.json());

// User API
app.post('/api/users',Auth.addUser);
app.post('/api/users/login',Auth.login);


// Library APi

app.post('/api/createbooks',Library.createBooks );
app.get('/api/books', Library.getAllBooks);
app.post('/api/borrow/:bookId/:userId',Library.borrowBook);
app.post('/api/return/:bookId/:userId',Library.returnBook);
app.get('/api/users/:userId/books', Library.listOfBooks);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});