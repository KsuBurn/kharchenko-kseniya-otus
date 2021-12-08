<template>
  <div class="rangeWrap">
    <input
        type="range"
        step="1"
        min="1"
        :max="max"
        :id="id"
    />
    <label :for="id" class="label">{{labelText}}</label>
  </div>
</template>

<script>
export default {
  name: 'Range',

  props: {
    labelText: String,
    max: String,
    id: String,
  }
}
</script>

<style scoped>
.label {
  display: block;
}
</style>
