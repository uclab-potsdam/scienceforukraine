<template>
  <div class="the-filter">
    <div class="filter" v-for="(f, i) in store.filters" :key="i">
      <div class="label">{{f.label}}</div>
      <component :is="`input-${f.type}`" :id="f.id" :options="f.options" v-model="store.filter[f.id]"/>
    </div>
  </div>
</template>

<script>
import { useMainStore } from '@/store/main'
import InputRadio from './InputRadio.vue'
import InputCheckbox from './InputCheckbox.vue'
import InputList from './InputList.vue'
export default {
  components: { InputRadio, InputCheckbox, InputList },
  name: 'TheFilter',
  setup () {
    const store = useMainStore()
    return { store }
  }
}
</script>

<style scoped lang="scss">
.the-filter {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-l);

  .filter {
    .label {
      // color: var(--accent-1);
      font-size: var(--font-size-s);
      margin-bottom: var(--spacing-s);
    }
  }
}
</style>
