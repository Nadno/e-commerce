import { Request, Response, NextFunction } from 'express';
import Jwt from '../utils/jwt';

const EXCLUDED_PATHS = [
  '/product',
  '/products/:filter',
  '/refresh',
  '/user/sign-in',
  '/user/sign-up',
];

const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  const { url: path } = req;

  const isExcluded = !!EXCLUDED_PATHS.find(p => path.includes(p));
  if (isExcluded) return next();

  let token = Jwt.getTokenFromHeaders(req.headers);
  if (!token) return res.jsonUnauthorized();

  try {
    const decoded = Jwt.verifyJwt(token) as { id: string };

    res.locals = {
      ...res.locals,
      session: decoded.id,
    };

    next();
  } catch (err) {
    res.jsonUnauthorized();
  }
};

export default checkJwt;
