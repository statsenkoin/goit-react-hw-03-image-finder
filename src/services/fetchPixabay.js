import axios from 'axios';
import { pixabayConstants } from 'constants';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const { API_KEY, PER_PAGE } = pixabayConstants;
const params = new URLSearchParams({
  key: API_KEY,
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: PER_PAGE,
});

/**
 *
 * @param {String} query - userInput
 * @param {Number} page - requested page
 * @returns array of objects or error message
 * response.data = {total: 1159760, totalHits: 500, hits: Array(12)}
 */
export default async function fetchPixabay(query, page) {
  const response = await axios.get(`/?q=${query}&page=${page}`, {
    params,
  });
  return response.data;
}

// const BASE_URL = 'https://pixabay.com/api/';
//  .get(`{BASE_URL}?q=${query}&page=${page}`
