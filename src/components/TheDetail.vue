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
          <a :href="item.link" target="_blank">Details</a>
          <a :href="`mailto:${item.contact}`">Contact</a>
        </div>
        <div class="fields">
          <p v-for="(paragraph, i) in item.description?.split('\\n').filter(p => p.trim() !== '')" :key="i">{{ paragraph }}</p>

          <template v-if="item.researchFocus">
            <h3>Research Focus / Keywords</h3>
            <p v-for="(paragraph, i) in item.researchFocus?.split('\\n').filter(p => p.trim() !== '')" :key="i">{{ paragraph }}</p>
          </template>

          <template v-if="item.conditions">
            <h3>Conditions for Tuition Waiver</h3>
            <p v-for="(paragraph, i) in item.conditions?.split('\\n').filter(p => p.trim() !== '')" :key="i">{{ paragraph }}</p>
          </template>

          <template v-if="item.supportPeriod">
            <h3>Support Period</h3>
            <p v-for="(paragraph, i) in item.supportPeriod?.split('\\n').filter(p => p.trim() !== '')" :key="i">{{ paragraph }}</p>
          </template>

          <template v-if="item.applicationDeadline">
            <h3>Application Deadline</h3>
            <p v-for="(paragraph, i) in item.applicationDeadline?.split('\\n').filter(p => p.trim() !== '')" :key="i">{{ paragraph }}</p>
          </template>

          <template v-if="item.additionalSupport">
            <h3>Additional Support</h3>
            <p v-for="(paragraph, i) in item.additionalSupport?.split('\\n').filter(p => p.trim() !== '')" :key="i">{{ paragraph }}</p>
          </template>

          <!-- <div v-for="(f, i) in item.fields" :key="i" class="field">

            <p v-for="(v, i) in f.value" :key="i">{{ v || '–' }}</p>
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
    filters () {
      return this.store.filters
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
    overflow: auto;
    margin-bottom: 50px;
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
      // flex-direction: column;
      gap: var(--spacing);
      margin-bottom: var(--spacing);

      a {
        &:hover {
          text-decoration: underline;
        }
        &::after {
          content: "↗";
          transform: translate(1px, 2px);
          display: inline-block;
        }
      }
    }

    .fields {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-s);

      p + p {
        margin-top: var(--spacing);
      }

      p + h3 {
        margin-top: var(--spacing);
        color: var(--light-text)
      }
    }

    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: var(--spacing-s);
      margin-top: var(--spacing);
      margin-bottom: var(--spacing-xl);
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

  .max-width-inner {
    padding: 0 var(--spacing);
  }
}
</style>
