#!/usr/bin/env node
// Creates a queue with Kue.
import kue from 'kue';

const queue = kue.createQueue();

const jobData = {
  phoneNumber: '8144556677',
  message: 'Test string notification',
};

const job = queue.create('push_notification_code', jobData)
  .save((err) => {
    if (err) {
      console.error(err.message); 
    } else {
      console.log(`Notification job created: ${job.id}`);
    }
  });

job.on('complete', () => {
  console.log('Notification job completed');
})

job.on('failed', () => {
  console.log('Notification job failed');
});