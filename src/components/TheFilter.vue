<template>
  <div class="the-filter">
    <div class="filter">
      <input-text v-model="store.query" placeholder="Search"/>
    </div>
    <div class="filter-group" :class="{show: showFilters}">
      <div class="filter" :class="{primary: f.primary}" v-for="(f) in store.filters.filter(f => f.category == null || f.category === store.filter.category)" :key="f.name">
        <input-radio v-if="f.type === 'radio'" :name="f.name" :options="[{value: null, label: 'Any'}, ...f.columns]" v-model="store.filter[f.name]" :primary="f.primary" :hide-label="f.hideLabel"/>
        <input-select v-else-if="f.type === 'select'" :name="f.name" :options="[{value: null, label: 'Any'}, ...(f.options || [])]" v-model="store.filter[f.name]"/>
        <input-toggle v-else-if="f.type === 'toggle'" :name="f.name" v-model="store.filter[f.key]"/>
      </div>
    </div>
    <input-toggle v-model="showFilters" name="Show All Filters" class="filter-group-toggle"/>
  </div>
</template>

<script>
import { useMainStore } from '@/store/main'
import InputRadio from './InputRadio.vue'
import InputSelect from './InputSelect.vue'
import InputText from './InputText.vue'
import InputToggle from './InputToggle.vue'
export default {
  components: { InputRadio, InputSelect, InputText, InputToggle },
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
  gap: var(--spacing-l);

  .filter-group-toggle {
      @include wide {
        display: none;
      }
  }

  .filter-group {

    flex-direction: column;
    gap: var(--spacing-l);
    display: flex;

    .filter {
      display: none;
      @include wide {
        display: block;
      }
      &.primary {
        display: block;
      }
    }
    &.show {
      .filter {
        display: block;
      }
    }
  }
}
</style>
