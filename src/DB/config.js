const mongoose = require('mongoose');

module.exports = {
  connect: () => {
    const MongoUri= 'mongodb+srv://kuwarp:ashu7017@bookstore.mt4fni0.mongodb.net/?retryWrites=true&w=majority'

    mongoose
      .connect(MongoUri)
      .then(() => {
        console.log('Connected to MongoDB Atlas');
      })
      .catch((error) => {
        console.error('Error connecting to MongoDB Atlas:', error);
      });
  },
};
