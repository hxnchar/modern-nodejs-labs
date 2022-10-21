import methods from '../constants/methods';

const getMethod = (method: string): string => {
  let stringifiedMethod: string;
  switch (method) {
    case methods.get:
      stringifiedMethod = 'get';
      break;
    case methods.post:
      stringifiedMethod = 'post';
      break;
    case methods.put:
      stringifiedMethod = 'put';
      break;
    case methods.option:
      stringifiedMethod = 'option';
      break;
    case methods.delete:
      stringifiedMethod = 'delete';
      break;
    default:
      stringifiedMethod = 'get';
      break;
  }
  return stringifiedMethod;
};

export { getMethod };
