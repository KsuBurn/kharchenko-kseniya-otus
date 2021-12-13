<template>
  <div class="wrap">
    <span>{{ operands.firstOperand }} </span>
    <span>&nbsp;{{ operands.operator }}&nbsp;</span>
    <input
        :value="inputAnswer"
        @input="$emit('handle-change-answer', $event.target.value)"
        :style="`color: ${highlightColor}`"
        class="answerInput"
        @focus="$emit('inputFocus')"
    >
    <span> = </span>
    <span>{{ operands.result }} </span>
    <span>? </span>
  </div>
</template>

<script>
export default {
  name: 'MathTask',

  emits: ['handle-change-answer', 'generate-task'],

  props: {
    inputAnswer: String,
    operands: Object,
    prepareTask: Function,
    highlightColor: String,
    generateTask: Function
  },

  data() {
    return {
      operators: this.$store.state.selectedOperators,
      level: this.$store.state.level,
      time: this.$store.state.time,
    }
  },

  mounted() {
    this.$emit('generate-task');
  }
}
</script>

<style scoped>
.answerInput {
  border: none;
  border-bottom: solid 1px lightgray;
  outline: none;
  width: 100px;
  font-size: 30px;
  font-weight: 500;
  text-align: center;
}

.wrap {
  width: 100%;
  margin: auto 0 0;
  text-align: center;
  font-size: 30px;
  font-weight: 500;
}
</style>
