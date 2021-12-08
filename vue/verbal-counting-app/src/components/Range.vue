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
        @change="$emit('change:value', $event.target.value)"
    />
    <label :for="id" class="label">{{ labelText }}</label>
  </div>
</template>

<script>
export default {
  name: 'Range',

  emits: ['change:value'],

  props: {
    labelText: String,
    max: Number,
    id: String,
    value: Number,
  },

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
