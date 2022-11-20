const safeJSON = (data: string, fallback: Object): Object => {
  try {
    return JSON.parse(data);
  } catch {
    return fallback;
  }
};

export { safeJSON };
