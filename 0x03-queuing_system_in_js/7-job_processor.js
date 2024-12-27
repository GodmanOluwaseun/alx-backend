#!/usr/bin/env node
// Processes job queue from array.
import kue from 'kue';

const blacklist = [
  '4153518780',
  '4153518781'
];

const queue = kue.createQueue();

/**
 * Processes the jobs in queue and checks for blacklisted numbers.
 * @param {string} phoneNumber 
 * @param {string} message 
 * @param {} job 
 * @param {} done 
 */
function sendNotification(phoneNumber, message, job, done) {
  job.progress(0, 100);

  if (blacklist.includes(phoneNumber)) {
    done(new Error(`Phone number ${phoneNumber} is blacklisted`));
  } else {
    job.progress(50, 100);
    console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
    done();
  }
}

queue.process('push_notification_code_2', 2, (job, done) => {
  const { phoneNumber, message } = job.data;

  if (!phoneNumber || !message) {
    return done(new Error('error'));
  }

  sendNotification(phoneNumber, message, job, done);
});