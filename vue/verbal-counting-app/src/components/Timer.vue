<template>
  <div class="timer">
    {{timeView.minutes}} : {{timeView.seconds}}
  </div>
</template>

<script>
import {useStore} from 'vuex';
import {computed, ref, onUnmounted, watch} from 'vue';

export default {
  name: 'Timer',

  props: {
    handleShowModal: Function
  },

  setup(props) {
    const store = useStore();

    let initialSeconds = ref(store.state.time * 60);

    const addZeroFirst = (num) => {
      return num > 9 ? num.toString() : `0${num}`;
    };

    const timer = setInterval(() => {
      if (initialSeconds.value <= 0) {
        clearInterval(timer);
      } else {
        --initialSeconds.value;
      }
    }, 1000);

    const timeView = computed(() => {
      return {
        seconds: addZeroFirst(initialSeconds.value % 60),
        minutes: addZeroFirst(Math.floor(initialSeconds.value / 60) % 60),
      }
    });

    onUnmounted(() => {
      clearInterval(timer)
    })

    watch(initialSeconds, (value) => {
      if (value <= 0) {
        props.handleShowModal();
      }
    })

    return {
      timeView: timeView
    }
  }
}
</script>

<style scoped>
.timer {
  text-align: center;
  padding: 8px 16px;
  font-size: 16px;
  background: #ECEFF1;
  border: 1px solid #CFD8DC;
  border-radius: 3px;
}
</style>