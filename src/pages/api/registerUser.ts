import { NextApiRequest, NextApiResponse } from 'next';
import { api } from '../../services/api';

type User = {
 login: string;
 password: string;
}

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if(req.method === 'POST') {
    const user: User = req.body;

    const response = await api.post('/user', user);

    return res.status(200).json(response);
  } else {
    res.setHeader('allow', 'POST');
    res.status(405).end('method not allow');
  }
}