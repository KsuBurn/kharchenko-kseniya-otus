<template>
  <div class="checkboxWrap">
    <input
        type="checkbox"
        :id="id"
        :name="id"
        :checked="isChecked"
        @change="$emit('handle-change-checkbox', id)"
    >
    <label :for="id">{{ label }}</label>
  </div>
</template>

<script>
export default {
  name: 'Checkbox',

  emits: ['handle-change-checkbox'],

  props: {
    label: String,
    id: String,
    isChecked: Boolean,
  }
}
</script>

<style scoped>
.checkboxWrap {
  margin-bottom: 10px;
}
</style>
