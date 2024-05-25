<template>
  <div v-if="visible" class="modal d-block" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">CRIE UM PERFIL</h5>
          <button type="button" class="btn-close" aria-label="Close" @click="closeModal"></button>
        </div>
        <div class="modal-body">
          <el-form>
            <el-form-item label="Nome do Perfil">
              <el-input v-model="form.name" placeholder="Digite o nome"></el-input>
            </el-form-item>
            <el-form-item label="Cor do Perfil">
              <el-color-picker v-model="form.color" />
            </el-form-item>
          </el-form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="createProfile">
            
            <span>SALVAR</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, reactive } from 'vue';

const form = reactive({
  name: '',
  color: '',
});

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  }
});

const emits = defineEmits(['update:visible']);

const createProfile = () => {
  console.log(form);
  emits('update:visible', false);
}

const closeModal = () => {
  emits('update:visible', false);
}
</script>
