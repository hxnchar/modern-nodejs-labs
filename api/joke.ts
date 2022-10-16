const joke = 'Нашел еврей пачку денег, а там не хватает';

export default function handler(req: any, res: any) {
  res.status(200).json({ joke });
}
