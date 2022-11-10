import { VercelRequest, VercelResponse } from '@vercel/node';
import { HTTPMethod } from './constants/methods';

type Handler = (
  req: VercelRequest,
  res: VercelResponse,
) => void | Promise<void>;

export class VercelRouter {
  private routes: { [route: string]: { [method: string]: Handler[] } } = {};
  private base: string;

  constructor(base: string) {
    this.base = base;
  }

  private use(method: HTTPMethod, route: string, ...handlers: Handler[]) {
    if (!handlers.length) {
      throw new Error('Handlers must be implemented');
    }
    const url = this.base.concat(route);

    if (!this.routes[url]?.[method]) {
      const existingHandlers = this.routes[url] || {};
      this.routes[url] = { ...existingHandlers, [method]: handlers };
    } else {
      // Rewriting old handlers
      this.routes[url][method] = handlers;
    }
  }

  public async handle(req: VercelRequest, res: VercelResponse) {
    const { url, method } = req;
    const methodHandlers = this.routes[url as string][method as string];
    if (!methodHandlers) {
      throw new Error('Handlers are not implemented');
    }
    for (const handler of methodHandlers) {
      await handler(req, res);
    }
    res.status(200).end();
  }

  public connect(route: string, ...handlers: Handler[]) {
    this.use(HTTPMethod.CONNECT, route, ...handlers);
  }

  public delete(route: string, ...handlers: Handler[]) {
    this.use(HTTPMethod.DELETE, route, ...handlers);
  }

  public get(route: string, ...handlers: Handler[]) {
    this.use(HTTPMethod.GET, route, ...handlers);
  }

  public head(route: string, ...handlers: Handler[]) {
    this.use(HTTPMethod.HEAD, route, ...handlers);
  }

  public patch(route: string, ...handlers: Handler[]) {
    this.use(HTTPMethod.PATCH, route, ...handlers);
  }

  public post(route: string, ...handlers: Handler[]) {
    this.use(HTTPMethod.POST, route, ...handlers);
  }

  public put(route: string, ...handlers: Handler[]) {
    this.use(HTTPMethod.PUT, route, ...handlers);
  }

  public trace(route: string, ...handlers: Handler[]) {
    this.use(HTTPMethod.TRACE, route, ...handlers);
  }
}
