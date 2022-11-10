import type { VercelRequest, VercelResponse } from '@vercel/node';
import { VercelRouter } from '../src/vercelRouter';

const jokeRouter = new VercelRouter('/api/joke');

jokeRouter.get('/', (req, res) => {
  res.send({ message: 'A funny joke was here but Vladlen has no почуття гумору(' });
});
jokeRouter.delete('/skeleton', (req, res) => {
  res.send({ message: 'Заходит скелет в бар. Заказывает пиво и швабру.' });
});
jokeRouter.get('/prikol', (req, res) => {
  res.send({ message: 'BLKO)))' });
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    await jokeRouter.handle(req, res);
  } catch (e: any) {
    const status = e.status ?? 500
    res.status(status).send(JSON.stringify({
      errors: [{status, title: e.message}]
    }))
  }
}
