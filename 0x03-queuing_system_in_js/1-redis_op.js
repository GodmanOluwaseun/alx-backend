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

function setNewSchool(schoolName, value) {
  client.set(schoolName, value, (err, reply) => {
    if (err) {
      console.log(err.message);
      return;
    }
    console.log(`Reply: ${reply}`);
  });
}

function displaySchoolValue(value){
  client.get(value, (err, value) => {
    if (err) {
      console.log(err.message);
      return;
    }
    console.log(value);
  });
}

displaySchoolValue('ALX');
setNewSchool('ALXSanFrancisco', '100');
displaySchoolValue('ALXSanFrancisco');