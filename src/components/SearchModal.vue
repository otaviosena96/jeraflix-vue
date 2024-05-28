<template>
  <div>
    <div v-if="isModalOpen" class="backdrop"></div>
    <div v-if="isModalOpen" class="champions-modal" ref="modalRef">
      <header class="modal-header">
        <el-input placeholder="Pesquisar Filmes..." v-model="searchQuery" clearable></el-input>
        <el-button class="success" @click="searchMovies">Buscar</el-button>
        <el-button class="close-button" type="text" @click="closeModal">X</el-button>
      </header>
      <div class="card-container">
        <el-card v-for="(movie, index) in movies.results" :key="index" class="card-movie">
          <el-tooltip effect="dark" :content="movie.title" placement="top" :append-to="$refs.modalRef">
            <span class="movie-name">{{ truncate(movie.title, 25) }}</span>
          </el-tooltip>
          <div class="actions">
            <div class="mb-2" v-if="movie.overview">
              <el-tooltip effect="dark" :content="movie.overview" placement="top"  :append-to="$refs.modalRef">
                <span class="pointer">SINOPSE</span>
              </el-tooltip>
            </div>
            <div class="button-container">
              <el-button  @click="addToFavorites(movie)" type="success" class="button" style="text-align: center; padding: 0.5rem;">QUERO VER +</el-button>
            </div>
            <div class="button-container">
              <el-button  @click="addToWatched(movie)" type="success" class="button" style="text-align: center; padding: 0.5rem;">JÁ ASSISTI +</el-button>
            </div>
          </div>
        </el-card>
      </div>
      <footer class="modal-footer">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pageSize"
          :total="totalMovies"
          layout="prev, pager, next"
        ></el-pagination>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useDefaultStore } from '../stores/defaultStore'
import { useMovieStore } from '../stores/moviesStore'
import { useRouter} from 'vue-router'
import { useToast } from 'vue-toastification'
 
const defaultStore = useDefaultStore()
const toast = useToast()
const storeMovie = useMovieStore()
const router = useRouter()
const profileId = router.currentRoute.value.params.id;   
const isModalOpen = ref(defaultStore.modalOpen)
const searchQuery = ref('')
const movies = ref({ results: [], total_pages: 0, total_results: 0 })



const page = ref(1)
const currentPage = ref(1)
const pageSize = ref(20)
const totalMovies = ref(0)

const handleCurrentChange = (val: number) => {
  currentPage.value = val;
  fetchMovies();
};

const fetchMovies = async () => {
  const params = {
    page: currentPage.value,
    query: searchQuery.value
  }
  const { results, total_pages } = await storeMovie.searchMovies(params)
  movies.value = { results }
  totalMovies.value = total_pages
}

const searchMovies = () => {  
  fetchMovies()
}

const closeModal = () => {
  defaultStore.modalOpen = false
}



const addToFavorites = async (movie) => {
  
    const payload = {
      tmdbId: movie.id,
      genre_id: movie.genre_ids[0],
      profile_id: Number(router.currentRoute.value.params.id),
      favorite: true,     
      title: movie.title, 
      overview: movie.overview,  
    }
    storeMovie.addToFavoriteDirect(payload).then(() => {
      toast.success('Filme adicionado aos favoritos com sucesso!', );
    }).catch((err: any) => {
      toast.error(err.response.data.message);
    })

}

const addToWatched = async (movie) => {     
     const payload = {
       tmdbId: movie.id,
       genre_id: movie.genre_ids[0],
       profile_id: Number(router.currentRoute.value.params.id),
       watched: true,     
       title: movie.title, 
       overview: movie.overview,  
     }
     storeMovie.addToWatchedDirect(payload).then(() => {
       toast.success('Filme adicionado aos assisitos com sucesso!', );
     }).catch((err: any) => {
       toast.error(err.response.data.message);
     })
 
 }

const truncate = (text: string, length: number) => {
  if (text.length > length) {
    return text.slice(0, length) + '...';
  }
  return text;
}

watch(() => defaultStore.modalOpen, (newValue) => {
  isModalOpen.value = newValue
})

watch([currentPage, pageSize], fetchMovies);
</script>

<style scoped>

.button-container {
  margin-top: 1rem; 
}
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(8px); 
  z-index: 4000;
}

.champions-modal { 
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 75vw;
  min-height: 75vh;
  max-height: 80vh; 
  background-color: aliceblue;
  border-radius: 2%;
  z-index: 5000;    
  overflow: auto;
  display: flex;
  flex-direction: column;
}

.modal-header {
  padding: 2%;
}

.modal-footer {
  margin-top: auto;
  padding: 1rem;
  background-color: #f0f0f0; 
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0 0 2% 2%; 
  flex: 0 0 auto;
}

.actions {   
  display: flex;
  flex-direction: column;
  align-items: center; 
  justify-content: center; 
  margin-top: 4rem; 
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
}

.card-movie {
  width: 15rem;
  height: 17rem;
  padding: 1rem;
  border-radius: 0.5rem;
  overflow: hidden;
}

.movie-name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
}

.close-button {
  margin-left: 1rem;
  background: none;
  border: none;
  cursor: pointer;
  background-color: #2c3e50;
  transition: background-color 0.3s;
  border-radius: 50%; 
  padding: 0.5rem; 
  color: white; 
}

.close-button:hover {
  background-color: #34495e; 
}

.pointer {
  cursor: pointer;
}
.el-tooltip {
  z-index: 999999; /* ou qualquer valor maior que o z-index do modal */
}

</style>
