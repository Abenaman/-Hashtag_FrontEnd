#!/usr/bin/env node

/**
 * Module dependencies.
 */
let HashtagCount = require ('hashtag-count');
let app = require ('../app');
let debug = require ('debug') ('mean-app:server');
let http = require ('http');
let credentials = require ('../utils/credentials');
let streamHandler = require ('../utils/streamHandler');

/**
 * Get port from environment and store in Express.
 */

let port = normalizePort (process.env.PORT || '3000');
app.set ('port', port);

/**
 * Create HTTP server.
 */

let server = http.createServer (app);
const socketio = require ('socket.io');
const io = socketio (server);
//hash tag count
var hc = new HashtagCount ({
  consumer_key: credentials.consumer_key,
  consumer_secret: credentials.consumer_secret,
  access_token: credentials.access_token_key,
  access_token_secret: credentials.access_token_secret,
});
// Array of hashtags
var hashtags = ['US', 'UK', 'Germany'];

// Hashtag tallies for each time interval will be added to the results object.
var interval = '30 seconds';
// Delete data older than this.
var history = '5 minutes';
// Called at the end of each time interval.
var intervalCb = function (err, results) {
  if (err) {
    console.error (err);
  } else {
    console.log (results);
  }
};

// Open a connection to Twitter's Streaming API and start capturing tweets!
hc.start ({
  hashtags: hashtags, // required
  interval: interval, // required
  history: history, // optional
  intervalCb: intervalCb,
  function (stream) {
    streamHandler (stream, io);
  }, // optional
});
/**
 * Listen on provided port, on all network interfaces.
 */

server.listen (port);
server.on ('error', onError);
server.on ('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort (val) {
  let port = parseInt (val, 10);

  if (isNaN (port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError (error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  let bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error (bind + ' requires elevated privileges');
      process.exit (1);
      break;
    case 'EADDRINUSE':
      console.error (bind + ' is already in use');
      process.exit (1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening () {
  let addr = server.address ();
  let bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  debug ('Listening on ' + bind);
}
