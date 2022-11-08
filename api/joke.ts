import type { VercelRequest, VercelResponse } from '@vercel/node';
const joke = 'Нашел еврей пачку денег, а там не хватает';

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.status(200).json({ joke });
}
