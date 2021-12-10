<template>
  <div class="keyboard">
    <div class="key"
         v-for="(calcKey, index) of calcKeys"
         :key="index"
    >
      <button>{{ calcKey }}</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Keyboard',

  data() {
    return {
      calcKeys: [
        '1', '2', '3',
        '4', '5', '6',
        '7', '8', '9',
        '?', '0', '='
      ]
    }
  }
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
</style>