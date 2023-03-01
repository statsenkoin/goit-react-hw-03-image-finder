import axios from 'axios';

const API_KEY = '32468715-2ee7d1cef437ed65ce73ff92a';
// const BASE_URL = 'https://pixabay.com/api/';
axios.defaults.baseURL = 'https://pixabay.com/api/';
const params = new URLSearchParams({
  key: API_KEY,
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 12,
});

/**
 *
 * @param {String} query - userInput
 * @param {Number} page - requested page
 * @returns array of objects or error message
 * response.data = {total: 1159760, totalHits: 500, hits: Array(12)}
 */
export default async function fetchPixabay(query, page) {
  try {
    const response = await axios.get(`/?q=${query}&page=${page}`, {
      params,
    });
    return response.data.hits;
  } catch (error) {
    console.error(error.message);
  }
}

//  .get(`{BASE_URL}?q=${query}&page=${page}`
