<template>
  <div class="list">
    <router-link class="item" v-for="(item, i) in items" :key="i" :to="{ name: 'institutionsDetail', params: { id: item.id }}">
      <div class="top">
        <span>{{ item.country }}</span>
        <span>{{ item.id }}</span>
      </div>
      <h2 class="title">{{item.institution}}</h2>
      <div class="fields">
        <p class="field">
          <template v-for="(v, i) in item.description?.split('\\n')" :key="i">
            {{ v }}
            <br>
          </template>
        </p>
        <template v-if="item.researchFocus">
          <h3>Research Focus / Keywords</h3>
          <p class="field">
            <template v-for="(v, i) in item.researchFocus?.split('\\n')" :key="i">
              {{ v }}
              <br>
            </template>
          </p>
        </template>

        <template v-if="item.supportPeriod">
          <h3>Support Period</h3>
          <p class="field">{{ item.supportPeriod }}</p>
        </template>

        <template v-if="item.applicationDeadline">
          <h3>Application Deadline</h3>
          <p class="field">{{ item.applicationDeadline }}</p>
        </template>
        <!-- <div v-for="(f, i) in item.fields.filter(f => f.value != null && f.value[0] !== '' && f.detail !== true)" :key="i" class="field">
          <h3>{{f.label}}</h3>
          <p>
            <template v-for="(v, i) in f.value" :key="i">
              {{ v }}
              <br/>
            </template>
          </p>
        </div> -->
      </div>
      <div class="tags">
        <template v-for="(f, fi) in filters.filter(f => f.type === 'toggle' || f.type === 'radio')" :key="fi">
          <template v-for="(t, ti) in f.columns?.filter(o => item[o.value] === 1)" :key="ti">
            <span class="tag" :class="{primary: f.primary}">
              {{ t.label }}
            </span>
          </template>
        </template>
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
    store.initInstitutions()
    return { store }
  },
  computed: {
    items () {
      return this.store.filtered
    },
    filters () {
      return this.store.filters
    }
  }
}
</script>

<style scoped lang="scss">
.list {
  display: flex;
  flex-direction: column;
  // border-left: var(--spacing-xs) solid var(--light-gray);
  // gap: var(--spacing);
  .item {
    padding: var(--spacing);
    // margin: 0 var(--spacing);
    // border: 1px solid var(--text);
    color: inherit;

    &+.item {
      border-top: var(--spacing-xs) solid var(--light-gray);
    }

    .top {
      display: flex;
      justify-content: space-between;
      font-size: var(--font-size-s);
      color: var(--light-text)
    }

    .title {
      margin-bottom: var(--spacing);
      color: var(--accent-1);
    }

    &:hover {
      // border-color: var(--accent-1);
      background-color: var(--pale-gray);

      .title {
        color: var(--accent-1);
      }
    }

    .fields {
      display: flex;
      flex-direction: column;
      // gap: var(--spacing-s);

      .field {
        display: -webkit-box;
        // max-width: 200px;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        word-wrap: anywhere;

        p + p {
          margin-top: var(--spacing);
        }
        font-size: var(--font-size-s);

      }
      p + h3 {
        margin-top: var(--spacing-s);
        color: var(--light-text);
      }
    }
    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: var(--spacing-s);
      margin-top: var(--spacing);
      .tag {
        display: inline-flex;
        height: 25px;
        padding: 0 var(--spacing-s);
        align-items: center;
        border-radius: var(--spacing-s);
        // border: 1px solid var(--accent-1);
        background: var(--accent-1);
        color: var(--background);
        font-size: var(--font-size-s);

        // & + .tag {
        //   margin-left: var(--spacing-s);
        // }
        &.primary {
          background: var(--accent-2);
          color: var(--text);
        }
      }
    }
  }
}
</style>
