import { NextFunction, Response } from 'express';

const STATUS_CODE_OK = 200;
const STATUS_CODE_BAD_REQUEST = 400;
const STATUS_CODE_UNAUTHORIZED = 401;
const STATUS_CODE_NOT_FOUND = 404;
const STATUS_CODE_SERVER_ERROR = 500;

class HandleResponse {
  constructor() {
    this.response = this.response.bind(this);
  }

  private jsonOk(this: Response, data = {}): Response  {
    const status = STATUS_CODE_OK;
    this.status(status);

    return this.json({ ...data, status });
  };

  private jsonBadRequest(this: Response, data = {}): Response  {
    const status = STATUS_CODE_BAD_REQUEST;
    this.status(status);

    return this.json({ ...data, status });
  };

  private jsonUnauthorized(this: Response, data = {}): Response  {
    const status = STATUS_CODE_UNAUTHORIZED;
    this.status(status);

    return this.json({ ...data, status });
  };

  private jsonNotFound(this: Response, data = {}): Response  {
    const status = STATUS_CODE_NOT_FOUND;
    this.status(status);

    return this.json({ message: 'request not found', ...data, status });
  };

  private jsonServerError(this: Response, data = {}): Response {
    const status = STATUS_CODE_SERVER_ERROR;
    this.status(status);

    return this.json({ ...data, status });
  };

  public response(_, res: Response, next: NextFunction): void {
    res.jsonOk = this.jsonOk;
    res.jsonBadRequest = this.jsonBadRequest;
    res.jsonUnauthorized = this.jsonUnauthorized;
    res.jsonNotFound = this.jsonNotFound;
    res.jsonServerError = this.jsonServerError;
  
    next();
  };
}


export default new HandleResponse().response;
