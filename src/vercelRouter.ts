import { VercelRequest, VercelResponse } from '@vercel/node';
import { HTTPMethod } from './constants/methods';
import { safeJSONParse, textParse } from './utils';

const fallbackObject = { name: 'Default ИлЛлЛлЛлющенко' };

const processedContentTypes: { [key: string]: any } = {
  'text/html': (text: string): Object => textParse(text, fallbackObject),
  'text/plain': (text: string): Object => textParse(text, fallbackObject),
  'application/json': (json: string): Object => safeJSONParse(json, fallbackObject),
  'application/x-www-form-urlencoded': (data: string): Object =>
    Object.fromEntries(new URLSearchParams(data)),
};

type Handler = (
  req: VercelRequest,
  res: VercelResponse,
  payload: string | Object,
) => void | Promise<void>;

export class VercelRouter {
  private routes: { [route: string]: { [method: string]: Handler[] } } = {};
  private base: string;

  constructor(base: string) {
    this.base = base;
  }

  private use(method: string, route: string, ...handlers: Handler[]) {
    if (!handlers.length) {
      throw new Error('Handlers must be implemented');
    }
    const url = this.base.concat(route);

    if (!this.routes[url]?.[method]) {
      const existingHandlers = this.routes[url] || {};
      this.routes[url] = { ...existingHandlers, [method]: handlers };
    } else {
      this.routes[url][method] = handlers;
    }
  }

  public async handle(req: VercelRequest, res: VercelResponse) {
    const { url, method } = req;
    if (!url) {
      throw new Error('No url in req');
    }
    if (!method) {
      throw new Error('No method in req');
    }
    let payload = {},
      rawRequest = '';
    for await (const chunk of req) {
      rawRequest += chunk;
    }
    const methodHandlers = this.routes[url][method];
    if (!methodHandlers) {
      throw new Error('Handlers are not implemented');
    }
    if (req.headers['content-type']) {
      const contentType: string = req.headers['content-type'].split(';')[0];
      if (processedContentTypes[contentType]) {
        payload = processedContentTypes[contentType](rawRequest);
      }
    }
    for (const handler of methodHandlers) {
      await handler(req, res, payload);
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
