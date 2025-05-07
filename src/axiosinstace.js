import axios from 'axios'


export const axiosinstace = axios.create({
  baseURL: "https://goals-r0ng.onrender.com/goal",
});