<template>
  <div>
    <h2>Привет!</h2>
    <p>Добро пожаловать на тренировочный день.</p>
        <p>Ваш последний результат - решено {{rightAnswersCount}}.</p>
  </div>
  <Settings
      @submit="handleSubmit"
      :validation="validation"
      :change-validation-value="changeValidationValue"
  />
</template>

<script>
import Settings from '@/components/Settings';
import {mathOperators} from '@/constants';
import {useStore} from 'vuex';
import {useRouter} from 'vue-router';
import {computed, ref} from 'vue';

export default {
  name: 'MainPage',

  components: {
    Settings
  },


  setup() {
    const store = useStore();
    const router = useRouter();
    const validation = ref(true);
    const rightAnswersCount = store.state.rightAnswersCount;

    const handleSubmit = (event) => {
      const data = new FormData(event.target);

      const time = data.get('time');
      const level = data.get('level');
      const operations = mathOperators.filter(item => data.get(item.id) !== null).map(item => item.id);

      store.commit({
        type: 'setTime', time
      })


      store.commit({
        type: 'setLevel', level
      })

      store.commit({
        type: 'setOperations', operations
      })

      if (operations.length > 0) {
        validation.value = true;
        router.push('/game');
      } else {
        validation.value = false;
      }
    }

    const changeValidationValue = (value) => {
      validation.value = value;
    };

    return {
      handleSubmit,
      validation: computed(() => validation.value),
      changeValidationValue,
      rightAnswersCount
    }
  }


}
</script>

<style scoped>

</style>