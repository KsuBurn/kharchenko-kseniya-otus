<template>
  <h3>Настройки</h3>
  <form @submit.prevent="$emit('submit', $event.target)">

    <Range
        id="time"
        v-model="time"
        :value="time"
        :max="5"
        :label-text="`Длительность: ${ time } мин.`"
        @change:value="time = $event"
    />

    <Range
        id="level"
        v-model="level"
        :value="level"
        :max="3"
        :label-text="`Сложность: ${ level }`"
        @change:value="level = $event"
    />

    <div v-for="operator in mathOperators" :key="operator.id">
      <Checkbox
          :id="operator.id"
          :label="operator.title"
      />
    </div>

    <button type="submit">Play!</button>
  </form>
</template>

<script>
import Checkbox from '@/components/Checkbox';
import Range from '@/components/Range';
import {mathOperators} from '@/constants';

export default {
  name: 'Settings',

  components: {
    Checkbox,
    Range
  },

  data() {
    return {
      mathOperators,
      time: 1,
      level: 1,
      text: ''
    }
  }
}
</script>

<style scoped>

</style>
