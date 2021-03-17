import { Request, Response } from 'express';
import db from '../database/connection';

class Order {
  public async create(req: Request, res: Response): Promise<Response> {
    const { id, products } = req.body;

    const [account] = await db('users').select('*').where('users.id', '=', id);
    if (!account)
      return res.jsonBadRequest({
        message:
          'Ocorreu um erro ao criar seu pedido, recarregue a página ou entre mais tarde.',
      });

    const { password, jwtVersion, ...restAccount } = account;
    return res.jsonOk({
      ...req.body,
      account: restAccount,
      order_id: 'asd72dSA32sa4SA7aAS',
    });
  }
}

export default new Order();
