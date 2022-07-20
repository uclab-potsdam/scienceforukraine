<template>
  <the-navigation/>
  <div class="max-width">
    <router-view :key="$route.name"/>
  </div>
</template>
<script>
import TheNavigation from './components/TheNavigation.vue'

export default {
  components: { TheNavigation },

  data () {
    return {
      expanded: false
    }
  }

}
</script>
<style lang="scss">
@import "@/assets/style/base";
</style>

<style scoped lang="scss">
</style>
