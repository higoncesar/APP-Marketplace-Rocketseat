const kue = require('kue')
const Sentry = require('@sentry/node')
const redisConfig = require('../../config/radis')
const jobs = require('../jobs')

const Queue = kue.createQueue({ redis: redisConfig })

Queue.process(jobs.PurchaseMail.key, jobs.PurchaseMail.handle)

Queue.on('error', Sentry.captureException)

module.exports = Queue
