#!/usr/bin/env node
// Test
import kue from 'kue';
import createPushNotificationsJobs from './8-job.js';
import { expect } from 'chai';

describe('createPushNotificationsJobs', () => {
  let queue;

  before(() => {
    queue = kue.createQueue();
    queue.testMode.enter();
  });

  after(() => {
    queue.testMode.clear();
    queue.testMode.exit();
  });

  it('should throw an error if not array', () => {
    expect(() => createPushNotificationsJobs({}, queue))
    .to.throw('Job is not an array');
  });

  it('should create jobs for a valid array', () => {
    const jobs = [
      {
        phoneNumber: '4153518780',
        message: 'This is the code 1234 to verify your account'
      },
      {
        phoneNumber: '4153518781',
        message: 'This is the code 4562 to verify your account'
      },
      {
        phoneNumber: '4153518743',
        message: 'This is the code 4321 to verify your account'
      },
      {
        phoneNumber: '4153538781',
        message: 'This is the code 4562 to verify your account'
      }
    ];

    createPushNotificationsJobs(jobs, queue);

    expect(queue.testMode.jobs.length).to.equal(jobs.length);

    queue.testMode.jobs.forEach((job, index) => {
      expect(job.type).to.equal('push_notification_code_3');
      expect(job.data).to.deep.equal(jobs[index]);
    });
  });

  it('should handle empty array without error', () => {
    const jobs = [];
    createPushNotificationsJobs(jobs, queue);
    expect(queue.testMode.jobs.length).to.equal(0);
  });

});