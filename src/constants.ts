export const INITIAL_ENDPOINT_URL = 'https://swapi-graphql.netlify.app/.netlify/functions/index';
export const INITIAL_QUERY = `query {
  allFilms {
    films {
      id
      title
    }
  }
}`;
