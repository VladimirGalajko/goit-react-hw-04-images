import axios from 'axios';

//42 max 500
export const getImageGallery = async ( {search}, page) => {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '39891458-4c88624de20012882beea7343';
  const params = new URLSearchParams({
    key: API_KEY,
    q: search,
    image_type: 'photo',
    orientation: 'horizontal',
    page,
    per_page: 12,
  });
  const response = await axios(`${BASE_URL}?${params}`);
  return response.data;
};
