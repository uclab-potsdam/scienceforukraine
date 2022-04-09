<template>
  <div class="list">
    <router-link class="item" v-for="(item, i) in items" :key="i" :to="{ name: mode, params: { id: item.id }}">
      <div class="top">
        <span v-for="(m, i) in item.meta" :key="i">{{ m }}</span>
      </div>
      <h2 class="title">{{item.title}}</h2>
      <div class="fields">
        <div v-for="(f, i) in item.fields.filter(f => f.value != null && f.value[0] !== '' && f.detail !== true)" :key="i" class="field">
          <h3>{{f.label}}</h3>
          <p>
            <template v-for="(v, i) in f.value" :key="i">
              {{ v }}
              <br/>
            </template>
          </p>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import { useMainStore } from '@/store/main'

export default {
  name: 'TheList',
  props: ['mode'],
  setup () {
    const store = useMainStore()
    return { store }
  },
  computed: {
    items () {
      return this.store.filtered
    }
  }
}
</script>

<style scoped lang="scss">
.list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing);
  .item {
    padding: var(--spacing);
    border: 1px solid var(--text);
    color: inherit;

    .top {
      display: flex;
      justify-content: space-between;
      font-size: var(--font-size-s);
      color: var(--light-text)
    }

    .title {
      margin-bottom: var(--spacing);
    }

    &:hover {
      border-color: var(--accent-1);

      .title {
        color: var(--accent-1);
      }
    }

    .fields {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-s);

      .field {
        display: -webkit-box;
        // max-width: 200px;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;

        p {
          word-wrap: anywhere;
        }

        p + p {
          margin-top: var(--spacing);
        }
      }
    }
  }
}
</style>
