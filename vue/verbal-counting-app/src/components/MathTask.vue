<template>
  <div>
    <span>{{ operands.firstOperand }}</span>
    <span>{{ operands.operator }}</span>
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

  emits: ['handle-change-answer'],

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

  // methods: {
  //   generateTask() {
  //     const operatorIndex = Math.floor(Math.random() * this.operators.length);
  //     const selectedOperator = this.operators[operatorIndex];
  //
  //     this.prepareTask(selectedOperator)
  //   },
  //
  // },

  mounted() {
    this.generateTask()
  }
}
</script>

<style scoped>
.answerInput {
  border: none;
  border-bottom: solid 1px lightgray;
  outline: none;
}
</style>
