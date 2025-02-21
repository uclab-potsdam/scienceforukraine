<template>
  <div class="markdown" v-html="html"/>
</template>

<script>
import DOMPurify from 'dompurify'
import { marked } from 'marked'
export default {
  name: 'MarkdownRenderer',
  props: ['md'],
  computed: {
    html () {
      const md = this.md || ''
      return marked.parse(md)
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/style/mixins";
.markdown {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 var(--spacing);
  > * {
    max-width: 800px;
    width: 100%;
    margin-bottom: var(--spacing);
  }

  a {
    word-break: break-word;
  }

  font-size: 14px;

  h1, h2, h3 {
    margin-top: var(--spacing-l);
  }

  h1 {
    color: var(--accent-1);
    font-size: var(--font-size-xl);

    + h2 {
      margin-top: 0;
    }
  }

  h2 {
    font-size: var(--font-size-l);

    + h3 {
      margin-top: 0;
    }
  }

  h3 {
    font-weight: bold;
    font-size: var(--font-size);
  }

  li {
    list-style-position: outside;
    margin-left: var(--spacing);

    @include wide {
      list-style-position: outside;
      margin-left: 0;
    }
  }
}
</style>
