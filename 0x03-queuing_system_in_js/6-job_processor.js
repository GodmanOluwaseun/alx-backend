#!/usr/bin/env node
// Creates a queue with Kue.
import kue from 'kue';

const queue = kue.createQueue();

/**
 * Notifies of job processes in the Que.
 * @param {string} phoneNumber: Test string.
 * @param {string} message: Test string.
 */
function sendNotification(phoneNumber, message) {
  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
}

queue.process('push_notification_code', (job, done) => {
  const { phoneNumber, message } = job.data;
  if (!phoneNumber || !message) {
    return done(new Error('error'));
  }

  sendNotification(phoneNumber, message);
  done();

});