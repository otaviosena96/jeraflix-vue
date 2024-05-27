<template>
  <div class="row">
    <div v-if="isLoading" class="loading-container">
      <!-- Aqui você pode adicionar um componente de loading, como um spinner -->
      <div class="loading-spinner"></div>
    </div>
    <div v-else class="col-md-12 teste">
      <el-card v-for="(movie, index) in movies.movies" :key="index" class="card-movie">
        <el-tooltip effect="dark" :content="movie.title" placement="top">
          <span class="movie-name">{{ truncate(movie.title, 25) }}</span>
        </el-tooltip>
        <span class="genre">{{ movie.genre }}</span>
        <div class="actions">
          <div class="mb-2">
            <el-tooltip effect="dark" :content="movie.overview" placement="top">
            <span class="pointer">SINOPSE</span>
            </el-tooltip>
          </div>
          <div class="button-container">
            <el-button v-if="!movie.favorite" @click="addToFavorites(index)" type="success" class="button" style="text-align: center; padding: 0.5rem;">QUERO VER +</el-button>
            <el-button v-else type="danger" class="button remove-button" style="background-color:#F17878; text-align: center; padding: 0.5rem;">REMOVER FAVORITO -</el-button>
          </div>
          <div class="button-container">
            <el-button v-if="!movie.watched" @click="addToWatched(index)" type="success" class="button" style="margin-top: 1rem; text-align: center; padding: 0.5rem;">JÁ ASSISTI +</el-button>
            <el-button v-else type="danger" class="button remove-button" style="margin-top: 1rem; background-color:#F17878; text-align: center; padding: 0.5rem;">REMOVER ASSISTIDO -</el-button>
          </div>
        </div>
      </el-card>
     
      <div class="pagination-container">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next"
        :total="movies.total_results"   
      />
    </div>
    </div>

  
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useMovieStore } from '../stores/moviesStore';
import { useProfileStore } from '../stores/profileStore';
import { useRoute } from 'vue-router';
import { useToast } from 'vue-toastification'

const route = useRoute();
const page = ref(1)

const storeProfile = useProfileStore();
const storeMovie = useMovieStore();
const isLoading = ref(false);
const toast = useToast()
const movies = computed(() => storeMovie.movies)


const currentPage = ref(1);
const pageSize = ref(20);
const profileId = route.params.id;

const handleCurrentChange = (val: number) => {
  currentPage.value = val;
  fetchMovies();
};

const truncate = (text: string, length: number) => {
  if (text.length > length) {
    return text.slice(0, length) + '...';
  }
  return text;
};

const addToFavorites = (index: number) => {
    const movie = movies.value.movies[index];
    const payload = {
      tmdbId: movie.id,
      genre_tmdb_id: movie.genre_ids[0],
      profile_id: profileId,      
      title: movie.title, 
    }
    storeMovie.addToFavorite(payload).then(() => {
      toast.success('Filme adicionado aos favoritos com sucesso!', );
    }).catch(() => {
      toast.error('Erro ao adicionar filme aos favoritos. Por favor, tente novamente mais tarde.');
    }).finally(() => {
      fetchMovies();
    })
  
};

const addToWatched = (index: number) => {
    console.log(movies.value.movies[index]);

};


const fetchMovies = () => {
  isLoading.value = true;
  const payload = {
    profile_id: profileId,
    page: currentPage.value,    
  };
  storeMovie.suggestedMovieWithoutGenre(payload)
    .then(() => {     
      if (isLoading.value === true) {
        isLoading.value = false;
       
      }
    })
    .catch((error) => {
      // Se houver um erro na requisição, trata-o aqui
      console.error('Erro ao buscar filmes:', error);
      isLoading.value = false;
      toast.error('Erro ao buscar filmes. Por favor, tente novamente mais tarde.');
    });
};


onMounted(() => {  
  storeProfile.getProfiles();
  fetchMovies();
});

watch([currentPage, pageSize], fetchMovies);


</script>


<style>
  .teste {
    position: fixed;
    top: 15rem;
    left: 0;
    height: 80vh; /* Ajuste a altura máxima conforme necessário */
    width: 100vw;
    background-color: rgb(161, 166, 170);
    overflow-y: auto; /* Adicione uma barra de rolagem vertical quando necessário */
    padding: 1rem; /* Adicione algum espaço interno para evitar que os filmes toquem nas bordas */
  }

  .warning{
    margin-top: 18rem;
  }



  .card-movie {
    display: inline-block; 
    margin-right: 1rem; 
    margin-top: 1rem;
    width: 15rem; 
    height: 17rem; 
    padding: 1rem; 
    border-radius: 0.5rem; 
    overflow: hidden;
    position: relative; /* Adicionando posição relativa para o tooltip */
  }

  .card-movie .movie-name {
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
  }
  
  .card-movie .genre {
    display: block;
    margin-top: 0.5rem;
    font-size: 0.8rem;
    color: gray;
  }

  .actions {   
    display: flex; /* Flexbox para alinhar os botões verticalmente */
    flex-direction: column; /* Alinhar os botões um embaixo do outro */
    align-items: center; /* Centralizar os botões horizontalmente */
    justify-content: center; /* Centralizar os botões verticalmente */
    margin-top: 4rem; /* Adicionar espaço entre os botões e o conteúdo */
    
  }

  .row {
  display: flex;
  flex-wrap: wrap; /* Permitir que os elementos filhos fluam em várias linhas */
  margin-right: -15px; /* Corrigir o espaçamento negativo */
  margin-left: -15px; /* Corrigir o espaçamento negativo */

}

.pagination-container {
  position: fixed;
  top: 11rem; /* Posicione a paginação onde desejar */
  left: 50%;
  transform: translateX(-50%);
  z-index: 999; /* Certifique-se de que a paginação esteja acima de outros elementos */
  background-color: white; /* Adicione um fundo para a paginação, se necessário */
  padding: 0.5rem 1rem; /* Adicione algum espaçamento interno para a paginação */
}

.loading-container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.8); /* Fundo semi-transparente */
    z-index: 9999; /* Garantir que esteja acima de outros elementos */
  }

  .loading-spinner {
    border: 4px solid rgba(0, 0, 0, 0.1); /* Cor e espessura da borda */
    border-top: 4px solid #3498db; /* Cor da borda superior (spinner) */
    border-radius: 50%; /* Forma do spinner */
    width: 50px; /* Tamanho do spinner */
    height: 50px; /* Tamanho do spinner */
    animation: spin 1s linear infinite; /* Animação do spinner */
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>
