export const hash = (input: string): string => {
  let hash = '';

  if (input.length === 0) {
    return hash;
  }

  for (let i = 0; i < input.length; i++) {
    const charCode = input.charCodeAt(i);
    hash += String.fromCharCode((charCode + i) % 256);
  }

  return hash;
};

export const hashFromObject = (object: object): string => {
  return hash(JSON.stringify(object));
};
