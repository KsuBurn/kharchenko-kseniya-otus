<template>
  <h3>Настройки</h3>
  <Range />
  <Checkbox />
</template>

<script>
import Range from '@/components/Range';
import Checkbox from '@/components/Checkbox';

export default {
  name: 'Settings',

  components: {
    Checkbox,
    Range
  }
}
</script>

<style scoped>

</style>