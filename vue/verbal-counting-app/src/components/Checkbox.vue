<template>
  <input
      type="checkbox"
      :id="id"
  >
  <label :for="id">{{label}}</label>
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

</style>
