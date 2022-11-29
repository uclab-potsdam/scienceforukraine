<template>
  <markdown-renderer :md="post"/>
</template>

<script>
import MarkdownRenderer from '@/components/MarkdownRenderer.vue'

export default {
  name: 'PageView',
  components: {
    MarkdownRenderer
  },
  data () {
    return {
      post: ''
    }
  },
  methods: {
    setData (post) {
      this.post = post
      this.$nextTick(() => {
        setTimeout(() => { window.scrollTo(0, document.querySelector(location.hash).offsetTop - 68) }, 0)
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    fetch(`/pages/${to.name}.md`).then(d => d.text()).then(d => next(vm => vm.setData(d)))
  },
  // when route changes and this component is already rendered,
  // the logic will be slightly different.
  async beforeRouteUpdate (to, from) {
    this.post = null
    try {
      this.setData(await fetch(`/pages/${to.name}.md`).then(d => d.text()))
    } catch (error) {
      this.error = error.toString()
    }
  }
}
</script>
<style lang="scss">
.markdown {
  a:hover {
    text-decoration: underline;
  }
}
</style>
