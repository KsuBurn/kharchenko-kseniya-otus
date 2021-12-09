<template>
  <div>
    <h2>Привет!</h2>
    <p>Добро пожаловать на тренировочный день.</p>
    <!--    <p>Ваш последний результат - решено {{rightAnswersCount}} из {{totalTasksCount}}.</p>-->
    <!--    <p>Общая точность {{getAccuracyPercent}} %.</p>-->
  </div>
  <Settings @submit="handleSubmit"/>
</template>

<script>
import Settings from '@/components/Settings';
import {mathOperators} from '@/constants';
import {useStore} from 'vuex';
import {useRouter} from 'vue-router';

export default {
  name: 'MainPage',

  components: {
    Settings
  },


  setup() {
    const store = useStore();
    const router = useRouter();

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
        router.push('/game')
      }
    }

    return {
      handleSubmit
    }
  }


}
</script>

<style scoped>

</style>