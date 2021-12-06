<template>
  <div>
    <h2>Привет!</h2>
    <p>Добро пожаловать на  тренировочный день.</p>
<!--    <p>Ваш последний результат - решено {{rightAnswersCount}} из {{totalTasksCount}}.</p>-->
<!--    <p>Общая точность {{getAccuracyPercent}} %.</p>-->
<!--    <Settings @submit="handleSubmit"/>-->
  </div>
  <Settings />
</template>

<script>
import Settings from '@/components/Settings';
export default {
  name: 'MainPage',

  components: {
    Settings
  }


}
</script>

<style scoped>

</style>