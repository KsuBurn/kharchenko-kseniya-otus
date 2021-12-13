import {createStore} from 'vuex';

export const store = createStore({
  state() {
    return {
      time: 1,
      level: 1,
      rightAnswersCount: 0,
      selectedOperators: [
        'SUM',
      ],
    }
  },

  mutations: {
    setTime(state: any, payload) {
      state.time = payload.time;
    },

    setLevel(state, payload) {
      state.level = payload.level;
    },

    setOperations(state, payload) {
      state.selectedOperators = payload.operations;
    },

    addRightAnswer(state, payload) {
      state.rightAnswersCount = payload.rightAnswersCount;
    }
  }
})
