<template>
  <div class="rangeWrap">
    <input
        type="range"
        step="1"
        min="1"
        :max="max"
        :id="id"
        :name="id"
        :value="value"
        @input="$emit('change-range-input', $event.target.value)"
    />
    <label :for="id" class="label">{{ labelText }}</label>
  </div>
</template>

<script>
export default {
  name: 'Range',

  props: {
    labelText: String,
    max: Number,
    id: String,
    value: String,
  },

  emits: ['change-range-input'],
}
</script>

<style scoped>
.rangeWrap {
  margin-bottom: 15px;
}

.label {
  display: block;
}
</style>
