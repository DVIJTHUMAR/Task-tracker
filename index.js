const http = require('http');
const app = require('./app');
const connectDB = require('./config/db');
const setupSocketIO = require('./config/soket');
const setupCronJobs = require('./utils/cronJobs');
const {initializeFirebase} = require('./config/firebase')

const server = http.createServer(app);
const io = setupSocketIO(server);

connectDB();
setupCronJobs();


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});