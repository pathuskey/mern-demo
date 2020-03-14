import axios from "axios"

const api = axios.create({
  baseURL: process.env.REACT_APP_API || "http://server.meandemo.com:8000/api"
})

export const insertMovie = payload => api.post(`/movie`, payload)
export const getAllMovies = () => api.get(`/movies`)
export const updateMovieById = (id, payload) => api.put(`/movie/${id}`, payload)
export const deleteMovieById = id => api.delete(`/movie/${id}`)
export const getMovieById = id => api.get(`/movie/${id}`)

const apis = {
  insertMovie,
  getAllMovies,
  updateMovieById,
  deleteMovieById,
  getMovieById
}

export default apis
