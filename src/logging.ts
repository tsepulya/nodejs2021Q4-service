// import * as fs from 'fs';
import pino, { TransportMultiOptions } from 'pino';
// import pretty from 'pino-pretty'

const transport = pino.transport(<TransportMultiOptions>{
  targets: [
  {
    level: 'info',
    target: 'pino-pretty'
  }, 
  {
    level: 'info',
    target: 'pino/file',
    options: { destination: './all.txt'}
  }, 
  {
    level: 'warn',
    target: 'pino-pretty'
  }, 
  {
    level: 'warn',
    target: 'pino/file',
    options: { destination: './all.txt'}
  }, 
  {
    level: 'error',
    target: 'pino-pretty'
  }, 
  {
    level: 'error',
    target: 'pino/file',
    options: { destination: './errors.txt' }
  }]
})

export const log = pino(transport);

