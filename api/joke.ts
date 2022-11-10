import type { VercelRequest, VercelResponse } from '@vercel/node';
import { VercelRouter } from '../src/vercelRouter';

const jokeRouter = new VercelRouter('api/joke');

jokeRouter.get('/', async (req: VercelRequest, res: VercelResponse) => {
  res.status(200).send({message: 'Joke about jews and холокост'})
});

export default function handler(req: VercelRequest, res: VercelResponse) {
  jokeRouter.handle(req, res);
}
