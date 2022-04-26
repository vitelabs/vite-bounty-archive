const path = require('path');
const fs = require('fs');
const tracer = require('tracer');

function setupLogger({
  NODE_ENV = 'dev',
  LOG_LEVEL = 'info',
  LOG_DIR = './logs',
  LOG_FILENAME = 'access.log',
} = {}) {
  const LOG_FILENAME_BASENAME = path.basename(LOG_FILENAME, '.log');
  const format = [
    '{{timestamp}} [{{title}}] {{message}} (in {{file}}:{{line}} [caller={{method}}])', //default format
    {
      error:
      '{{timestamp}} [{{title}}] {{message}} (in {{file}}:{{line}} [caller={{method}}])\nCall Stack:\n{{stack}}' // error format
    }
  ]


  if (NODE_ENV == 'dev') {
    const stream = fs.createWriteStream(path.join(LOG_DIR, LOG_FILENAME), {
      flags: 'a',
      encoding: 'utf8',
    })
    return tracer.console({
      format,
      dateformat: 'HH:MM:ss.L',
      level: LOG_LEVEL,
      inspectOpt : {
        depth : 10
      },
      preprocess: function(data) {
        data.title = data.title.toUpperCase()
      },
      transport: function(data) {
        stream.write(data.rawoutput + '\n')
      }
    })
  } else {
    return tracer.dailyfile({
      format,
      dateformat: 'HH:MM:ss.L',
      preprocess: function(data) {
        data.title = data.title.toUpperCase()
      },
      level: LOG_LEVEL,
      root: LOG_DIR,
      maxLogFiles: 100,
      allLogsFileName: LOG_FILENAME_BASENAME
    })
  }
}

module.exports = {
    setupLogger,
}
