import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
    return {
      mysql: {
        database: process.env.MYSQL_DATABASE,
        port: parseInt(process.env.MYSQL_PORT, 10),
        password: process.env.MYSQL_PASSWORD,
        username: process.env.MYSQL_USER,
        host: process.env.MYSQL_HOST,
        type:process.env.DATABASE_TYPE
      },
      apiKey: process.env.API_KEY
     
    };
  });