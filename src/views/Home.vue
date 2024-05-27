<template>
  <div class="row">
    <div class="col-md-12 teste">
      <div class="warning">
      <h1>SELECIONE UM PERFIL</h1>
      <h2>DEPOIS CLIQUE NA LISTA QUE DESEJA VISUALIZAR</h2>
      </div>

      
    </div>
    </div>

 
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { useMovieStore } from '../stores/moviesStore';
import { useProfileStore } from '../stores/profileStore';
import { userDefaultStore } from '../stores/defaultStore';
import { text } from '@fortawesome/fontawesome-svg-core';


const page = ref(1)
const storeProfile = useProfileStore();
const storeMovie = useMovieStore();
const storeDefault = userDefaultStore();

const movies = computed(() => storeMovie.movies)
const profile = computed(() => storeProfile.profile);
const filtered = computed(() => storeDefault.filtered);




const displayedMovies = computed(() => {
  const start = (currentPage.value - 1) * 20;
  const end = start + 20;
  return movies.value.slice(start, end);
});

const currentPage = ref(1);

const handleCurrentChange = (val) => {
  currentPage.value = val;
};

// Função para truncar o nome do filme se for muito longo
const truncate = (text, length) => {
  if (text.length > length) {
    return text.slice(0, length) + '...';
  }
  return text;
};

const addToFavorites = (index) => {
    const movie = movies.value[index];
    const payload = {
      tmdbId: movie.id,
      profile_id: profile.value.id       
    }

    storeMovie.addToFavorite(payload);
};

const removeFromFavorites = (index) => {
  // Implemente a lógica para remover o filme da lista de favoritos
};

const addToWatched = (index) => {
  // Implemente a lógica para adicionar o filme à lista de já assistidos
};

const removeFromWatched = (index) => {
  // Implemente a lógica para remover o filme da lista de já assistidos
};

onMounted(() => {
  storeProfile.getProfiles();
});

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

</style>
