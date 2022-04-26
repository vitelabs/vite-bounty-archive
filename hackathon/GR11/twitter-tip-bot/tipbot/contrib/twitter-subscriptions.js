#!/usr/bin/env node

require('dotenv').config();
const { Command } = require('commander');
const jsonFormat = require("json-format")
const { TwitterApi } = require('twitter-api-v2');

const WEBHOOK_ENV = process.env.TWITTER_WEBHOOK_ENV
// OAuth 1.0a user context client
const client = new TwitterApi({
  appKey: process.env.TWITTER_CONSUMER_KEY,
  appSecret: process.env.TWITTER_CONSUMER_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
})
// OAuth 2 application only client
const appOnlyClient = new TwitterApi(process.env.TWITTER_BEARER_TOKEN);

const program = new Command();

program
  .version('0.0.1')
  .description('Managing Twitter subscriptions');

program
  .command('auth')
  .description('verify credentials')
  .action(async() => {
    const currentUser = await client.v1.verifyCredentials();
    console.log(currentUser)
  })

program
  .command('get')
  .description('retrieve a user subscription')
  .option('-e, --env <name>', 'specify dev environment', WEBHOOK_ENV)
  .action(async(opt) => {
    const env_name = opt.env || WEBHOOK_ENV
    const webhookURL = `https://api.twitter.com/1.1/account_activity/all/${env_name}/subscriptions.json`
    try {
      const resp = await client.send({
        method: 'GET',
        url: webhookURL,
      })
      console.log(resp.data)
    } catch (e) {
      console.log(`${e.code}: %j`, e.data)
    }
  });

program
  .command('list')
  .alias('ls')
  .description('returns a list of all active subscriptions')
  .option('-e, --env <name>', 'specify dev environment', WEBHOOK_ENV)
  .action(async(opt) => {
    const env_name = opt.env || WEBHOOK_ENV
    const webhookURL = `https://api.twitter.com/1.1/account_activity/all/${env_name}/subscriptions/list.json`
    try {
      const resp = await appOnlyClient.send({
        method: 'GET',
        url: webhookURL,
      })
      console.log(resp.data)
    } catch (e) {
      console.log(`${e.code}: %j`, e.data)
    }
  });

program
  .command('add')
  .description('add new user subscription')
  .option('-e, --env <name>', 'specify dev environment', WEBHOOK_ENV)
  .action(async(opt) => {
    const env_name = opt.env || WEBHOOK_ENV
    const webhookURL = `https://api.twitter.com/1.1/account_activity/all/${env_name}/subscriptions.json`
    try {
      const resp = await client.send({
        method: 'POST',
        url: webhookURL,
      })
      console.log("Add successful")
    } catch (err) {
      console.log(err)
    }
  });

program
  .command('delete <user_id>')
  .alias('del')
  .description('deactivates a user subscription using application only OAuth')
  .option('-e, --env <name>', 'specify dev environment', WEBHOOK_ENV)
  .action(async(user_id, opt) => {
    const env_name = opt.env || WEBHOOK_ENV
    const webhookURL = `https://api.twitter.com/1.1/account_activity/all/${env_name}/subscriptions/${user_id}.json`
    try {
      const resp = await appOnlyClient.send({
        method: 'DELETE',
        url: webhookURL,
      })
      console.log('Delete successful')
    } catch (err) {
      console.log(`${e.code}: %j`, e.data)
    }
  });

program.parse(process.argv);
