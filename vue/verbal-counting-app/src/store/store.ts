import {createStore} from 'vuex';

type StoreType = {
  time: number;
  level: number;
  rightAnswersCount: number;
  totalTasksCount: number;
  selectedOperators: string[];
}

export const store = createStore({
  state() {
    return {
      time: 1,
      level: 1,
      rightAnswersCount: 0,
      totalTasksCount: 0,
      selectedOperators: [
        'SUM',
      ],
    }
  },

  mutations: {
    setTime(state: StoreType, payload) {
      state.time = payload.time;
    },

    setLevel(state: StoreType, payload) {
      state.level = payload.level;
    },

    setOperations(state: StoreType, payload) {
      state.selectedOperators = payload.operations;
    },

    addRightAnswer(state: StoreType, payload) {
      state.rightAnswersCount = payload.rightAnswersCount;
    },

    addTotalTasksCount(state: StoreType, payload) {
      state.totalTasksCount = payload.totalTasksCount;
    }
  }
})
