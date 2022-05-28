<template>
  <div class="label">{{name}}</div>
  <div class="list">
    <select :value="index" @change="onChange">
      <option v-for="(o, i) in options" :key="i" :value="i">{{o.label || o}}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'InputSelect',
  props: ['name', 'options', 'modelValue'],
  methods: {
    onChange (e) {
      const option = this.options[e.target.value]
      this.$emit('update:modelValue', option.value !== undefined ? option.value : option)
    }
  },
  computed: {
    index () {
      return this.options.findIndex(o => (o.value !== undefined ? o.value : o) === this.modelValue)
    }
  }
}
</script>

<style scoped lang="scss">
.label {
  color: var(--gray);
  font-size: var(--font-size-s);
  margin-bottom: var(--spacing-s);
  text-transform: uppercase;
}
select {
  appearance: none;

  background-color: transparent;
  border: 1px solid var(--accent-1);
  height: 25px;
  border-radius: var(--spacing-s);
  padding: 0 var(--spacing-s);
  margin: 0;
  width: 100%;
  font-family: inherit;
  font-size: var(--font-size-s);
  cursor: inherit;
  line-height: inherit;

  z-index: 1;
}

.list {
  display: grid;
  grid-template-areas: "select";
  align-items: center;

  select,
  &::after {
    grid-area: select;
  }

  &::after {
    content: "↕";
    justify-self: end;
    background: var(--accent-1);
    border-radius: 0 var(--spacing-s) var(--spacing-s) 0;
    color: var(--background);
    font-size: 10px;
    // border-left: 1px solid var(--accent-1);
    // margin-right: var(--spacing-s);
    // padding-left: var(--spacing-xs);
    height: 25px;
    width: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
