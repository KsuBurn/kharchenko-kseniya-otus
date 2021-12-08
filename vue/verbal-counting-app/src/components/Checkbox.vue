<template>
  <div class="checkboxWrap">
    <input
        type="checkbox"
        :id="id"
        :name="id"
    >
    <label :for="id">{{label}}</label>
  </div>
</template>

<script>
export default {
  name: 'Checkbox',

  props: {
    label: String,
    id: String,
  }
}
</script>

<style scoped>
.checkboxWrap {
  margin-bottom: 10px;
}
</style>
