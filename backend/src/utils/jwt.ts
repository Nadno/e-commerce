require('dotenv').config();

import { IncomingHttpHeaders } from 'http';
import JWT from 'jsonwebtoken';

const tokenPrivateKey = String(process.env.JWT_TOKEN_PRIVATE_KEY);
const refreshTokenPrivateKey = String(
  process.env.JWT_REFRESH_TOKEN_PRIVATE_KEY
);

export interface Payload {
  id: number;
  version?: number;
}

export interface Decoded {
  id: number;
  iat: number;
  exp: number;
  version: number;
}

class UtilJwt {
  private options = { expiresIn: '30 minutes' };
  private refreshOptions = { expiresIn: '120 minutes' };

  public generateJwt(payload: Payload): string {
    return JWT.sign(payload, tokenPrivateKey, this.options);
  }
  public generateRefreshJwt(payload: Payload): string {
    return JWT.sign(payload, refreshTokenPrivateKey, this.refreshOptions);
  }

  public verifyJwt(token: string) {
    return JWT.verify(token, tokenPrivateKey);
  }
  public verifyRefreshJwt(token: string): Decoded {
    return JWT.verify(token, refreshTokenPrivateKey) as Decoded;
  }

  public getTokenFromHeaders(headers: IncomingHttpHeaders): string | null {
    const token = headers['authorization'];
    return token ? token.slice(7, token.length) : null;
  }
}

export default new UtilJwt();
