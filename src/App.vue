<template>
  <the-navigation/>
  <div class="max-width">
    <router-view :key="$route.name"/>
  </div>
</template>
<script>
import TheNavigation from './components/TheNavigation.vue'
import { useMainStore } from '@/store/main'
export default {
  components: { TheNavigation },

  data () {
    return {
      expanded: false
    }
  },
  setup () {
    const store = useMainStore()
    store.init()
  }
}
</script>
<style lang="scss">
@import "@/assets/style/base";
</style>

<style scoped lang="scss">
</style>
