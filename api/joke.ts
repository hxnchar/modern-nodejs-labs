import type { VercelRequest, VercelResponse } from '@vercel/node';
import { VercelRouter } from '../src/vercelRouter';

const jokeRouter = new VercelRouter('api/joke');

//jokeRouter.get('/', async (req: VercelRequest, res: VercelResponse) => {
//  res.status(200).send({ message: JSON.stringify('A funny joke was here but Vladlen has no почуття гумору')});
//});

jokeRouter.get('/', (req, res) => {res.send({message: 'BLKO'})});
jokeRouter.delete('/', (req, res) => {res.send({message: 'DELETE'})});

export default function handler(req: VercelRequest, res: VercelResponse) {
  jokeRouter.handle(req, res);
}
