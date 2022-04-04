<template>
  <div class="entries">
    <the-filter/>
    <the-list :mode="mode"/>
  </div>
  <div class="detail" v-if="$route.params.id" @click="$router.push({ name: mode })">
    <div class="inner" @click="stopPropagation">
      <the-detail :mode="mode"/>
    </div>
  </div>
</template>

<script>
import TheFilter from '@/components/TheFilter.vue'
// import TheMap from '@/components/TheMap.vue'
import TheList from '@/components/TheList.vue'

import { useMainStore } from '@/store/main'
import TheDetail from '@/components/TheDetail.vue'

export default {
  name: 'EntriesView',
  components: {
    TheFilter,
    // TheMap,
    TheList,
    TheDetail
  },
  props: ['mode'],
  data () {
    return {
      entries: []
    }
  },
  setup () {
    const store = useMainStore()
    return { store }
  },
  async mounted () {
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
.entries {
  display: grid;
  gap: var(--spacing);
  @include wide {
    grid-template-columns: 300px 1fr;
  }
}
.detail {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(255,255,255,0.8);
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  // padding: var(--spacing-l);

  .inner {
    max-width: var(--medium);
    max-height: 100%;
    overflow: auto;
  }
}
</style>
