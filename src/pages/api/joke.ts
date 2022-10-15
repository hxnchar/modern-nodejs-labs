import { NextApiRequest, NextApiResponse } from 'next';

const joke = 'Нашел еврей пачку денег, а там не хватает';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ joke });
}
