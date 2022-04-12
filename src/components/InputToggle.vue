<template>
  <div class="checkbox">
    <label>
      {{ label }}
      <input type="checkbox"
        :value="null" :checked="null === modelValue"
        @change="$emit('update:modelValue', $event.target.checked)">
    </label>
  </div>
</template>

<script>
export default {
  name: 'InputToggle',
  props: ['label', 'modelValue']
}
</script>

<style scoped lang="scss">
.checkbox {
  display: flex;
  gap: var(--spacing-s);
  flex-wrap: wrap;
  label {
    display: block;
    // input {
    //   appearance: none;
    //   outline: none;
    //   + span {
    //     min-width: 40px;
    //     display: inline-flex;
    //     justify-content: center;
    //     padding: var(--spacing-s) var(--spacing);
    //     // background: var(--dimmed);
    //     border: 1px solid var(--accent-2);
    //     height: 32px;
    //     border-radius: 16px;
    //     // font-size: var(--font-size-s);
    //   }

    //   &:checked + span {
    //     background: var(--accent-1);
    //     color: var(--background);
    //     border: 1px solid var(--accent-1)
    //   }
    // }
  }
}
</style>
