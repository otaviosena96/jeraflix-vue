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
  const wishlist = ref<any[]>([])
  const watched = ref<any[]>([])

  async function suggestedMovieWithoutGenre(payload: any) {
    const { data } = await http.get(`movies/search-movies-suggested`, {
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

  return {
    movies,
    wishlist,
    watched,
    suggestedMovieWithoutGenre,
    addToFavorite,
    getWishlist,
    getWatched,
    addToWatched,
  }
})
