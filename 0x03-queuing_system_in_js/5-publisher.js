#!/usr/bin/env node
// publishes channel on server.
import { createClient, print } from 'redis';

const client = createClient();

client.on('connect', () => {
  console.log('Redis client connected to the server');
});

client.on('error', (err) => {
  console.log('Redis client not connected to the server:', err.message);
});

/**
 * Publishes Channel
 * @param {string} message: message to publish.
 * @param {integer} time: Integer in millisecond. 
 */
function publishMessage(message, time) {
  const channel = 'ALXchannel';
  setTimeout(() => {
    console.log(`About to send ${message}`);
    client.publish(channel, message);
  }, time);
};

publishMessage("ALX Student #1 starts course", 100);
publishMessage("ALX Student #2 starts course", 200);
publishMessage("KILL_SERVER", 300);
publishMessage("ALX Student #3 starts course", 400);