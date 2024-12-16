#!/usr/bin/env node
// Connects node to redis client on server.
import { createClient } from 'redis';
import { promisify } from 'util';

const client = createClient();

client.on('connect', () => {
  console.log('Redis client connected to the server');
});

client.on('error', (err) => {
  console.log('Redis client not connected to the server:', err.message);
});

const getAsync = promisify(client.get).bind(client);

/**
 * Sets key and value opair
 * @param {string} schoolName: Key
 * @param {string} value: value
 */
function setNewSchool(schoolName, value) {
  client.set(schoolName, value, (err, reply) => {
    if (err) {
      console.log(err.message);
      return;
    }
    console.log(`Reply: ${reply}`);
  });
}

/**
 * Gets value of the supplied key.
 * @param {string} value:
 */
async function displaySchoolValue(key) {
  const value = await getAsync(key);
  console.log(value);
  return;
  }

displaySchoolValue('ALX');
setNewSchool('ALXSanFrancisco', '100');
displaySchoolValue('ALXSanFrancisco');