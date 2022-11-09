import { VercelRequest, VercelResponse } from '@vercel/node';
import { HTTPMethod } from './constants/methods';

export class VercelRouter {
  private routes: { [route: string]: { [method: string]: Function } } = {};
  private basename: string;

  constructor(basename: string) {
    this.basename = basename;
  }

  private use(method: HTTPMethod, route: string, handler: Function) {
    const fullRoute = this.basename.concat(route);
    this.routes[fullRoute] = { method: handler };
  }

  public handle(req: VercelRequest, res: VercelResponse) {
    console.log(req);
    const { url, method } = req;
    const handler = this.routes;
    res.send({ req });
  }

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
