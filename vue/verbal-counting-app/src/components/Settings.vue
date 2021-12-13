<template>
  <h3>Настройки</h3>
  <form @submit.prevent="$emit('submit', $event)">

    <Range
        v-model="time"
        id="time"
        :value="time"
        :max="5"
        :label-text="`Длительность: ${ time } мин.`"
        @change-range-input="handleChangeTime"
    />

    <Range
        v-model="level"
        id="level"
        :value="level"
        :max="3"
        :label-text="`Сложность: ${ level }`"
        @change-range-input="handleChangeLevel"
    />

    <div v-for="operator in mathOperators" :key="operator.id">

      <Checkbox
          :id="operator.id"
          :label="operator.title"
          :is-checked="!!selectedOperators.find(item=> item.id === operator.id)"
          @handle-change-checkbox="handleChangeCheckbox"
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
import {computed, ref} from 'vue';

export default {
  name: 'Settings',

  components: {
    Checkbox,
    Range
  },

  emits: ['submit'],

  setup() {
    const store = useStore();
    const time = ref(1);
    const level = ref(1);
    const selectedOperators = ref(store.state.selectedOperators)

    const handleChangeTime = (value) => {
      time.value = value;
    };

    const handleChangeLevel = (value) => {
      level.value = value;
    };

    const handleChangeCheckbox = (id) => {
      if (selectedOperators.value.find(item => item.id === id)) {
        selectedOperators.value = selectedOperators.value.filter(item => item.id !== id);
        return;
      }

      if (!selectedOperators.value.find(item => item.id === id)) {
        selectedOperators.value.push(mathOperators.find(item => item.id === id));
      }
    };

    return {
      selectedOperators: computed(() => selectedOperators.value),
      mathOperators,
      time: computed(() => time.value.toString()),
      level: computed(() => level.value.toString()),
      handleChangeTime,
      handleChangeLevel,
      handleChangeCheckbox
    }
  },
}
</script>

<style scoped>

</style>
