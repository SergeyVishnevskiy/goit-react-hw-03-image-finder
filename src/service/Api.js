import axios from "axios";
axios.defaults.baseURL = "https://pixabay.com/api/";

export default function getImages(searchQuery, pageNumber, perPage) {
  const key = "19525294-22d6d1e180bf9905034ff3396";
  return axios.get(
    `?q=${searchQuery}&page=${pageNumber}&key=${key}&image_type=photo&orientation=horizontal&per_page=${perPage}`
  );
}
