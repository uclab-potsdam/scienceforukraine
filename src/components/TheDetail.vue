<template>
  <div class="the-detail">
    <header class="max-width">
      <div class="max-width-inner">
        <span @click="$router.push({ name: 'home' })">← all submissions</span>
        <span>
          <span @click="$router.push({ name: 'detail', params: {id: prev} })">← </span>
          <span class="dimmed">{{index + 1}}/{{items.length}}</span>
          <span @click="$router.push({ name: 'detail', params: {id: next} })">  →</span>
        </span>
      </div>
    </header>
    <div class="item max-width">
      <div class="max-width-inner">
        <div class="top">
          <span>{{ item.country }}</span>
          <span>{{ item.id }}</span>
        </div>
        <h2 class="title">{{item.institution}}</h2>
        <div class="links">
          <a :href="item.link" target="_blank">{{ item.link?.replace(/^https?:\/\//, '').replace(/\/$/, '') }}</a>
          <a :href="`mailto:${item.contact}`">contact</a>
        </div>
        <div class="fields">
          <p v-for="(paragraph, i) in item.description.split('\\n')" :key="i">{{ paragraph }}</p>
          <!-- <div v-for="(f, i) in item.fields" :key="i" class="field">
            <h3>{{f.label}}</h3>
            <p v-for="(v, i) in f.value" :key="i">{{ v || '–' }}</p>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useMainStore } from '@/store/main'

export default {
  name: 'TheDetail',
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
