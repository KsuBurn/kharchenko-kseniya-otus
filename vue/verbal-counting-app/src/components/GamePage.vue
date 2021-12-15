<template>
  <div class="gamePageHeader">
    <button @click="stopGame" class="stopButton">Отмена</button>
    <Timer @handle-show-modal="handleShowModal"/>
  </div>
  <MathTask
      v-model="inputAnswer"
      :input-answer="inputAnswer"
      :operands="operands"
      :prepare-task="prepareTask"
      :highlight-color="highlightColor"
      @handle-change-answer="handleChangeAnswer"
      @input-focus="inputFocus"
      @generate-task="generateTask"
  />
  <div v-if="showError" class="errorMessage">Надо заполнить значение</div>
  <Keyboard @handle-key-click="handleKeyClick" :disable-buttons="disableButtons"/>
  <div v-if="showModal">
    <Modal @handle-close-modal="handleCloseModal" :right-answers-count="rightAnswersCount"/>
  </div>
</template>

<script>
import Timer from '@/components/Timer';
import {useRouter} from 'vue-router';
import Keyboard from '@/components/Keyboard';
import {computed, ref} from 'vue';
import Modal from '@/components/Modal';
import MathTask from '@/components/MathTask';
import {mathOperators, Operatos} from '@/constants';
import {useStore} from 'vuex';

export default {
  name: 'GamePage',

  components: {
    Timer,
    Keyboard,
    MathTask,
    Modal
  },


  setup() {
    const router = useRouter();
    const store = useStore();
    const level = store.state.level;
    const selectedOperators = store.state.selectedOperators;
    const showModal = ref(false);
    const inputAnswer = ref('');
    const rightAnswersCount = ref(0);
    const totalTasksCount = ref(0);
    const highlightColor = ref('lightgray');
    const showError = ref(false);
    const disableButtons = ref(false);
    const operands = ref({
      firstOperand: 0,
      secondOperand: 0,
      result: 0,
      operator: '',
    });

    const stopGame = () => {
      store.commit({
        type: 'addRightAnswer', rightAnswersCount: rightAnswersCount.value
      })

      store.commit({
        type: 'addTotalTasksCount', totalTasksCount: totalTasksCount.value
      })

      router.push('/');
      initialState();
    };

    const handleShowModal = () => {
      showModal.value = true;
    };

    const handleCloseModal = () => {
      showModal.value = false;

      store.commit({
        type: 'addRightAnswer', rightAnswersCount: rightAnswersCount.value
      })

      store.commit({
        type: 'addTotalTasksCount', totalTasksCount: totalTasksCount.value
      })

      stopGame();
    };

    const checkAnswer = () => +inputAnswer.value === operands.value.secondOperand;

    const handleChangeAnswer = (value) => {
      inputAnswer.value = value;
    };

    const initialState = () => {
      highlightColor.value = 'lightgray';
      inputAnswer.value = '';
      showError.value = false;
    }

    const generateTask = () => {
      initialState();
      totalTasksCount.value++;

      if (disableButtons.value) {
        disableButtons.value = false;
      }

      const operatorIndex = Math.floor(Math.random() * selectedOperators.length);
      const selectedOperator = selectedOperators[operatorIndex];

      prepareTask(selectedOperator)
    }

    const getHelp = () => {
      disableButtons.value = true;
      inputAnswer.value = operands.value.secondOperand.toString();
      highlightColor.value = '#42caff';
      setTimeout(generateTask, 500)
    }

    const deleteInputValue = () => {
      const valueInArr = inputAnswer.value.split('');
      valueInArr.pop();

      inputAnswer.value = valueInArr.join();
    }

    const handleKeyClick = (calcKey) => {
      showError.value = false;

      if (calcKey !== '=' && calcKey !== '?' && calcKey !== 'CE') {
        inputAnswer.value = inputAnswer.value + calcKey;
      }

      if (calcKey === '=' && inputAnswer.value.length) {
        if (checkAnswer()) {
          rightAnswersCount.value++;
          highlightColor.value = 'green';
        } else {
          highlightColor.value = 'red';
        }
        setTimeout(generateTask, 500);
      } else if (calcKey === '=' && !inputAnswer.value.length) {
        showError.value = true;
      }

      if (calcKey === '?') {
        getHelp();
      }

      if (calcKey === 'CE' && inputAnswer.value.length) {
        deleteInputValue();
      }
    };

    const prepareTask = (operator) => {
      const mathSignsCount = {
        1: 10,
        2: 100,
        3: 1000
      };

      let firstOperand = Math.floor(Math.random() * mathSignsCount[level]) + 1;
      let secondOperand = Math.floor(Math.random() * mathSignsCount[level]) + 1;
      let result;

      switch (operator) {
        case Operatos.SUM:
          result = firstOperand + secondOperand;
          break;

        case Operatos.DIFF:
          result = firstOperand - secondOperand;
          break;

        case Operatos.MULT:
          result = firstOperand * secondOperand;
          break;

        case Operatos.DIV: {
          const auxiliaryVar = firstOperand;

          firstOperand = firstOperand * secondOperand;
          result = auxiliaryVar;
          break;
        }

        case Operatos.EXP: {
          const exponent = {
            1: [0, 1, 2, 3],
            2: [0, 1, 2, 3, 4],
            3: [0, 1, 2, 3, 4, 5]
          };

          const expVariants = exponent[level];

          firstOperand = Math.floor(Math.random() * 10) + 2;
          secondOperand = expVariants.indexOf(Math.floor(Math.random() * expVariants.length));
          result = Math.pow(firstOperand, secondOperand);
          break;
        }
      }

      operands.value.result = result;
      operands.value.firstOperand = firstOperand;
      operands.value.secondOperand = secondOperand;
      operands.value.operator = mathOperators.find((item) => item.id === operator)?.symbol;
    };

    const inputFocus = () => {
      highlightColor.value = 'lightgray';
      showError.value = false;
    };

    return {
      stopGame,
      showModal,
      handleShowModal,
      handleCloseModal,
      handleKeyClick,
      handleChangeAnswer,
      operands: operands.value,
      prepareTask,
      inputFocus,
      generateTask,
      showError: computed(() => showError.value),
      rightAnswersCount: computed(() => rightAnswersCount.value),
      inputAnswer: computed(() => inputAnswer.value),
      highlightColor: computed(() => highlightColor.value),
      disableButtons: computed(() => disableButtons.value)
    }
  },
}
</script>

<style scoped>
.gamePageHeader {
  display: flex;
  justify-content: space-between;
}

.stopButton {
  font-size: 18px;
}

.errorMessage {
  color: red;
  text-align: center;
  margin-top: 10px;
}
</style>