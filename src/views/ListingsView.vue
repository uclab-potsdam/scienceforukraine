<template>
  <div class="listings max-width-inner">
    <div class="options">
      <nav class="mode">
        <router-link :to="{ name:'transfers' }">Student Transfers</router-link>
        <router-link :to="{ name:'positions' }">Research Positions</router-link>
      </nav>
      <the-filter/>
    </div>
    <div class="list" v-if="view === 'list'">
      <the-list :mode="mode"/>
    </div>
    <the-map v-else :mode="mode"/>
  </div>
  <div class="max-width-inner toggle-view">
    <input-radio id="toggle-view" :segmented="true" :yellow="true" :options="[{label: 'LIST', value: 'list'}, {label: 'MAP', value: 'map'}]" v-model="view"/>
  </div>
  <div class="detail" v-if="$route.params.id" @click="$router.push({ name: mode })">
    <div class="inner" @click="stopPropagation">
      <the-detail :mode="mode"/>
    </div>
  </div>
</template>

<script>
import TheFilter from '@/components/TheFilter.vue'
import TheMap from '@/components/TheMap.vue'
import TheList from '@/components/TheList.vue'

import { useMainStore } from '@/store/main'
import TheDetail from '@/components/TheDetail.vue'
import InputRadio from '@/components/InputRadio.vue'

export default {
  name: 'ListingsView',
  components: {
    TheFilter,
    TheMap,
    TheList,
    TheDetail,
    InputRadio
  },
  props: ['mode'],
  data () {
    return {
      entries: [],
      view: 'list',
      modeProxy: this.mode
    }
  },
  setup () {
    const store = useMainStore()
    return { store }
  },
  async mounted () {
    this.modeProxy = this.mode
    await this.store.setMode(this.mode)
  },
  methods: {
    stopPropagation (e) {
      e.stopPropagation()
    }
  }
  // watch: {
  //   mode: {
  //     async handler (mode) {
  //       console.log()
  //     }
  //   }
  // }
}
</script>
<style lang="scss" scoped>
@import "@/assets/style/mixins";
.listings {
  min-height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  gap: var(--spacing);
  @include wide {
    display: grid;
    grid-template-columns: 325px 1fr;
  }

  .options {
    padding: var(--spacing);
    .mode {
      display: grid;
      grid-auto-flow: column;
      grid-auto-columns: 1fr;
      margin-bottom: var(--spacing);
      a {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        padding: var(--spacing-s) var(--spacing-s);
        background: var(--background);
        border: 1px solid var(--accent-2);
        height: 30px;
        font-size: var(--font-size-s);
        transition: background var(--transition);
        cursor: pointer;
        text-transform: capitalize;
        color: var(--text);

        &:hover {
          background: var(--pale-gray);
        }

        &:first-child {
          border-radius: var(--spacing-s) 0 0 var(--spacing-s);
        }
        &:last-child {
          border-radius: 0 var(--spacing-s) var(--spacing-s) 0;
        }

        &.router-link-active {
          background: var(--accent-2);
        }
      }
    }
  }
}
.toggle-view {
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: flex-end;
  margin: 0 var(--spacing) var(--spacing) 0;
  z-index: 50;
}
.detail {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(255,255,255,0.8);
  z-index: 50;
  display: flex;
  justify-content: center;
  align-items: center;

  .inner {
    max-width: var(--medium);
    max-height: 100%;
    overflow: auto;
  }
}
</style>
