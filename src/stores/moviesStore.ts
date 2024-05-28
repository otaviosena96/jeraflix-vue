import { defineStore } from 'pinia'
import http from '../services/http'
import { ref } from 'vue'

interface IMovies {
  movies: any[]
  total_pages: number
  total_results: number
}

export const useMovieStore = defineStore('movie', () => {
  const movies = ref<IMovies>({
    movies: [],
    total_pages: 0,
    total_results: 0,
  })
  const allMovies = ref({})
  const wishlist = ref<any[]>([])
  const watched = ref<any[]>([])

  async function suggestedMovieWithoutGenre(payload: any) {
    const { data } = await http.get(`movies/search-suggested`, {
      params: payload,
    })
    movies.value = data.data
    return data
  }

  async function addToFavorite(payload: any) {
    const { data } = await http.post(`movies/toogle-favorite`, payload)
    return data
  }
  async function addToWatched(payload: any) {
    const { data } = await http.post(`movies/toogle-watched`, payload)
    return data
  }

  async function getWishlist(payload: any) {
    const { data } = await http.get(`movies/wishlist/`, {
      params: payload,
    })
    wishlist.value = data.data
    return data
  }
  async function getWatched(payload: any) {
    const { data } = await http.get(`movies/watched/`, {
      params: payload,
    })
    watched.value = data.data
    return data
  }

  async function searchMovies(payload: any) {
    const { data } = await http.get(`movies/search`, {
      params: payload,
    })
    return data.data
  }

  async function addToFavoriteDirect(payload: any) {
    const { data } = await http.post(`movies/add-favorite-direct`, payload)
    return data
  }

  async function addToWatchedDirect(payload: any) {
    const { data } = await http.post(`movies/add-watched-direct`, payload)
    return data
  }

  return {
    movies,
    wishlist,
    watched,
    suggestedMovieWithoutGenre,
    allMovies,
    addToFavorite,
    getWishlist,
    getWatched,
    addToWatched,
    searchMovies,
    addToFavoriteDirect,
    addToWatchedDirect,
  }
})
