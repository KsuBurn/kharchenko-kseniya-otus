<template>
  <div class="keyboard">
    <div
        v-for="(calcKey, index) of calcKeys"
        :key="index"
    >
      <button
          @click="$emit('handle-key-click', calcKey)"
          class="key"
          v-bind:class="{
            key: true,
            keyNone: !calcKey.length
          }"
      >
        {{ calcKey }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Keyboard',

  emits: ['handle-key-click'],

  data() {
    return {
      calcKeys: [
        '1', '2', '3',
        '4', '5', '6',
        '7', '8', '9',
        '?', '0', '=',
        '', 'CE', ''
      ],
    }
  },
}
</script>

<style scoped>
.keyboard {
  margin: 64px 32px 32px;
  display: grid;
  grid-template-columns: repeat(3, 50px);
  grid-template-rows: repeat(3, 50px);
  grid-gap: 30px;
  justify-content: center;
}

.key {
  width: 40px;
  height: 40px;
  background: #ff7042;
  font-size: 20px;
}

.key:active {
  background: #e34c26;
}

.keyNone {
  display: none;
}
</style>