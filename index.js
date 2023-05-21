console.log("++++++ Node server for auth service ++++++");
import app from './app.js'
import http from 'http'

const server = http.createServer(app);

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

// server listening
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});