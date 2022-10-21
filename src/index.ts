import http from 'http';
import 'dotenv/config';
import { getMethod } from './helpers/api';
const port = process.env.PORT || 8000;

let method: string;

http
  .createServer((req: any, res: any) => {
    switch (req.url) {
      case '/json':
        res.writeHead(200, { 'Content-Type': 'application/json' });
        method = getMethod(req.method);
        res.end(`Hello from ${method} json`);
        break;
      case '/form-data':
        res.writeHead(200, { 'Content-Type': 'multipart/form-data' });
        method = getMethod(req.method);
        res.end(`Hello from ${method} form-data`);
        break;
      default:
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end('This page doesn`t exist :(');
        break;
    }
  })
  .listen(port, () => {
    console.log(`App is running on port ${port}`);
  });

process.on('SIGTERM', () => {
  console.info('SIGTERM signal received.');
});
