import pino, { TransportMultiOptions } from 'pino';

const transport = pino.transport(<TransportMultiOptions>{
  targets: [
  {
    level: 'info',
    target: 'pino-pretty',
    options: { ignore: 'pid,hostname' }
  }, 
  {
    level: 'info',
    target: 'pino/file',
    options: { destination: './logs/all.txt', mkdir: true}
  }, 
  {
    level: 'warn',
    target: 'pino-pretty'
  }, 
  {
    level: 'warn',
    target: 'pino/file',
    options: { destination: './logs/all.txt', mkdir: true}
  }, 
  {
    level: 'error',
    target: 'pino/file',
    options: { destination: './logs/errors.txt', mkdir: true }
  }],
  options: {
    ignore: 'pid,hostname',
    colorize: true,
  }
})

export const log = pino(transport);
