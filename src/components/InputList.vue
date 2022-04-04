<template>
  <div class="list">
    <select :value="modelValue" @change="$emit('update:modelValue', $event.target.value || null)">
      <option value="">Any</option>
      <option v-for="(o, i) in options" :key="i" :value="o">{{o}}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'InputRadio',
  props: ['id', 'options', 'modelValue']
}
</script>

<style scoped lang="scss">
select {
  appearance: none;

  background-color: transparent;
  border: 1px solid var(--accent-1);
  height: 32px;
  border-radius: 16px;
  padding: 0 var(--spacing);
  margin: 0;
  width: 100%;
  font-family: inherit;
  font-size: inherit;
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
    font-size: var(--font-size-s);
    margin-right: var(--spacing);
  }
}
</style>
