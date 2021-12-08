<template>
  <h3>Настройки</h3>
  <Range
      labelText="Длительность мин."
      max="15"
      id="time"
  />

  <Range
      labelText="Сложность"
      max="3"
      id="level"
  />

  <div v-for="operator in mathOperators" :key="operator.id">
    <Checkbox
      :id="operator.id"
      :label="operator.title"
    />
  </div>

</template>

<script>
import Range from '@/components/Range';
import Checkbox from '@/components/Checkbox';
import {mathOperators} from '@/constants';

export default {
  name: 'Settings',

  components: {
    Checkbox,
    Range
  },

  data() {
    return {
      mathOperators
    }
  }
}
</script>

<style scoped>

</style>
