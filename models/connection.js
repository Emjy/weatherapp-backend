const mongoose = require('mongoose');

const connectionString = "mongodb+srv://EmilienJy:MVwAAIC5O6hySBov@cluster1.6v3kauk.mongodb.net/weather";

mongoose.connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log('Database connected'))
  .catch(error => console.error(error));
