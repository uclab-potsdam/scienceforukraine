<template>
  <div class="detail">
    <the-institutions-detail/>
  </div>
</template>

<script>
// import { useMainStore } from '@/store/main'
import TheInstitutionsDetail from '@/components/TheInstitutionsDetail.vue'

export default {
  name: 'DetailView',
  components: {
    TheInstitutionsDetail
  },
  data () {
  },
  setup () {
    // const store = useMainStore()
    // return { store }
  }
}
</script>
<style lang="scss" scoped>
.detail {
  position: fixed;
  top: calc (var(--spacing-xl) + var(--spacing));
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(255,255,255,0.8);
  z-index: 50;
  display: flex;
}
</style>
