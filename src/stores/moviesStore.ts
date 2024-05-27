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

  async function suggestedMovieWithoutGenre(payload: any) {
    const { data } = await http.get(`movies/search-movies-suggested`, {
      params: payload,
    })
    movies.value = data.data
    return data
  }

  async function addToFavorite(payload: any) {
    const { data } = await http.post(`movies/add-to-favorite`, payload)
    return data
  }

  async function getWishlist(payload: any) {
    const { data } = await http.get(`movies/wishlist/`, {
      params: payload,
    })
    wishlist.value = data.data
    return data
  }

  return {
    movies,
    wishlist,
    suggestedMovieWithoutGenre,
    addToFavorite,
    getWishlist,
  }
})
