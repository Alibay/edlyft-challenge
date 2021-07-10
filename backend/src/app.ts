import config from 'config';
import express from 'express';
import cors from 'cors';
import routes from './routes';

const port = config.get<number>('port');

/* tslint:disable no-console */
express()
  .use(cors())
  .use('/api/v1', routes)
  .listen(port, () => console.log(`Server started at localhost:${port}`));
