const safeJSONParse = (data: string, fallback: Object): Object => {
  try {
    return JSON.parse(data);
  } catch {
    return fallback;
  }
};

const textParse = (data: string, fallback: Object): Object => {
  try {
    return { name: data };
  } catch {
    return fallback;
  }
}

export { safeJSONParse, textParse };
