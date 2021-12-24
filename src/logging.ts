// import * as fs from 'fs';
import pino, { TransportMultiOptions } from 'pino';
// import pretty from 'pino-pretty'

const transport = pino.transport(<TransportMultiOptions>{
  targets: [{
    level: 'info',
    target: 'pino-pretty' // must be installed separately
  }, {
    level: 'error',
    target: 'pino/file',
    options: { destination: './errors.txt' }
  }]
})

const log = pino(transport);

export default log;