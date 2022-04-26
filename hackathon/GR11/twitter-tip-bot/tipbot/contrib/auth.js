#!/usr/bin/env node

require('dotenv').config();
const fs = require('fs');
const path = require("path")
const util = require('util')
const inquirer = require('inquirer')
const { TwitterApi } = require('twitter-api-v2');

const appKey = process.env.TWITTER_CONSUMER_KEY;
const appSecret = process.env.TWITTER_CONSUMER_SECRET;

(async () => {
  const client = new TwitterApi({
    appKey,
    appSecret,
  });

  const authLink = await client.generateAuthLink()
  console.log('Open the following URL with your browser and get the PIN code')
  console.log(`\n${authLink.url}\n`)
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'pin',
      message: "Please input the pin code",
    },
  ])
  //  Create a client from temporary tokens
  const tmpClient = new TwitterApi({
    appKey,
    appSecret,
    accessToken: authLink.oauth_token,
    accessSecret: authLink.oauth_token_secret,
  });

  try {
    const token = await tmpClient.login(answers.pin)
    // verify credentials
    const currentUser = await client.v1.verifyCredentials();
    // recreate a client with token
    this.client = new TwitterApi({
      appKey,
      appSecret,
      accessToken: token.accessToken,
      accessSecret: token.accessSecret,
    })
    console.log(token);
  } catch (err) {
    console.error(err);
  }
})()
