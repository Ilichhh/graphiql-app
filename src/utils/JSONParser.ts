export const JSONParser = (initialString: string) => {
  try {
    return initialString ? JSON.parse(initialString) : {};
  } catch (error) {
    if (error instanceof SyntaxError) {
      console.error(error);
      return;
    }
    throw error;
  }
};
