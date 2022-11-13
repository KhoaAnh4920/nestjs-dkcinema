import { DataSource } from 'typeorm';

const devDataSource = new DataSource({
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: '123456',
  database: 'dkcinema',
  entities: ['src/**/*.entity.ts'],
  synchronize: false,
  migrations: ['src/db/migrations/*.ts'],
});

export default devDataSource;
