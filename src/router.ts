import { VercelRequest, VercelResponse } from '@vercel/node';
import { HTTPMethod } from './constants/methods';

export class Router {
  private routes: { [route: string]: { [method: string]: Function } } = {};

  constructor() {}

  private use(method: HTTPMethod, route: string, handler: Function) {
    return this;
  }

  handle(req: VercelRequest, res: VercelResponse) {
    return this;
  }

  // Some kind of express-like router
  public connect(route: string, handler: Function) {
    this.use(HTTPMethod.CONNECT, route, handler);
  }

  public delete(route: string, handler: Function) {
    this.use(HTTPMethod.DELETE, route, handler);
  }

  public get(route: string, handler: Function) {
    this.use(HTTPMethod.GET, route, handler);
  }

  public head(route: string, handler: Function) {
    this.use(HTTPMethod.HEAD, route, handler);
  }

  public patch(route: string, handler: Function) {
    this.use(HTTPMethod.PATCH, route, handler);
  }

  public post(route: string, handler: Function) {
    this.use(HTTPMethod.POST, route, handler);
  }

  public put(route: string, handler: Function) {
    this.use(HTTPMethod.PUT, route, handler);
  }

  public trace(route: string, handler: Function) {
    this.use(HTTPMethod.TRACE, route, handler);
  }
}
