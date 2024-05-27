<template>
  <div class="row">
    <SelectProfile></SelectProfile>
    <NavBar></NavBar>
    <div v-if="isLoading" class="loading-container">
      <div class="loading-spinner"></div>
    </div>
    <div class="col-md-12 teste">
      <el-card v-for="(movie, index) in wishlist.wishlist" :key="index" class="card-movie">
        <el-tooltip effect="dark" :content="movie.title" placement="top">
          <span class="movie-name">{{ truncate(movie.title, 25) }}</span>
        </el-tooltip>
        <span class="genre">{{ movie.genre }}</span>
        <div class="actions">
          <div class="button-container">
            <el-button v-if="!movie.favorite" @click="addToFavorites(index)" type="success" class="button" style="text-align: center; padding: 0.5rem;">QUERO VER +</el-button>
            <el-button v-else @click="removeFromFavorites(index)" type="danger" class="button remove-button" style="background-color:#F17878; text-align: center; padding: 0.5rem;">REMOVER FAVORITO -</el-button>
          </div>
          <div class="button-container">
            <el-button v-if="!movie.watched" @click="addToWatched(index)" type="success" class="button" style="margin-top: 1rem; text-align: center; padding: 0.5rem;">JÁ ASSISTI +</el-button>
            <el-button v-else @click="removeFromWatched(index)" type="danger" class="button remove-button" style="margin-top: 1rem; background-color:#F17878; text-align: center; padding: 0.5rem;">REMOVER ASSISTIDO -</el-button>
          </div>
        </div>
      </el-card>
     
      <div class="pagination-container">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-size="pageSize"
        layout="total, prev, pager, next"
        :total="wishlist.totalCount"
      />
    </div>
    </div>

  
  </div>
</template>

<script  setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useMovieStore } from '../stores/moviesStore';
import { useProfileStore } from '../stores/profileStore';
import { userDefaultStore } from '../stores/defaultStore';
import { useRoute } from 'vue-router';
import { useToast } from 'vue-toastification';
import NavBar from '../components/NavBar.vue';
import SelectProfile from '../components/SelectProfile.vue';


const route = useRoute();
const toast = useToast();
const isLoading = ref(false);
const page = ref(1)
const pageSize = ref(20);
const storeProfile = useProfileStore();
const storeMovie = useMovieStore();
const storeDefault = userDefaultStore();

const wishlist = computed(() => storeMovie.wishlist)
const profile = computed(() => storeProfile.profile);
const filtered = computed(() => storeDefault.filtered);


const handleCurrentChange = (val) => {
  page.value = val;
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

const addToWatched = (index) => {
  // Implemente a lógica para adicionar o filme à lista de já assistidos
};

const profileId = route.params.id;

const getWishlist = async () => {
  if(profileId == 0) {
    storeMovie.wishlist.value = [];
    toast.warning('Selecione um perfil para visualizar a lista de desejos.');
    return;
  }
  isLoading.value = true; // Ativar o loading
  console.log(profileId)
  try {
    const payload = {
      profile_id: profileId,
      page: page.value
    };
    await storeMovie.getWishlist(payload);
    toast.success('Filmes carregados com sucesso!');
  } catch (error) {
    console.error('Erro ao buscar filmes:', error);
    toast({
      title: 'Erro!',
      message: 'Erro ao buscar filmes. Por favor, tente novamente mais tarde.',
      type: 'error',
      duration: 5000 // Duração da notificação em milissegundos
    });
  } finally {
    isLoading.value = false; // Desativar o loading
  }
}


onMounted(() => {
  storeProfile.getProfiles();
  getWishlist(profileId);
});

watch([page], getWishlist);
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
