<template>
  <div class="the-detail">
    <header @click="$router.push({ name: mode })">
      ✕
    </header>
    <div class="item">
      <div class="top">
        <span v-for="(m, i) in item.meta" :key="i">{{ m }}</span>
      </div>
      <h2 class="title">{{item.title}}</h2>
      <div class="links">
        <a :href="item.web">{{ item.web.replace(/^https?:\/\//, '').replace(/\/$/, '') }}</a>
        <a :href="`mailto:${item.mail}`">{{ item.mail }}</a>
      </div>
      <div class="fields">
        <div v-for="(f, i) in item.fields" :key="i" class="field">
          <h3>{{f.label}}</h3>
          <p v-for="(v, i) in f.value" :key="i">{{ v }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useMainStore } from '@/store/main'

export default {
  name: 'TheDetail',
  props: ['mode'],
  setup () {
    const store = useMainStore()
    return { store }
  },
  computed: {
    item () {
      return this.store.getItem(this.$route.params.id)
    }
  }
}
</script>

<style scoped lang="scss">
.the-detail {
  display: flex;
  flex-direction: column;
  background: var(--background);

  header {
    background: var(--accent-1);
    color: var(--background);
    padding: var(--spacing);
    text-align: right;
  }
  .item {
    padding: var(--spacing);
    border: 1px solid var(--accent-1);

    .top {
      display: flex;
      justify-content: space-between;
      font-size: var(--font-size-s);
      color: var(--light-text)
    }

    .title {
      margin-bottom: var(--spacing);
    }

    .links {
      display: flex;
      flex-direction: column;
      margin-bottom: var(--spacing);
    }

    .fields {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-s);

      p + p {
        margin-top: var(--spacing);
      }
    }
  }
}
</style>
