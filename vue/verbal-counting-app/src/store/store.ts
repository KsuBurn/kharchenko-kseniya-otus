import {createStore} from 'vuex';

export const store = createStore({
  state() {
    return {
      time: 1,
      level: 1,
      selectedOperators: [
        {
          id: 'SUM',
          symbol: '+',
          title: 'Суммирование',
        },
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
  }
})
