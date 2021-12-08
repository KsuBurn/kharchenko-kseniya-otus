<template>
  <div>
    <h2>Привет!</h2>
    <p>Добро пожаловать на  тренировочный день.</p>
<!--    <p>Ваш последний результат - решено {{rightAnswersCount}} из {{totalTasksCount}}.</p>-->
<!--    <p>Общая точность {{getAccuracyPercent}} %.</p>-->
  </div>
  <Settings @submit="handleSubmit" />
</template>

<script>
import Settings from '@/components/Settings';
import {mathOperators} from '@/constants';

export default {
  name: 'MainPage',

  components: {
    Settings
  },

  methods: {
    handleSubmit(form) {
      const data = new FormData(form);
console.log(data.get('SUM'))
console.log(form)
      const time = data.get('time');
      const level = data.get('level');
      const operations = mathOperators;

      console.log('level', level)

    }
  }


}
</script>

<style scoped>

</style>