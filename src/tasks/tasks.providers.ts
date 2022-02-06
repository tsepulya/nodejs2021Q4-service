import { DATABASE_CONNECTION, TASK_REPOSITORY } from 'src/common/constants';
import { Connection } from 'typeorm';
import { TaskDB } from './entities/task.entity';

export const tasksProviders = [
  {
    provide: TASK_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(TaskDB),
    inject: [DATABASE_CONNECTION],
  },
];
