<template>
  <p>GamePage</p>
  <div class="gamePageHeader">
    <button @click="stopGame">Отмена</button>
    <Timer :handle-show-modal="handleShowModal"/>
  </div>
  <Keyboard />

  <div v-if="showModal">
    <Modal :handle-close-modal="handleCloseModal"/>
  </div>
</template>

<script>
import Timer from '@/components/Timer';
import {useRouter} from 'vue-router';
import Keyboard from '@/components/Keyboard';
import {computed, ref} from 'vue';
import Modal from '@/components/Modal';

export default {
  name: 'GamePage',

  components: {
    Timer,
    Keyboard,
    Modal
  },

  setup() {
    const router = useRouter();

    let showModal = ref(false);

    const stopGame = () => {
      router.push('/')
    };

    const handleShowModal = () => {
      showModal.value = true;
    };

    const handleCloseModal = () => {
      showModal.value = false;
    };

    return {
      stopGame,
      showModal,
      handleShowModal,
      handleCloseModal
    }
  }
}
</script>

<style scoped>
.gamePageHeader {
  display: flex;
  justify-content: space-between;
}
</style>