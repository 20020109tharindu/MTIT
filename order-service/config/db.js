const mongoose = require('mongoose');

// connectDB is an async function that opens the connection to MongoDB Atlas.
// It is called once when the server starts, before app.listen().
const connectDB = async () => {
  try {
    // mongoose.connect() uses the MONGO_URI value from the .env file.
    // "await" pauses here until the connection is fully established.
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB (order-db)');
  } catch (err) {
    // If connection fails (wrong password, network issue, IP not whitelisted),
    // print the error and shut down the app — it's useless without a database.
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

// Export so src/index.js can import and call this function.
module.exports = connectDB;
