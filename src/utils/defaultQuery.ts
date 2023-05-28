import { ENDPOINT_ANIME, ENDPOINT_SPACEX, ENDPOINT_STAR_WARS } from '../constants';
import { anime, defaultQuery, spacex, starwars } from '../data/queries';

const queries: { [key: string]: string } = {
  [ENDPOINT_STAR_WARS]: starwars,
  [ENDPOINT_ANIME]: anime,
  [ENDPOINT_SPACEX]: spacex,
};
export const getDefaultQuery = (url: string) => {
  return queries[url] || defaultQuery;
};
