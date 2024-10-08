/**
 * using epress server am doing the following
 * 1. Connect to MongoDB using mongoose.
 * 2. Load environment variables from a .env file using dotenv.
 * 3. Create an Express application.
 * 4. Parse incoming JSON requests.
 * 5. Parse cookies attached to the client request.
 * 6. Register routers for handling API routes related to users, authentication, and listings.
 * 7. Serve static files from the client/dist directory.
 * 8. Catch any errors that occur in the application and send a JSON response with error details.
 * 9. Start the server on port 3000.
 * 10. Log a success message if the server starts successfully.
 * 
 */

import express from 'express'; //A web application framework for Node.js.
import mongoose from 'mongoose'; //A library to interact with MongoDB.
import dotenv from 'dotenv'; //Loads environment variables from a .env file.
import cors from 'cors'; 
import userRouter from './routes/user.route.js'; //Imports the user router.
import authRouter from './routes/auth.route.js'; //Imports the auth router.
import listingRouter from './routes/listing.route.js'; //Imports the listing router.
import cookieParser from 'cookie-parser'; //Middleware to parse cookies.
import path from 'path'; //Middleware to parse cookies.
dotenv.config();
if (!process.env.MONGO) { //Checks if the MONGO environment variable is defined. If not, it logs an error and exits the process.
  console.error('MONGO environment variable is not defined');
  process.exit(1);
}

//Connects to MongoDB using the connection string stored in process.env.MONGO.
//If the connection is successful, it logs a success message. If not, it logs an error message.
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((err) => {
    console.log(err);
  });

  const __dirname = path.resolve();

const app = express(); //Initializes an Express application.

app.use(express.json()); //Parses incoming JSON requests and makes the data available in req.body.

app.use(cookieParser());//Parses cookies attached to the client request.
//modifiedcode
app.use(cors({
  origin: ['http://localhost:5173'], // Frontend URL
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  credentials: true, // Enable credentials (cookies, authorization headers)
}));
//modified code


//Start the Server
app.listen(3000, () => {
  console.log('Server is running on port 3000!');
});
//Registers routers for handling API routes related to users, authentication, and listings.
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);

//Serves static files from the client/dist directory.
app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})
//Catches any errors that occur in the application and sends a JSON response with error details.


app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});