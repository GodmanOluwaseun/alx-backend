#!/usr/bin/env node
// Creates new job queue from array.
import kue from 'kue';

/**
 * 
 * @param {Array} jobs: Array of Jobs.
 * @param {kue.Queue} queue: Queue of job processes.
 */
function createPushNotificationsJobs(jobs, queue) {
  if (!Array.isArray(jobs)) {
    throw new Error('Jobs is not an array');
  };

  for (const obj of jobs) {
    const job = queue.create('push_notification_code_3', obj)
      .save((err) => {
        if (err) {
          console.error(err.message);
        }
    });

  job.on('enqueue', () => {
    console.log(`Notification job created: ${job.id}`);
  });
  job.on('completed', () => {
    console.log(`Notification job ${job.id} completed`);
  });
  job.on('failed', (errorMessage) => {
    console.log(`Notification job ${job.id} failed: ${errorMessage}`);
  });
  job.on('progress', (progress) => {
    console.log(`Notification job ${job.id} ${progress}% complete`);
  });
  }
}

export default createPushNotificationsJobs;