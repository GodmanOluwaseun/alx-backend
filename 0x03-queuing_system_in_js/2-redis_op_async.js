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
const setAsync = promisify(client.set).bind(client);

/**
 * Sets key and value opair
 * @param {string} schoolName: Key
 * @param {string} value: value
 */
async function setNewSchool(schoolName, value) {
  const reply = await client.set(schoolName, value);
  if (reply) {
    console.log('Reply: OK');
  }
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

(async () => {
  await displaySchoolValue('ALX');
  await setNewSchool('ALXSanFrancisco', '100');
  await displaySchoolValue('ALXSanFrancisco');
}) ();