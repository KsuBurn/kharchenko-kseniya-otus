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
          :is-checked="!!selectedOperators.find(item=> item === operator.id)"
          @handle-change-checkbox="handleChangeCheckbox"
      />
    </div>
    <div v-if="!validation" class="validationMess">
      Необходимо выбрать операторы
    </div>
    <button type="submit" class="playBtn">Play!</button>
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

  props: {
    validation: Boolean,
    changeValidationValue: Function
  },

  emits: ['submit'],

  setup(props) {
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
      props.changeValidationValue(true);

      if (selectedOperators.value.find(item => item === id)) {
        selectedOperators.value = selectedOperators.value.filter(item => item !== id);
        return;
      }

      if (!selectedOperators.value.find(item => item === id)) {
        selectedOperators.value.push(mathOperators.find(item => item.id === id).id);
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
.playBtn {
  font-size: 18px;
  float: right;
}

.validationMess {
  color: red;
  font-size: 20px;
}
</style>
