<template>
  <div class="the-filter">
    <div class="filter">
      <input-text v-model="store.query" placeholder="Search"/>
    </div>
    <input-toggle v-model="showFilters" label="show filters" class="filter-group-toggle"/>
    <div class="filter-group" :class="{show: showFilters}">
      <div class="filter" v-for="(f) in store.filters" :key="f.label">
        <div class="label">{{f.label}}</div>
        <component :is="`input-${f.type}`" :id="f.id" :options="f.options" v-model="store.filter[f.id]"/>
      </div>
    </div>
  </div>
</template>

<script>
import { useMainStore } from '@/store/main'
import InputRadio from './InputRadio.vue'
import InputCheckbox from './InputCheckbox.vue'
import InputList from './InputList.vue'
import InputText from './InputText.vue'
import InputToggle from './InputToggle.vue'
export default {
  components: { InputRadio, InputCheckbox, InputList, InputText, InputToggle },
  name: 'TheFilter',
  setup () {
    const store = useMainStore()
    return { store }
  },
  data () {
    return {
      showFilters: false
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/style/mixins";
.the-filter {
  display: flex;
  flex-direction: column;
  padding: 0 var(--spacing);
  gap: var(--spacing-l);

  .filter {
    .label {
      // color: var(--accent-1);
      font-size: var(--font-size-s);
      margin-bottom: var(--spacing-s);
    }
  }

  .filter-group-toggle {
      @include wide {
        display: none;
      }
  }

  .filter-group {
      display: none;
      flex-direction: column;
      gap: var(--spacing-l);

      @include wide {
        display: flex;
      }
      &.show {
        display: flex;
      }
  }
}
</style>
