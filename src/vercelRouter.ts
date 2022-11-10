import { VercelRequest, VercelResponse } from '@vercel/node';
import { HTTPMethod } from './constants/methods';

type Handler = (
  req: VercelRequest,
  res: VercelResponse,
) => void | Promise<void>;

// TODO: implement multiple handlers (Handler[])
export class VercelRouter {
  private routes: { [route: string]: { [method: string]: Handler } } = {};
  private basename: string;

  constructor(basename: string) {
    this.basename = basename;
  }

  private use(method: HTTPMethod, route: string, handler: Handler) {
    const urn = this.basename.concat(route);
    if (!this.routes[urn]?.[method]) {
      const handlers = this.routes[urn] || {};
      this.routes[urn] = { ...handlers, [method]: handler };
    } else {
      this.routes[urn][method] = handler;
    }
  }

  public async handle(req: VercelRequest, res: VercelResponse) {
    const { url, method } = req;
    const handler = this.routes[url as string][method as string];
    await handler(req, res);
  }

  public connect(route: string, handler: Handler) {
    this.use(HTTPMethod.CONNECT, route, handler);
  }

  public delete(route: string, handler: Handler) {
    this.use(HTTPMethod.DELETE, route, handler);
  }

  public get(route: string, handler: Handler) {
    this.use(HTTPMethod.GET, route, handler);
  }

  public head(route: string, handler: Handler) {
    this.use(HTTPMethod.HEAD, route, handler);
  }

  public patch(route: string, handler: Handler) {
    this.use(HTTPMethod.PATCH, route, handler);
  }

  public post(route: string, handler: Handler) {
    this.use(HTTPMethod.POST, route, handler);
  }

  public put(route: string, handler: Handler) {
    this.use(HTTPMethod.PUT, route, handler);
  }

  public trace(route: string, handler: Handler) {
    this.use(HTTPMethod.TRACE, route, handler);
  }
}
