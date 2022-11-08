import { HTTPMethod } from '../constants/methods';

const getMethod = (method: string): string => {
  let stringifiedMethod: string;
  switch (method) {
    case HTTPMethod.GET:
      stringifiedMethod = 'get';
      break;
    case HTTPMethod.POST:
      stringifiedMethod = 'post';
      break;
    case HTTPMethod.PUT:
      stringifiedMethod = 'put';
      break;
    case HTTPMethod.OPTIONS:
      stringifiedMethod = 'option';
      break;
    case HTTPMethod.DELETE:
      stringifiedMethod = 'delete';
      break;
    default:
      stringifiedMethod = 'get';
      break;
  }
  return stringifiedMethod;
};

export { getMethod };
