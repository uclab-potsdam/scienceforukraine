<template>
  <div class="radio">
    <label>
      <input type="radio" :name="id"
        :value="null" :checked="null === modelValue"
        @change="$emit('update:modelValue', null)">
      <span>Any</span>
    </label>
    <label v-for="(o, i) in options" :key="i">
      <input type="radio" :name="id"
        :value="o" :checked="o === modelValue"
        @change="$emit('update:modelValue', o)">
      <span>{{ o || 'Unspecified' }}</span>
    </label>
  </div>
</template>

<script>
export default {
  name: 'InputRadio',
  props: ['id', 'options', 'modelValue']
}
</script>

<style scoped lang="scss">
.radio {
  display: flex;
  gap: var(--spacing-s);
  flex-wrap: wrap;
  label {
    display: block;
    input {
      appearance: none;
      outline: none;
      + span {
        min-width: 40px;
        display: inline-flex;
        justify-content: center;
        padding: var(--spacing-s) var(--spacing);
        // background: var(--dimmed);
        border: 1px solid var(--accent-2);
        height: 32px;
        border-radius: 16px;
      }

      &:checked + span {
        background: var(--accent-1);
        color: var(--background);
        border: 1px solid var(--accent-1)
      }
    }
  }
}
</style>
