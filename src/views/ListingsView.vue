<template>
  <div class="listings max-width-inner">
    <div class="options">
      <h2>
        Support Offers
      </h2>
      <the-filter/>
    </div>
    <div class="list">
      <the-list />
    </div>
  </div>
  <div class="detail" v-if="$route.params.id">
    <the-detail/>
  </div>
</template>

<script>
import TheFilter from '@/components/TheFilter.vue'
import TheList from '@/components/TheList.vue'

import { useMainStore } from '@/store/main'
import TheDetail from '@/components/TheDetail.vue'

export default {
  name: 'ListingsView',
  components: {
    TheFilter,
    TheList,
    TheDetail
  },
  props: ['mode'],
  data () {
    return {
      entries: [],
      mapFilter: false
    }
  },
  setup () {
    const store = useMainStore()
    return { store }
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

  h2 {
    margin: calc(15.6px) 0 var(--spacing);
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
    .map-filter, .options-map {
      display: none;
      @include wide {
        display: block;
      }
    }
    .map-filter {
      margin-top: var(--spacing-l);
    }
    .options-map {
      height: 325px;
      width: 100%;
      position: relative;
      margin-top: var(--spacing);

      &.disabled {
        pointer-events: none;
        filter: grayscale(1);
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
  top: calc (var(--spacing-xl) + var(--spacing));
  // top: var(--spacing-xl);
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(255,255,255,0.8);
  z-index: 50;
  display: flex;
  // justify-content: center;
  // align-items: center;

  // .inner {
  //   max-width: var(--medium);
  //   max-height: 100%;
  //   overflow: auto;
  // }
}
</style>
