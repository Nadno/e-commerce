import db from '../database/connection';

import { Request, Response } from 'express';

import bcrypt from 'bcrypt';
import Jwt from '../utils/jwt';
import checkLogin from '../utils/login';

class User {
  public async index(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    if (!id) return res.jsonBadRequest();

    try {
      const [account] = await db('users').select('*').where('id', '=', id);

      if (!account) throw 'account';
      const { password, jwtVersion, ...restAccount } = account;

      return res.jsonOk({ account: restAccount });
    } catch (err) {
      if (err === 'account') return res.jsonBadRequest();
      return res.jsonServerError();
    }
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { tel, cep, name, email, password, avatar, address } = req.body;

    const emailAlreadyExists = await db('users')
      .select('users.email')
      .where('users.email', '=', email);

    if (emailAlreadyExists.length > 0) {
      return res.jsonBadRequest({
        message: 'Endereço de email já cadastrado!',
      });
    }

    try {
      const hash = bcrypt.hashSync(password, 10);

      const [newAccountId] = await db('users').insert({
        tel,
        cep,
        name,
        email,
        password: hash,
        avatar,
        address,
      });

      const [account] = await db('users')
        .select('*')
        .where('id', '=', newAccountId);

      {
        const { name, avatar, id, jwtVersion } = account;

        const token = Jwt.generateJwt({ id });
        const refreshToken = Jwt.generateRefreshJwt({
          id,
          version: jwtVersion,
        });

        return res.jsonOk({
          avatar,
          id,
          name,
          token,
          refreshToken,
        });
      }
    } catch (err) {
      return res.jsonServerError({
        message:
          'Ocorreu um erro ao cadastrar sua conta, por favor tente mais tarde',
      });
    }
  }

  public async login(req: Request, res: Response): Promise<Response> {
    try {
      const { account, jwtVersion } = await checkLogin(req.body);

      const token = Jwt.generateJwt({ id: account.id });
      const refreshToken = Jwt.generateRefreshJwt({
        id: account.id,
        version: jwtVersion,
      });

      return res.jsonOk({
        token,
        refreshToken,
        ...account,
      });
    } catch (err) {
      return res.jsonBadRequest({ message: err });
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { name, tel, avatar, address } = req.body;

    try {
      const { account } = await checkLogin(req.body);

      await db('users')
        .update({
          name,
          tel,
          avatar,
          address,
        })
        .where('id', '=', account.id);

      return res.jsonOk(account);
    } catch (err) {
      return res.jsonBadRequest();
    }
  }

  public async refresh(req: Request, res: Response): Promise<Response> {
    const token = Jwt.getTokenFromHeaders(req.headers);
    if (token == null)
      return res.jsonUnauthorized({ message: 'Token inválido' });

    try {
      const decoded = Jwt.verifyRefreshJwt(token);

      const [account] = await db('users')
        .select('jwtVersion')
        .where('id', '=', decoded.id);

      if (!account) return res.jsonUnauthorized();
      if (decoded.version !== account.jwtVersion) return res.jsonUnauthorized();

      const meta = {
        token: Jwt.generateJwt({ id: account.id }),
      };

      return res.jsonOk(meta);
    } catch (err) {
      return res.jsonUnauthorized();
    }
  }
}

export default new User();
