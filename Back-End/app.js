// const express = require('express');
// const connectDB = require('./db/connectdb');
// const studentRoutes = require('./routes/User');
// const nodemailer=require('nodemailer');
// const bodyParser = require('body-parser');
// const path = require('path');
// const app = express();
// //const cors = require('cors');

// const http = require('http');
// const { Server } = require('socket.io');
// const cors = require('cors');

// //const chatRoutes = require('../routes/chatRoutes');
// const initSocket = require('./sockets/chatSocket');


// //const jobRoutes = require('./routes/jobroutes');

// const cron=require('node-cron');
// const {fetchJobs }= require('./Controllers/jobController');

// app.use(cors());
// const PORT = process.env.PORT || 8000;
// app.use(bodyParser.json());
// //app.use(express.json());

// const _dirname = path.resolve();
// app.use(express.urlencoded({ extended: true }));
// const DATABASE_URL = 'mongodb+srv://ak452932:dtsQGKsqofJpPUBA@cluster0.64ixf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
// //mongodb+srv://username:my@pass@cluster.mongodb.net/db
// // Middleware to parse JSON requests

// cron.schedule('0 */15 * * * *', () => {
//   fetchJobs({}, { status: () => ({ json: () => {} }) });
//   console.log('⏰ Job feeds updated every 15 minutes');
// });




// connectDB(DATABASE_URL)
// app.use(express.json());






// app.use('/', studentRoutes);

// // Nodemailer setup
// //const scheduler = require('node-cron');


// const server = http.createServer(app);
// const io = new Server(server, { cors: { origin: '*' } });

// initSocket(io);


// app.use(express.static(path.join(_dirname, '/client/dist')));
// app.get('*', (req, res) => {
//    res.sendFile(path.resolve(_dirname, 'client', 'dist', 'index.html'));
// });

// server.listen(PORT, () => {
//   console.log(`Server with Socket.IO is running on http://localhost:${PORT}`);
// });


const express = require('express');
const connectDB = require('./db/connectdb');
const studentRoutes = require('./routes/User');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const initSocket = require('./sockets/chatSocket');
const cron = require('node-cron');
const { fetchJobs } = require('./Controllers/jobController');

const app = express();
const PORT = process.env.PORT || 8000;
const _dirname = path.resolve();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Database connection
const DATABASE_URL =
  'mongodb+srv://ak452932:dtsQGKsqofJpPUBA@cluster0.64ixf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
connectDB(DATABASE_URL);

// Cron job (every 15 minutes)
cron.schedule('0 */15 * * * *', () => {
  fetchJobs({}, { status: () => ({ json: () => {} }) });
  console.log('⏰ Job feeds updated every 15 minutes');
});

// Routes
app.use('/', studentRoutes);

// Serve static files (React build)
app.use(express.static(path.join(_dirname, '/client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(_dirname, 'client', 'build', 'index.html'));
});

// Socket.IO setup
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });
initSocket(io);

// Start server
server.listen(PORT, () => {
  console.log(`Server with Socket.IO is running on http://localhost:${PORT}`);
});