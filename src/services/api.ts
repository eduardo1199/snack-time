import axios from "axios";

export const api = axios.create({
  baseURL: 'https://snacktime-api.herokuapp.com/'
})
