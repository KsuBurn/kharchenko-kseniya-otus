<template>
  <h3>Настройки</h3>
  <form @submit.prevent="$emit('submit', $event)">

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
          :is-checked="selectedOperators.indexOf(operator.id) > -1"
      />
    </div>

    <button type="submit">Play!</button>
  </form>
</template>

<script>
import Checkbox from '@/components/Checkbox';
import Range from '@/components/Range';
import {mathOperators} from '@/constants';
import {useStore} from 'vuex';

export default {
  name: 'Settings',

  components: {
    Checkbox,
    Range
  },

  setup() {
    const store = useStore();
    return {
      selectedOperators: store.state.selectedOperators
    }
  },

  data() {
    return {
      mathOperators,
      time: 1,
      level: 1,
    }
  },
}
</script>

<style scoped>

</style>
