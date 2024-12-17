#!/usr/bin/env node
// Connects node to redis client on server.
import { createClient } from 'redis';

const client = createClient();

client.on('connect', () => {
  console.log('Redis client connected to the server');
});

client.on('error', (err) => {
  console.log('Redis client not connected to the server:', err.message);
});

/**
 * Subscribes and listens to channel.
 * @param {string} channel: Channel to subscribe to.
 */

function subscribe(channel) {
  client.subscribe(channel, (error) => {
    if (error) {
      console.error(error.message);
    }
  });

  client.on('message', (channel, message) => {
    if (message === 'KILL_SERVER') {
      client.unsubscribe(channel);
      client.quit();
    }
    console.log(message);
  });
};

subscribe('ALXchannel');