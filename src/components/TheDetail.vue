<template>
  <div class="the-detail">
    <header class="max-width">
      <div class="max-width-inner">
        <span @click="$router.push({ name: mode })">← all {{ mode === 'positions' ? 'research positions' : 'student transfers' }}</span>
        <span>
          <span @click="$router.push({ name: mode, params: {id: prev} })">← </span>
          <span class="dimmed">{{index + 1}}/{{items.length}}</span>
          <span @click="$router.push({ name: mode, params: {id: next} })">  →</span>
        </span>
      </div>
    </header>
    <div class="item max-width">
      <div class="max-width-inner">
        <div class="top">
          <span v-for="(m, i) in item.meta" :key="i">{{ m }}</span>
        </div>
        <h2 class="title">{{item.title}}</h2>
        <div class="links">
          <a :href="item.web" target="_blank">{{ item.web?.replace(/^https?:\/\//, '').replace(/\/$/, '') }}</a>
          <a :href="`mailto:${item.mail}`">{{ item.mail }}</a>
        </div>
        <div class="fields">
          <div v-for="(f, i) in item.fields" :key="i" class="field">
            <h3>{{f.label}}</h3>
            <p v-for="(v, i) in f.value" :key="i">{{ v || '–' }}</p>
          </div>
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
    },
    items () {
      return this.store.filtered
    },
    index () {
      return this.items.findIndex(i => i.id === this.item.id)
    },
    prev () {
      const index = (this.index <= 0 ? this.items.length : this.index) - 1
      return this.items[index]?.id
    },
    next () {
      const index = this.index >= this.items.length - 1 ? 0 : this.index + 1
      return this.items[index]?.id
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/style/mixins";
.the-detail {
  width: 100%;
  display: flex;
  flex-direction: column;
  background: var(--background);

  header {
    background: var(--pale-gray);
    color: var(--accent-1);
    padding: var(--spacing);
    // text-align: right;
    cursor: pointer;

    > div {
      justify-content: space-between;
      display: flex;
      flex-wrap: wrap;

      .dimmed {
        color: var(--light-text);
      }
    }
  }
  .item {
    padding: var(--spacing);
    // border: 1px solid var(--accent-1);

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

  .max-width-inner {
    padding: 0 var(--spacing);
  }
}
</style>
